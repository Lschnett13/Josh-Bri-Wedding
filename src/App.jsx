import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP"
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import Registry from "./pages/Registry";

const App = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rsvp" element={<RSVP />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/registry" element={<Registry />} />
            </Routes>
        </main>
    )
}

export default App