import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Sale from './pages/Sale'
import StoreLocator from './pages/StoreLocator'
import History from './pages/History'
import Account from './pages/Account'
import rawData from './data/member.json'
import type { MemberData } from './types'

const memberData = rawData as MemberData

export default function App() {
  const [data, setData] = useState<MemberData>(memberData)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    // Simulate a short network delay before "refreshing" from local JSON
    setTimeout(() => {
      setData({ ...memberData })
      setRefreshing(false)
    }, 800)
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1D2951] flex flex-col max-w-2xl mx-auto">
        <TopBar
          memberName={data.member.name}
          tier={data.member.tier}
          initials={data.member.avatarPlaceholder}
        />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home data={data} onRefresh={handleRefresh} refreshing={refreshing} />} />
            <Route path="/sale" element={<Sale data={data} />} />
            <Route path="/stores" element={<StoreLocator data={data} />} />
            <Route path="/history" element={<History data={data} />} />
            <Route path="/account" element={<Account data={data} />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
