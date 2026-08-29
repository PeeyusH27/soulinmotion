import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PromoStrip from '@/components/PromoStrip';
import StickyBar from '@/components/StickyBar';
import FinalCta from '@/components/sections/FinalCta';
import Flow from '@/components/sections/Flow';
import Hero from '@/components/sections/Hero';
import Host from '@/components/sections/Host';
import LiveExperience from '@/components/sections/LiveExperience';
import Patterns from '@/components/sections/Patterns';
import Quote from '@/components/sections/Quote';
import Register from '@/components/sections/Register';
import Testimonials from '@/components/sections/Testimonials';
import YouWill from '@/components/sections/YouWill';

/**
 * Ten sections, root to crown. The reader is never more than two screens
 * from a register button: header, hero, three promo strips, a button in
 * §3/§4/§6/§7, the form itself, the final call, the footer, and on phones
 * a sticky bar.
 */
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Patterns />
        <PromoStrip
          tone="gold"
          label="Limited seats"
          text="Seats are kept small so the experience stays powerful."
          cta="Register now"
        />
        <YouWill />
        <Flow />
        <PromoStrip
          tone="ink"
          label="Reminder"
          text="90-minute live session on Zoom · Date announced soon"
          cta="Reserve your spot"
        />
        <Quote />
        <LiveExperience />
        <Testimonials />
        <Host />
        <PromoStrip
          tone="gold"
          label="Seats filling"
          text="Spots are limited to keep the experience powerful."
          cta="Secure my spot"
        />
        <Register />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
