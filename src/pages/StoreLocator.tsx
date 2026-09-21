import { useState } from 'react'
import type { MemberData, StoreLocation } from '../types'

function StoreCard({ store }: { store: StoreLocation }) {
  const mapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`
  return (
    <article className="bg-[#253166] border border-white/10 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-black text-white text-sm">{store.name}</h2>
          <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">{store.address}</p>
          <p className="text-xs text-white/30 mt-1">{store.hours}</p>
        </div>
        <span className="shrink-0 text-xs font-black text-[#4ECDC4] bg-[#4ECDC4]/15 border border-[#4ECDC4]/30 px-2.5 py-1 rounded-full">
          {store.distance}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 text-center text-sm font-black bg-[#FF6B6B] text-[#1D2951] rounded-xl min-h-[48px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
        >
          Get Directions
        </a>
        <a
          href={`tel:${store.phone.replace(/\D/g, '')}`}
          className="flex-1 py-3 text-center text-sm font-bold border-2 border-white/20 text-white/80 rounded-xl min-h-[48px] flex items-center justify-center hover:border-white/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ECDC4]"
          aria-label={`Call ${store.name}`}
        >
          {store.phone}
        </a>
      </div>
    </article>
  )
}

interface StoreLocatorProps {
  data: MemberData
}

export default function StoreLocator({ data }: StoreLocatorProps) {
  const { storeLocations } = data
  const [showMap, setShowMap] = useState(false)

  return (
    <main className="pb-24">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-black text-white">Store Locator</h1>
        <p className="text-sm text-white/50 font-medium mt-1">Stores near you</p>
      </div>

      <div className="px-4 mb-4" role="group" aria-label="View mode">
        <div className="flex bg-[#253166] rounded-2xl p-1 gap-1 border border-white/10">
          <button
            onClick={() => setShowMap(false)}
            aria-pressed={!showMap}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4ECDC4] ${
              !showMap ? 'bg-[#FF6B6B] text-[#1D2951]' : 'text-white/50 hover:text-white/80'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setShowMap(true)}
            aria-pressed={showMap}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4ECDC4] ${
              showMap ? 'bg-[#FF6B6B] text-[#1D2951]' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {showMap ? (
        <div className="px-4">
          <div
            className="bg-[#253166] rounded-2xl border border-white/10 h-64 flex flex-col items-center justify-center"
            role="img"
            aria-label="Map view — showing 9 store locations near Chicago, IL"
          >
            <span className="text-5xl mb-3" aria-hidden="true">🗺️</span>
            <p className="text-sm font-bold text-white">Map View</p>
            <p className="text-xs mt-1 text-white/40">{storeLocations.length} stores near Chicago, IL</p>
          </div>
          <p className="text-xs text-white/30 text-center mt-2 font-medium">Map integration requires a maps API key</p>
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
