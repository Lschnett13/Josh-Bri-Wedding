import Header from "../components/Header";

const faqs = [
  {
    question: "What is the Dress Code?",
    answer: "Cocktail attire.\nSemi-formal, polished outfits are perfect.",
  },
  {
    question: "What time should I arrive?",
    answer: "TBD",
  },
  {
    question: "Where is the Wedding Ceremony and Reception?",
    answer:
      "The wedding ceremony and reception will both be held at The Blue Magnolia in Houston, TX.\n\n1 Whispering Pines St\nMagnolia, TX  77354",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We would love to celebrate with everyone, but due to limited space, we can only accommodate those guests listed on your invitation and RSVP. Thank you so much for understanding!",
  },
  {
    question: "Can I make song recommendations?",
    answer:
      "Yes! We'd love your suggestions. There will be cards at the wedding where you can share song requests for the DJ.",
  },
  {
    question: "Where should I park?",
    answer:
      "Parking is available on site and, if needed, cars can be left overnight to ensure everyone's safety going home. But per the venue, all vehicles need to be picked up before 10am the next day.",
  },
  {
    question: "Are there hotels nearby?",
    answer:
      "We recommend exploring the many hotels near the venue, which offer convenient locations and a range of affordable options.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <h1 className="font-script text-primary text-4xl md:text-7xl text-center">
          Frequently Asked Questions
        </h1>
        <div className="w-32 h-0.5 bg-primary mx-auto mt-2" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="text-center">
              <h3 className="font-script text-primary text-xl md:text-2xl underline underline-offset-4 decoration-primary/40">
                {faq.question}
              </h3>
              <p className="font-serif text-foreground mt-3 text-sm md:text-base whitespace-pre-line leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
