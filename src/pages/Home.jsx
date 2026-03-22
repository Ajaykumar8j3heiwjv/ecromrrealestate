import Hero from '../components/Hero'
import { MarqueeBanner, StatsBar, Neighborhoods } from '../components/Extras'
import FeaturedProperties from '../components/FeaturedProperties'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <StatsBar />
      <FeaturedProperties />
      <Neighborhoods />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </main>
  )
}
