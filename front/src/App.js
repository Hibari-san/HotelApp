import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomSelection from "./components/RoomSelection";
import RoomConfiguration from "./components/RoomConfiguration";
import ReservationSummary from "./components/ReservationSummary";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoomSelection />} />
                <Route path="/configure" element={<RoomConfiguration />} />
                <Route path="/summary" element={<ReservationSummary />} />
                <Route path="/configure-room" element={<RoomConfiguration />} />
            </Routes>
        </Router>
    );
}

export default App;
