import { useState, useEffect } from "react";
import heroImg from "../assets/hero-couple.png";
import venueImage from "../assets/venue.jpg";
import Header from "../components/Header";

const WEDDING_DATE = new Date("2027-01-23T16:00:00");

export default function Home() {
    // Initialize timeLeft using getTimeLeft so it's correct on page load
    function getTimeLeft() {
        const diff = WEDDING_DATE.getTime() - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
        };
    }

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    // Optional: update countdown every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 60000); // every 60 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero */}
            <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                <img
                    src={heroImg}
                    alt="Brianna and Josh"
                    className="w-full h-full object-cover object-top"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
            </div>

            {/* Names & Date */}
            <div className="text-center -mt-16 md:-mt-24 relative z-10 px-4">
                <p className="text-primary font-serif text-lg md:text-xl tracking-[0.2em] mt-2 font-semibold uppercase">
                    The Wedding of
                </p>
                <h1 className="font-script text-primary text-5xl md:text-8xl mt-1">
                    Brianna & Josh
                </h1>
                <p className="text-primary font-serif text-lg md:text-xl tracking-[0.2em] mt-2 font-semibold">
                    01 • 23 • 2027
                </p>
            </div>

            {/* Countdown */}
            <div className="flex justify-center gap-4 md:gap-6 mt-8 px-4">
                {[
                    { value: timeLeft.days, label: "days" },
                    { value: timeLeft.hours, label: "hours" },
                    { value: timeLeft.minutes, label: "minutes" },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="bg-countdown text-countdown-foreground rounded-lg w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center"
                    >
                        <span className="text-3xl md:text-5xl font-serif font-bold">
                            {item.value}
                        </span>
                        <span className="text-xs md:text-sm font-serif">{item.label}</span>
                    </div>
                ))}
            </div>
            <p className="text-center font-serif italic text-foreground mt-3 text-sm md:text-base">
                ... until the big day!
            </p>

            {/* Schedule of Events */}
            <div className="mt-12 md:mt-16 px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:gap-8">
                
                {/* Text first on mobile, image first on desktop */}
                <div className="order-0 md:order-2 flex-1 text-center md:text-left">
                <h2 className="font-script text-primary text-3xl md:text-5xl">
                    Schedule of Events
                </h2>
                <div className="mt-4 font-serif text-foreground space-y-3">
                    <div>
                    <p className="font-bold">Wedding Ceremony:</p>
                    <p>Time TBD</p>
                    </div>
                    <div>
                    <p className="font-bold">Reception:</p>
                    <p>Time TBD</p>
                    </div>
                </div>
                </div>

                {/* Image */}
                <div className="order-1 md:order-1 relative w-full md:w-1/2 max-w-md">
                <img
                    src={venueImage}
                    alt="The Blue Magnolia venue"
                    className="w-full aspect-4/3 object-cover p-[8%]"
                    loading="lazy"
                />
                </div>

            </div>
            </div>

            {/* Venue */}
            <div className="mt-12 md:mt-16 px-4 pb-16">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center">
                    <div className="text-center md:text-left">
                        <h2 className="font-script text-primary text-3xl md:text-5xl">Venue</h2>
                        <p className="font-serif text-foreground font-bold text-xl mt-2">The Blue Magnolia</p>
                        <p className="font-serif text-foreground mt-1">1 Whispering Pines St</p>
                        <p className="font-serif text-foreground">Magnolia, TX 77354</p>
                        <a
                        href="https://www.google.com/maps/search/The+Blue+Magnolia+1+Whispering+Pines+St+Magnolia+TX+77354"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 bg-secondary text-secondary-foreground font-serif font-semibold px-6 py-2 rounded-full text-sm"
                        >
                        Get Directions
                        </a>
                    </div>

                    <div className="relative w-full md:w-1/2 max-w-md">
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.0!2d-95.75!3d30.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDEyJzAwLjAiTiA5NcKwNDUnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                        className="w-full aspect-5/3 border-0 "
                        allowFullScreen
                        loading="lazy"
                        title="Venue map"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}