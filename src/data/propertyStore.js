// Property Store — API-backed (Supabase via Express)
// Falls back to default seed data the very first time the DB is empty.

import p1 from '../assets/property_1.png'
import p2 from '../assets/property_2.png'
import p3 from '../assets/property_3.png'

/* ── Base URL: use env var in production, /api proxy in dev ── */
const BASE = import.meta.env.VITE_API_URL || '/api'

/* ════════════════════════════════════════════
   Default seed data (used to pre-populate DB)
════════════════════════════════════════════ */
const defaultProperties = [
  {
    image: p1,
    status: 'Rent',
    price: '30,000',
    title: '1028 Sq.Ft. 2 BHK Residential Apartment',
    location: 'Ambattur, Chennai',
    pincode: '600053',
    beds: 2,
    baths: 2,
    area: '1028',
    type: 'Apartment',
    desc: 'Fully furnished and gated apartment in prime location is for rent, just opposite to Tata Communications. Apartment can be rent out fully or semi-furnished upon agreement.',
    ownerName: 'Rajkumar B Thangamanian',
    ownerRole: 'Owner',
    ownerPhone: '919840422285',
    propertyType: 'Apartment',
    size: '1028 Sq.ft',
    rent: '30,000',
    advance: '2,00,000',
    maintenance: '2,000',
    additionalRoom: '-',
    balconies: '2',
    propertyOnFloor: '8',
    totalFloors: '14',
    suitableTime: '4-5pm',
    servantAcc: 'No',
    petAllowed: 'Yes',
    foodPref: 'Veg & Non-Veg',
    tenants: 'Both (Family / Bachelor)',
    facing: 'North West',
    propertyAge: '1-5 years',
    parking: 'Both (Two/Four Wheeler)',
    furnishedStatus: 'Fully Furnished',
    availableFrom: '2024-04-10',
    isFeatured: true,
  },
  {
    image: p2,
    status: 'Sale',
    price: '3,50,00,000',
    title: 'Royal Crest Villa — Private Pool',
    location: 'ECR, Thiruvanmiyur',
    pincode: '600041',
    beds: 4,
    baths: 4,
    area: '3200',
    type: 'Villa',
    desc: 'Exquisite private villa with a personal swimming pool and landscaped garden. Located in the serene environment of ECR, perfect for a royal lifestyle.',
    ownerName: 'Vikram Seth',
    ownerRole: 'Agent',
    ownerPhone: '919988776655',
    propertyType: 'Villa',
    size: '3200 Sq.ft',
    rent: 'N/A',
    advance: '50,00,000',
    maintenance: '5,000',
    additionalRoom: 'Servant Quarter',
    balconies: '3',
    propertyOnFloor: 'G+1',
    totalFloors: '2',
    suitableTime: 'Anytime',
    servantAcc: 'Yes',
    petAllowed: 'Yes',
    foodPref: 'Any',
    tenants: 'Family',
    facing: 'East',
    propertyAge: 'Brand New',
    parking: '3 Cars',
    furnishedStatus: 'Semi-Furnished',
    availableFrom: 'Ready to Move',
    isFeatured: true,
  },
  {
    image: p3,
    status: 'Rent',
    price: '75,000',
    title: 'Horizon Penthouse — Seaview',
    location: 'ECR, Neelankarai',
    pincode: '600115',
    beds: 4,
    baths: 3,
    area: '2800',
    type: 'Penthouse',
    desc: 'Stunning seaview penthouse with ultra-modern interiors. Offers a panoramic view of the Bay of Bengal.',
    ownerName: 'Sarah J.',
    ownerRole: 'Owner',
    ownerPhone: '919876543210',
    propertyType: 'Penthouse',
    size: '2800 Sq.ft',
    rent: '75,000',
    advance: '5,00,000',
    maintenance: '4,000',
    additionalRoom: 'Media Room',
    balconies: '1 Large',
    propertyOnFloor: '12',
    totalFloors: '12',
    suitableTime: 'Evening',
    servantAcc: 'No',
    petAllowed: 'No',
    foodPref: 'Veg Only',
    tenants: 'Expats / Family',
    facing: 'Sea Facing',
    propertyAge: '5-10 years',
    parking: '2 Cars',
    furnishedStatus: 'Fully Furnished',
    availableFrom: 'Immediate',
    isFeatured: true,
  },
]

/* ════════════════════════════════════════════
   PROPERTIES
════════════════════════════════════════════ */

export async function getProperties() {
  try {
    const res = await fetch(`${BASE}/properties`)
    if (!res.ok) throw new Error(`GET /properties failed: ${res.status}`)
    const data = await res.json()

    // Seed DB on first run if empty
    if (data.length === 0) {
      return seedProperties()
    }
    return data
  } catch (err) {
    console.error('getProperties error:', err)
    return []
  }
}

export async function addProperty(property) {
  const res = await fetch(`${BASE}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  })
  if (!res.ok) {
    let detail = `POST /properties failed: ${res.status}`
    try { const body = await res.json(); detail += ` — ${body.error || JSON.stringify(body)}` } catch {}
    throw new Error(detail)
  }
  return await res.json()
}

export async function updateProperty(property) {
  const res = await fetch(`${BASE}/properties/${property.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  })
  if (!res.ok) {
    let detail = `PATCH /properties/${property.id} failed: ${res.status}`
    try { const body = await res.json(); detail += ` — ${body.error || JSON.stringify(body)}` } catch {}
    throw new Error(detail)
  }
  return await res.json()
}

export async function deleteProperty(id) {
  const res = await fetch(`${BASE}/properties/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`DELETE /properties/${id} failed: ${res.status}`)
  return await res.json()
}

/* ════════════════════════════════════════════
   ENQUIRIES
════════════════════════════════════════════ */

export async function getEnquiries() {
  try {
    const res = await fetch(`${BASE}/enquiries`)
    if (!res.ok) throw new Error(`GET /enquiries failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('getEnquiries error:', err)
    return []
  }
}

export async function addEnquiry(enquiry) {
  const res = await fetch(`${BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  })
  if (!res.ok) throw new Error(`POST /enquiries failed: ${res.status}`)
  return await res.json()
}

export async function updateEnquiry(enquiry) {
  const res = await fetch(`${BASE}/enquiries/${enquiry.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: enquiry.status }),
  })
  if (!res.ok) throw new Error(`PATCH /enquiries/${enquiry.id} failed: ${res.status}`)
  return await res.json()
}

export async function deleteEnquiry(id) {
  const res = await fetch(`${BASE}/enquiries/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`DELETE /enquiries/${id} failed: ${res.status}`)
  return await res.json()
}

/* ════════════════════════════════════════════
   SEED (internal — called when DB is empty)
════════════════════════════════════════════ */
async function seedProperties() {
  try {
    const res = await fetch(`${BASE}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties: defaultProperties }),
    })
    if (!res.ok) return defaultProperties
    // After seeding, fetch fresh list
    const freshRes = await fetch(`${BASE}/properties`)
    return freshRes.ok ? await freshRes.json() : defaultProperties
  } catch {
    return defaultProperties
  }
}
