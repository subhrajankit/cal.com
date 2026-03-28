import {
  Hero,
  LogoCloud,
  FeatureGrid,
  BentoGrid,
  IntegrationShowcase,
  Testimonials,
  OpenSource,
  CTASection,
  Footer,
} from "@/components/marketing";
import { Header } from "@/components/marketing/header";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <Header user={user ? { name: user.name, email: user.email } : null} />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <LogoCloud />
        <section id="features">
          <FeatureGrid />
        </section>
        <section id="platform">
          <BentoGrid />
        </section>
        <section id="integrations">
          <IntegrationShowcase />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="open-source">
          <OpenSource />
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
