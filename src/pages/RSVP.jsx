
import { useState } from "react";
import Header from "../components/Header";

const MOCK_GUESTS = {
  "Lauren Green": ["Lauren Green", "Timothy Green"],
  "Timothy Green": ["Lauren Green", "Timothy Green"],
  "Sarah Johnson": ["Sarah Johnson", "Mike Johnson"],
  "Mike Johnson": ["Sarah Johnson", "Mike Johnson"],
};

const RSVP = () => {
  const [selectedName, setSelectedName] = useState("");
  const [partyMembers, setPartyMembers] = useState([]);
  const [checkedMembers, setCheckedMembers] = useState(new Set());
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allNames = Object.keys(MOCK_GUESTS);
  const filteredNames = allNames.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectName = (name) => {
    setSelectedName(name);
    setPartyMembers(MOCK_GUESTS[name] || []);
    setCheckedMembers(new Set());
    setSearchOpen(false);
    setSearch("");
  };

  const toggleMember = (member) => {
    setCheckedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(member)) next.delete(member);
      else next.add(member);
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-20 px-4">
          <h1 className="font-script text-primary text-4xl md:text-6xl">
            Thank You!
          </h1>
          <p className="font-serif text-foreground mt-4 text-lg">
            Your RSVP has been submitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-center font-serif text-foreground text-4xl md:text-6xl tracking-[0.4em] font-light">
          R S V P
        </h1>

        <div className="w-24 h-0.5 bg-primary mx-auto mt-2" />

        <p className="text-center font-serif text-foreground mt-4 text-sm md:text-base">
          Select one member of your party to get started.
        </p>

        {/* Name selector */}
        <div className="mt-6">
          <label className="font-serif text-foreground font-bold text-sm">
            Name
          </label>

          <div className="relative mt-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-full bg-input rounded-lg px-4 py-3 text-left font-serif text-muted-foreground flex items-center justify-between border border-border"
            >
              <span>{selectedName || "Search..."}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {searchOpen && (
              <div className="absolute z-20 w-full bg-input border border-border rounded-lg mt-1 shadow-lg">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 font-serif text-foreground bg-transparent border-b border-border focus:outline-none"
                  autoFocus
                />

                <div className="max-h-40 overflow-y-auto">
                  {filteredNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => handleSelectName(name)}
                      className="w-full text-left px-4 py-2 font-serif text-foreground hover:bg-muted transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Party members */}
        {partyMembers.length > 0 && (
          <div className="mt-8">
            <h2 className="font-script text-primary text-3xl text-center">
              Your Party
            </h2>

            <p className="text-center font-serif text-foreground text-sm mt-2">
              Select the members of your party who will be coming
            </p>

            <div className="bg-card rounded-lg p-4 mt-4 space-y-3">
              {partyMembers.map((member) => (
                <label
                  key={member}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedMembers.has(member)}
                    onChange={() => toggleMember(member)}
                    className="w-5 h-5 rounded border-2 border-border accent-secondary"
                  />
                  <span className="font-serif text-foreground">
                    {member}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mt-8">
          <p className="text-center font-serif text-foreground text-sm">
            Add an email so we can keep you updated and send out reminders!
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Add Email..."
            className="w-full bg-input rounded-lg px-4 py-3 mt-3 font-serif text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Submit */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-secondary text-secondary-foreground font-serif font-bold text-lg px-10 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVP;

