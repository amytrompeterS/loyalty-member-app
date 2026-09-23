import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { MemberData, PurchaseHistoryEntry } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

function groupByMonth(entries: PurchaseHistoryEntry[]) {
  const map = new Map<string, PurchaseHistoryEntry[]>()
  for (const entry of entries) {
    const key = entry.date.slice(0, 7)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(entry)
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
}

function formatMonth(yyyyMM: string) {
  const [year, month] = yyyyMM.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

interface HistoryProps {
  data: MemberData
}

export default function History({ data }: HistoryProps) {
  const { pointsHistory, purchaseHistory } = data
  const [expandedTxn, setExpandedTxn] = useState<Set<string>>(new Set())

  const recentEntries = [...pointsHistory].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12)
  const chartLabels = recentEntries.map((e) =>
    new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  ).reverse()
  const chartData = recentEntries.map((e) => e.runningBalance).reverse()

  const grouped = groupByMonth([...purchaseHistory].sort((a, b) => b.date.localeCompare(a.date)))

  function toggleTxn(id: string) {
    setExpandedTxn((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalPoints = data.pointsBalance.current

  return (
    <main className="pb-24">
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-2xl font-black text-white">Points History</h1>
      </div>

      {/* Total points summary */}
      <section className="px-4 mb-5" aria-label="Total points balance">
        <div className="bg-[#253166] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Total Points</p>
            <p className="text-4xl font-black text-white">{totalPoints.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-white/40">{data.pointsBalance.pointsToNextTier.toLocaleString()} to {data.pointsBalance.nextTierName}</p>
            <div className="mt-2 w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4ECDC4] rounded-full"
                style={{ width: `${Math.round((totalPoints / data.pointsBalance.nextTierThreshold) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="px-4 mb-5" aria-labelledby="chart-heading">
        <h2 className="sr-only" id="chart-heading">Points balance over time</h2>
        <div className="bg-[#253166] border border-white/10 rounded-2xl p-4">
          <p className="text-sm font-black text-white mb-4">Balance — Last 12 Months</p>
          <div aria-hidden="true">
            <Line
              data={{
                labels: chartLabels,
                datasets: [{
                  data: chartData,
                  borderColor: '#4ECDC4',
                  backgroundColor: 'rgba(78, 205, 196, 0.12)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 3,
                  pointBackgroundColor: '#4ECDC4',
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1D2951',
                    titleColor: '#ffffff',
                    bodyColor: '#4ECDC4',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { maxTicksLimit: 6, font: { size: 10 }, color: 'rgba(255,255,255,0.4)' },
                    border: { display: false },
                  },
                  y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { font: { size: 10 }, color: 'rgba(255,255,255,0.4)' },
                    border: { display: false },
                  },
                },
              }}
            />
          </div>
          <table className="sr-only" aria-label="Points balance history data">
            <thead><tr><th>Date</th><th>Points Balance</th></tr></thead>
            <tbody>
              {recentEntries.map((e) => (
                <tr key={e.date}><td>{e.date}</td><td>{e.runningBalance}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent activity */}
      <section className="px-4 mb-5" aria-labelledby="activity-heading">
        <h2 className="text-lg font-black text-white mb-3" id="activity-heading">Recent Activity</h2>
        <div className="bg-[#253166] border border-white/10 rounded-2xl divide-y divide-white/5">
          {[...pointsHistory].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8).map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{entry.description}</p>
                <p className="text-xs text-white/40 font-medium mt-0.5">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <span className={`shrink-0 text-sm font-black ${entry.points >= 0 ? 'text-[#4ECDC4]' : 'text-[#FF6B6B]'}`}>
                {entry.points >= 0 ? '+' : ''}{entry.points.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Purchase history */}
      <section className="px-4" aria-labelledby="purchase-heading">
        <h2 className="text-lg font-black text-white mb-3" id="purchase-heading">Purchase History</h2>
        {grouped.map(([month, txns]) => (
          <div key={month} className="mb-4">
            <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-2">{formatMonth(month)}</p>
            <div className="bg-[#253166] border border-white/10 rounded-2xl divide-y divide-white/5">
              {txns.map((txn) => {
                const isExpanded = expandedTxn.has(txn.id)
                return (
                  <div key={txn.id}>
                    <button
                      onClick={() => toggleTxn(txn.id)}
                      aria-expanded={isExpanded}
                      className="w-full flex items-center justify-between px-4 py-4 gap-2 text-left min-h-[60px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4ECDC4] focus-visible:outline-offset-[-2px]"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white">{txn.store}</p>
                        <p className="text-xs text-white/40 font-medium mt-0.5">
                          {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-black text-white">${txn.totalSpent.toFixed(2)}</p>
                        <p className="text-xs font-black text-[#4ECDC4]">+{txn.pointsEarned} pts</p>
                      </div>
                      <span className="ml-2 text-white/20 text-sm" aria-hidden="true">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 bg-[#1D2951]/50 rounded-b-2xl">
                        <ul className="space-y-2.5" aria-label={`Items purchased at ${txn.store}`}>
                          {txn.toys.map((toy, i) => (
                            <li key={i} className="flex items-start justify-between text-xs gap-2">
                              <div>
                                <span className="font-bold text-white/80">{toy.name}</span>
                                <span className="text-white/30 ml-1 font-medium">× {toy.quantity}</span>
                                <p className="text-white/30 mt-0.5">{toy.category} · Ages {toy.ageRange}</p>
                              </div>
                              <span className="text-white font-black shrink-0">${(toy.price * toy.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
