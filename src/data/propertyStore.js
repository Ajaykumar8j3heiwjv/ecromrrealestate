// Property Store with localStorage persistence
import p1 from '../assets/property_1.png'
import p2 from '../assets/property_2.png'
import p3 from '../assets/property_3.png'
import p4 from '../assets/property_4.png'

const STORAGE_KEY = 'ecr_omr_properties'
const ENQUIRIES_KEY = 'ecr_omr_enquiries'

const defaultProperties = [
  {
    id: 1,
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
    desc: 'Fully furnished and gated apartment in prime location is for rent in prime location, just opposite to Tata Communications. Apartment can be rent out fully or semi-furnished upon agreement. Few minutes away from branded showrooms and other shops. Rent negotiable.',
    ownerName: 'Rajkumar B Thangamanian',
    ownerRole: 'Owner',
    ownerPhone: '919840422285',
    propertyType: 'Apartment',
    size: '1028 Sq.ft',
    rent: '30,000',
    advance: '2,00,000',
    maintenance: '2,000',
    bedroom: '2 Bedroom(s)',
    bathroom: '2 Bathroom(s)',
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
    isFeatured: true
  },
  {
    id: 2,
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
    bedroom: '4 Bedroom(s)',
    bathroom: '4 Bathroom(s)',
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
    isFeatured: true
  },
  {
    id: 3,
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
    bedroom: '4 Bedroom(s)',
    bathroom: '3 Bathroom(s)',
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
    isFeatured: true
  }
]

export const getProperties = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
  return defaultProperties
}

export const saveProperties = (properties) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
}

export const addProperty = (property) => {
  const properties = getProperties()
  const newProperty = { ...property, id: Date.now() }
  const updated = [newProperty, ...properties]
  saveProperties(updated)
  return updated
}

export const getEnquiries = () => {
  const stored = localStorage.getItem(ENQUIRIES_KEY)
  if (stored) return JSON.parse(stored)

  const defaultEnquiries = [
    { id: 1, name: 'Aravind K.', phone: '9876543210', interest: 'Buy', property: 'Royal Crest Villa', date: '21 Mar 2025', status: 'New' },
    { id: 2, name: 'Priya N.', phone: '9123456789', interest: 'Sell', property: 'Aurum Residences', date: '20 Mar 2025', status: 'Contacted' },
    { id: 3, name: 'Suresh V.', phone: '9988776655', interest: 'Rent', property: 'Horizon Penthouse', date: '19 Mar 2025', status: 'Closed' },
  ]

  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(defaultEnquiries))
  return defaultEnquiries
}

export const addEnquiry = (enquiry) => {
  const enquiries = getEnquiries()
  const newEnquiry = { ...enquiry, id: Date.now(), date: new Date().toLocaleDateString('en-GB'), status: 'New' }
  const updated = [newEnquiry, ...enquiries]
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated))
  return updated
}

export const updateEnquiry = (updatedEnquiry) => {
  const enquiries = getEnquiries()
  const updated = enquiries.map((e) => (e.id === updatedEnquiry.id ? updatedEnquiry : e))
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated))
  return updated
}

export const deleteEnquiry = (id) => {
  const enquiries = getEnquiries()
  const updated = enquiries.filter((e) => e.id !== id)
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated))
  return updated
}

export const updateProperty = (updatedProp) => {
  const properties = getProperties()
  const updated = properties.map(p => p.id === updatedProp.id ? updatedProp : p)
  saveProperties(updated)
  return updated
}

export const deleteProperty = (id) => {
  const properties = getProperties()
  const updated = properties.filter(p => p.id !== id)
  saveProperties(updated)
  return updated
}
