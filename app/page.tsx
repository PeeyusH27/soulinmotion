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
 * Ten sections, root to crown — and the chakra order now actually holds, since
 * the testimonial wall (solar, 3rd) sits third instead of seventh. That move is
 * also the conversion one: proof lands before biography, and immediately after
 * the promises it is proving.
 *
 * The two strips each carry a different fact — it is free, and you keep the
 * recording — rather than restating scarcity the page cannot quantify.
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
          label="First session free"
          text="Your first Soul in Motion session costs nothing. No card, nothing to buy — just show up."
          cta="Save my free seat"
        />
        <YouWill />
        <Testimonials />
        <Flow />
        <PromoStrip
          tone="ink"
          label="The take-home"
          text="Everyone who registers gets the full session recording to keep."
          cta="Send it to me"
        />
        <Quote />
        <LiveExperience />
        <Host />
        <Register />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
