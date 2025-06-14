import Features from '@/components/landing/features';
import Hero from '@/components/landing/hero';
import Navbar from "@/components/landing/navbar";

export default function Home() {

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}
