import Header from "../components/Header";
import { ExternalLink } from "lucide-react";

const Registry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <p className="text-center font-serif text-foreground text-lg md:text-xl italic">
          Your presence at our wedding is the greatest gift we could ask for.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Honeymoon Fund */}
          <div className="text-center">
            <h2 className="font-script text-primary text-4xl md:text-5xl underline underline-offset-4 decoration-primary/40">
              Honeymoon Fund
            </h2>
            <p className="font-serif text-foreground mt-4 text-sm md:text-base leading-relaxed">
              Your love and support mean the world to us. For guests who wish to contribute, a honeymoon fund will be available at the reception. Thank you for helping us celebrate the beginning of our married life together.            
            </p>
          </div>

          {/* Registry */}
          <div className="text-center">
            <h2 className="font-script text-primary text-4xl md:text-5xl underline underline-offset-4 decoration-primary/40">
              Registry
            </h2>
            <p className="font-serif text-foreground mt-4 text-sm md:text-base leading-relaxed">
              If you'd like to celebrate with a gift, we've included a small registry below.
            </p>
            <a
              href="https://www.amazon.com/wedding/guest-view/3M1UUP221AX3S"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 m-3 mt-6 bg-secondary text-secondary-foreground font-serif font-bold text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Amazon <ExternalLink size={18} />
            </a>
            <a
              href="https://www.crateandbarrel.com/gift-registry/brianna-zapata-and-joshua-dehart/r7568253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 m-3 bg-secondary text-secondary-foreground font-serif font-bold text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Crate & Barrel <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registry;