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
  const [showConfirm, setShowConfirm] = useState(false);

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

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  // First submit → open modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Final submit → send to Netlify
  const handleFinalSubmit = async () => {
    const formData = {
      "form-name": "rsvp",
      name: selectedName,
      email,
      attending: Array.from(checkedMembers).join(", "),
      not_attending: partyMembers
        .filter((m) => !checkedMembers.has(m))
        .join(", "),
    };

    console.log("form data:", formData);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });
    } catch (err) {
      console.log("Local dev - no Netlify backend");
    }

    setShowConfirm(false);
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

      <form
        name="rsvp"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto px-4 py-10 md:py-16"
      >
        {/* Required hidden input */}
        <input type="hidden" name="form-name" value="rsvp" />

        {/* Hidden fields for Netlify */}
        <input type="hidden" name="name" value={selectedName} />
        <input
          type="hidden"
          name="attending"
          value={Array.from(checkedMembers).join(", ")}
        />
        <input
          type="hidden"
          name="not_attending"
          value={partyMembers
            .filter((m) => !checkedMembers.has(m))
            .join(", ")}
        />

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
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-full bg-input rounded-lg px-4 py-3 text-left font-serif text-muted-foreground flex items-center justify-between border border-border"
            >
              <span>{selectedName || "Search..."}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                      type="button"
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
                <label key={member} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedMembers.has(member)}
                    onChange={() => toggleMember(member)}
                    className="w-5 h-5 rounded border-2 border-border accent-secondary"
                  />
                  <span className="font-serif text-foreground">{member}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mt-8">
          <p className="text-center font-serif text-foreground text-sm">
            Add an email so we can keep you updated and send reminders!
          </p>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Add Email..."
            className="w-full bg-input rounded-lg px-4 py-3 mt-3 font-serif text-foreground border border-border"
          />
        </div>

        {/* Submit */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-secondary text-secondary-foreground font-serif font-bold text-lg px-10 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Submit
          </button>
        </div>

        {/* ✅ Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
              <h2 className="text-center font-script text-primary text-3xl mb-4">
                Confirm Your Party
              </h2>

              <div className="mb-4">
                <p className="font-serif font-bold text-foreground">Attending:</p>
                <p className="font-serif text-foreground">
                  {Array.from(checkedMembers).join(", ") || "None"}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-serif font-bold text-foreground">Not Attending:</p>
                <p className="font-serif text-foreground">
                  {partyMembers
                    .filter((m) => !checkedMembers.has(m))
                    .join(", ") || "None"}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-serif font-bold text-foreground">Email:</p>
                <p className="font-serif text-foreground">
                  {email || "Not provided"}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-full border border-border font-serif"
                >
                  Go Back
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground font-serif font-bold"
                >
                  Confirm RSVP
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RSVP;