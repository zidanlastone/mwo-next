import Features from '@/components/landing/features';
import Hero from '@/components/landing/hero';
import Navbar from "@/components/landing/navbar";

export default function Home() {

  return (
    <div className="bg-[var(--background)]">
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}
