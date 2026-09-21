import { useState } from 'react'
import type { MemberData, StoreLocation } from '../types'

interface StoreLocatorProps {
  data: MemberData
}

function StoreCard({ store }: { store: StoreLocation }) {
  const mapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-slate-900 text-sm">{store.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{store.address}</p>
          <p className="text-xs text-slate-500 mt-1">{store.hours}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{store.distance}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 text-center text-sm font-semibold bg-orange-500 text-white rounded-lg min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Get Directions
        </a>
        <a
          href={`tel:${store.phone.replace(/\D/g, '')}`}
          className="flex-1 py-2 text-center text-sm font-semibold border border-slate-300 text-slate-700 rounded-lg min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          aria-label={`Call ${store.name}`}
        >
          {store.phone}
        </a>
      </div>
    </article>
  )
}

export default function StoreLocator({ data }: StoreLocatorProps) {
  const { storeLocations } = data
  const [showMap, setShowMap] = useState(false)

  return (
    <main className="pb-24">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-slate-900">Store Locator</h1>
        <p className="text-sm text-slate-500 mt-0.5">Stores near you</p>
      </div>

      {/* View toggle */}
      <div className="px-4 mb-4" role="group" aria-label="View mode">
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setShowMap(false)}
            aria-pressed={!showMap}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${
              !showMap ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setShowMap(true)}
            aria-pressed={showMap}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${
              showMap ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {showMap ? (
        <div className="px-4">
          <div
            className="bg-slate-100 rounded-xl h-64 flex flex-col items-center justify-center text-slate-400 border border-slate-200"
            role="img"
            aria-label="Map view — showing 9 store locations near Chicago, IL"
          >
            <span className="text-4xl mb-2" aria-hidden="true">🗺️</span>
            <p className="text-sm font-medium">Map View</p>
            <p className="text-xs mt-1">{storeLocations.length} stores near Chicago, IL</p>
            <div className="mt-4 flex flex-wrap gap-1 justify-center px-4">
              {storeLocations.map((s) => (
                <span key={s.id} className="text-xs bg-orange-100 text-orange-700 rounded-full px-2 py-0.5">
                  📍 {s.distance}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Map integration requires a maps API key</p>
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-3">
          {storeLocations.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </main>
  )
}
