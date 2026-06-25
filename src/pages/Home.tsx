import Hero from "@/components/sections/Hero";
// Hidden for now: stats are illustrative, not real. Re-enable with verified figures.
// import SocialProof from "@/components/sections/SocialProof";
import MeetWizard from "@/components/sections/MeetWizard";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Showcase from "@/components/sections/Showcase";
import Community from "@/components/sections/Community";
import Coaches from "@/components/sections/Coaches";
// Hidden for now: testimonials are placeholder/illustrative. Re-enable with real reviews.
// import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <SocialProof /> hidden until we have verified stats */}
      <MeetWizard />
      <Features />
      <HowItWorks />
      <Showcase />
      <Community />
      <Coaches />
      {/* <Testimonials /> hidden until we have real reviews */}
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
