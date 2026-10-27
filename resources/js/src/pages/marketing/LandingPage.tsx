import { UtilityBar } from './sections/UtilityBar';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { QuickActions } from './sections/QuickActions';
import { Highlights } from './sections/Highlights';
import { LogoTicker } from './sections/LogoTicker';
import { Solutions } from './sections/Solutions';
import { HowItWorks } from './sections/HowItWorks';
import { BentoFeatures } from './sections/BentoFeatures';
import { ProductPreview } from './sections/ProductPreview';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { Faq } from './sections/Faq';
import { HelpBand } from './sections/HelpBand';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <UtilityBar />
            <Navbar />
            <Hero />
            <QuickActions />
            <Highlights />
            <LogoTicker />
            <Solutions />
            <HowItWorks />
            <BentoFeatures />
            <ProductPreview />
            <Testimonials />
            <Pricing />
            <Faq />
            <HelpBand />
            <FinalCTA />
            <Footer />
        </div>
    );
}
