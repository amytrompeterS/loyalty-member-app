import { useState } from 'react'
import type { MemberData, StoreLocation } from '../types'

interface StoreLocatorProps {
  data: MemberData
}

function StoreCard({ store }: { store: StoreLocation }) {
  const mapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-black text-slate-900 text-sm">{store.name}</h2>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{store.address}</p>
          <p className="text-xs text-slate-400 mt-1">{store.hours}</p>
        </div>
        <span className="shrink-0 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          {store.distance}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 text-center text-sm font-bold bg-green-600 text-white rounded-xl min-h-[48px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Get Directions
        </a>
        <a
          href={`tel:${store.phone.replace(/\D/g, '')}`}
          className="flex-1 py-3 text-center text-sm font-bold border-2 border-slate-200 text-slate-700 rounded-xl min-h-[48px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-black text-slate-900">Store Locator</h1>
        <p className="text-sm text-slate-400 font-medium mt-1">Stores near you</p>
      </div>

      {/* View toggle */}
      <div className="px-4 mb-4" role="group" aria-label="View mode">
        <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
          <button
            onClick={() => setShowMap(false)}
            aria-pressed={!showMap}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600 ${
              !showMap ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setShowMap(true)}
            aria-pressed={showMap}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600 ${
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
            className="bg-slate-100 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400 border border-slate-200"
            role="img"
            aria-label="Map view — showing 9 store locations near Chicago, IL"
          >
            <span className="text-5xl mb-3" aria-hidden="true">🗺️</span>
            <p className="text-sm font-bold text-slate-600">Map View</p>
            <p className="text-xs mt-1 text-slate-400">{storeLocations.length} stores near Chicago, IL</p>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2 font-medium">Map integration requires a maps API key</p>
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
