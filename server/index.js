import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const app = express()
const PORT = process.env.PORT || 10000

/* ── Supabase client (server-side, service role) ── */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* ── Startup check ── */
console.log('ENV CHECK:', {
  SUPABASE_URL: process.env.SUPABASE_URL ? '✅ set' : '❌ MISSING',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ set' : '❌ MISSING',
  PORT,
  NODE_ENV: process.env.NODE_ENV || 'not set',
})

/* ── Middleware ── */
app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '50mb' })) // allow base64 images (multiple photos)

/* ── Health check ── */
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ECR OMR Real Estate API',
    supabaseConfigured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  })
})

/* ═══════════════════════════════════════════════
   PROPERTIES
═══════════════════════════════════════════════ */

// GET all properties
app.get('/properties', async (req, res) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(camelizeAll(data))
})

// POST create property
app.post('/properties', async (req, res) => {
  try {
    const body = snakifyProperty(req.body)
    console.log('POST /properties — inserting:', JSON.stringify(Object.keys(body)))
    const { data, error } = await supabase
      .from('properties')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error.message, error.details, error.hint)
      return res.status(500).json({ error: error.message, details: error.details, hint: error.hint })
    }
    res.status(201).json(camelize(data))
  } catch (err) {
    console.error('Unexpected POST /properties error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PATCH update property
app.patch('/properties/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const body = snakifyProperty(req.body)
    console.log('PATCH /properties/:id —', id, 'keys:', JSON.stringify(Object.keys(body)))
    const { data, error } = await supabase
      .from('properties')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error.message, error.details, error.hint)
      return res.status(500).json({ error: error.message, details: error.details, hint: error.hint })
    }
    res.json(camelize(data))
  } catch (err) {
    console.error('Unexpected PATCH /properties error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE property
app.delete('/properties/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

/* ═══════════════════════════════════════════════
   ENQUIRIES
═══════════════════════════════════════════════ */

// GET all enquiries
app.get('/enquiries', async (req, res) => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST create enquiry
app.post('/enquiries', async (req, res) => {
  const { name, phone, email, interest, property, message } = req.body
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  const { data, error } = await supabase
    .from('enquiries')
    .insert([{ name, phone, email, interest, property, message, status: 'New', date }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// PATCH update enquiry (status change)
app.patch('/enquiries/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { status } = req.body
  const { data, error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// DELETE enquiry
app.delete('/enquiries/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { error } = await supabase.from('enquiries').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

/* ═══════════════════════════════════════════════
   SEED (one-time: populate DB with default data)
═══════════════════════════════════════════════ */
app.post('/seed', async (req, res) => {
  const { properties } = req.body
  if (!properties || !Array.isArray(properties)) {
    return res.status(400).json({ error: 'Provide { properties: [...] }' })
  }
  const rows = properties.map(snakifyProperty)
  const { data, error } = await supabase.from('properties').insert(rows).select()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json({ seeded: data.length })
})

/* ═══════════════════════════════════════════════
   HELPERS — camelCase ↔ snake_case
═══════════════════════════════════════════════ */

// Map frontend camelCase → Supabase snake_case columns
// Only include fields that are actually provided/defined
function snakifyProperty(p) {
  const row = {}
  
  // Core fields (only add if provided)
  if (p.title !== undefined && p.title !== '') row.title = p.title
  if (p.location !== undefined && p.location !== '') row.location = p.location
  if (p.pincode !== undefined && p.pincode !== '') row.pincode = p.pincode
  if (p.type !== undefined && p.type !== '') row.type = p.type
  if (p.status !== undefined && p.status !== '') row.status = p.status
  if (p.price !== undefined && p.price !== '') row.price = p.price
  if (p.beds !== undefined && p.beds !== null && p.beds !== '') row.beds = Number(p.beds)
  if (p.baths !== undefined && p.baths !== null && p.baths !== '') row.baths = Number(p.baths)
  if (p.area !== undefined && p.area !== '') row.area = p.area
  if (p.description !== undefined && p.description !== '') row.description = p.description
  // Handle images — FIXED (send array, NOT string)
  if (p.images !== undefined && p.images !== null) {
    if (Array.isArray(p.images)) {
      const filtered = p.images.filter(img => img && img.length > 0)
      if (filtered.length > 0) {
        row.images = filtered   // ✅ CORRECT (array)
      }
    } 
    else if (typeof p.images === 'string' && p.images.length > 0) {
      row.images = [p.images]  // ✅ wrap in array
    }
  } 
  else if (p.image !== undefined && p.image !== '') {
    row.images = [p.image]     // ✅ fallback
  }
  
  if (p.ownerName !== undefined && p.ownerName !== '') row.owner_name = p.ownerName
  if (p.ownerRole !== undefined && p.ownerRole !== '') row.owner_role = p.ownerRole
  if (p.ownerPhone !== undefined && p.ownerPhone !== '') row.owner_phone = p.ownerPhone
  
  // Technical details
  if (p.propertyType !== undefined && p.propertyType !== '') row.property_type = p.propertyType
  if (p.size !== undefined && p.size !== '') row.size = p.size
  if (p.rent !== undefined && p.rent !== '') row.rent = p.rent
  if (p.advance !== undefined && p.advance !== '') row.advance = p.advance
  if (p.maintenance !== undefined && p.maintenance !== '') row.maintenance = p.maintenance
  if (p.additionalRoom !== undefined && p.additionalRoom !== '') row.additional_room = p.additionalRoom
  if (p.balconies !== undefined && p.balconies !== '') row.balconies = p.balconies
  if (p.propertyOnFloor !== undefined && p.propertyOnFloor !== '') row.property_on_floor = p.propertyOnFloor
  if (p.totalFloors !== undefined && p.totalFloors !== '') row.total_floors = p.totalFloors
  if (p.suitableTime !== undefined && p.suitableTime !== '') row.suitable_time = p.suitableTime
  if (p.servantAcc !== undefined && p.servantAcc !== '') row.servant_acc = p.servantAcc
  if (p.petAllowed !== undefined && p.petAllowed !== '') row.pet_allowed = p.petAllowed
  if (p.foodPref !== undefined && p.foodPref !== '') row.food_pref = p.foodPref
  if (p.tenants !== undefined && p.tenants !== '') row.tenants = p.tenants
  if (p.facing !== undefined && p.facing !== '') row.facing = p.facing
  if (p.propertyAge !== undefined && p.propertyAge !== '') row.property_age = p.propertyAge
  if (p.parking !== undefined && p.parking !== '') row.parking = p.parking
  if (p.furnishedStatus !== undefined && p.furnishedStatus !== '') row.furnished_status = p.furnishedStatus
  if (p.availableFrom !== undefined && p.availableFrom !== '') row.available_from = p.availableFrom
  if (p.isFeatured !== undefined) row.is_featured = p.isFeatured ?? false
  
  return row
}

// Map Supabase snake_case → frontend camelCase
function camelize(p) {
  if (!p) return null
  return {
    id: p.id,
    title: p.title,
    location: p.location,
    pincode: p.pincode,
    type: p.type,
    status: p.status,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
    description: p.description || '',
    images: p.images || [],
    image: p.image || (p.images && p.images.length > 0 ? p.images[0] : null),
    ownerName: p.owner_name,
    ownerRole: p.owner_role,
    ownerPhone: p.owner_phone,
    propertyType: p.property_type,
    size: p.size,
    rent: p.rent,
    advance: p.advance,
    maintenance: p.maintenance,
    additionalRoom: p.additional_room,
    balconies: p.balconies,
    propertyOnFloor: p.property_on_floor,
    totalFloors: p.total_floors,
    suitableTime: p.suitable_time,
    servantAcc: p.servant_acc,
    petAllowed: p.pet_allowed,
    foodPref: p.food_pref,
    tenants: p.tenants,
    facing: p.facing,
    propertyAge: p.property_age,
    parking: p.parking,
    furnishedStatus: p.furnished_status,
    availableFrom: p.available_from,
    isFeatured: p.is_featured,
  }
}

function camelizeAll(rows) {
  return (rows || []).map(camelize)
}

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`🚀 ECR OMR API server running on port ${PORT}`)
})
