import { BouncyCardsFeatures } from "@/components/ui/bounce-card-features";

export default function Services() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BouncyCardsFeatures />
      </div>
    </section>
  );
}