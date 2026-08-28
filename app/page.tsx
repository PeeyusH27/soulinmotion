import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Booking from '@/components/sections/Booking';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Flow from '@/components/sections/Flow';
import Patterns from '@/components/sections/Patterns';
import Hero from '@/components/sections/Hero';
import Host from '@/components/sections/Host';
import LiveExperience from '@/components/sections/LiveExperience';
import Quote from '@/components/sections/Quote';
import Shifts from '@/components/sections/Shifts';
import Testimonials from '@/components/sections/Testimonials';
import WhyMe from '@/components/sections/WhyMe';
import YouWill from '@/components/sections/YouWill';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Patterns />
        <YouWill />
        <Flow />
        <Shifts />
        <Quote />
        <LiveExperience />
        <Host />
        <WhyMe />
        <Testimonials />
        <Faq />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

