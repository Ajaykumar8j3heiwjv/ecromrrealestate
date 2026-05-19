import Hero from '../components/Hero'
import { MarqueeBanner, StatsBar, Neighborhoods } from '../components/Extras'
import FeaturedProperties from '../components/FeaturedProperties'
import BusinessCard from '../components/BusinessCard'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import StoreGallery from '../components/StoreGallery'

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <StatsBar />
      <FeaturedProperties />
      <BusinessCard />
      <Neighborhoods />
      <WhyChooseUs />
      <StoreGallery />
      <Testimonials />
      <ContactSection />
    </main>
  )
}
