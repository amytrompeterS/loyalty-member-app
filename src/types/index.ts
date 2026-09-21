export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface Member {
  name: string
  tier: Tier
  memberSince: string
  memberId: string
  avatarPlaceholder: string
}

export interface PointsBalance {
  current: number
  nextTierName: Tier | null
  nextTierThreshold: number | null
  pointsToNextTier: number | null
  expiringSoon: { points: number; expirationDate: string } | null
}

export interface PointsHistoryEntry {
  date: string
  description: string
  points: number
  runningBalance: number
}

export interface Offer {
  id: string
  title: string
  description: string
  expirationDate: string
  value: string
  category: string
  tierMinimum: Tier | null
  isFreeToyClaim: boolean
  icon: string
}

export interface SaleItem {
  id: string
  name: string
  category: string
  ageRange: string
  originalPrice: number
  salePrice: number
  percentOff: number
  image: string
  recommended: boolean
}

export interface StoreLocation {
  id: string
  name: string
  address: string
  distance: string
  hours: string
  phone: string
  lat: number
  lng: number
}

export interface PurchasedToy {
  name: string
  category: string
  ageRange: string
  quantity: number
  price: number
}

export interface PurchaseHistoryEntry {
  id: string
  date: string
  store: string
  toys: PurchasedToy[]
  totalSpent: number
  pointsEarned: number
}

export interface MemberData {
  member: Member
  pointsBalance: PointsBalance
  pointsHistory: PointsHistoryEntry[]
  offers: Offer[]
  saleItems: SaleItem[]
  storeLocations: StoreLocation[]
  purchaseHistory: PurchaseHistoryEntry[]
}
