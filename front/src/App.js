import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomSelection from "./components/RoomSelection";
import RoomConfiguration from "./components/RoomConfiguration";
import ReservationSummary from "./components/ReservationSummary";
import SearchReservation from "./components/SearchReservation";
import Header from "./components/Header";
function App() {
    return (
        <>
           <Header />
                <Router>
                    <Routes>
                        <Route path="/" element={<RoomSelection />} />
                        <Route path="/configure" element={<RoomConfiguration />} />
                        <Route path="/summary" element={<ReservationSummary />} />
                        <Route path="/configure-room" element={<RoomConfiguration />} />
                        <Route path="/search-reservation" element={<SearchReservation />} />
                    </Routes>
                </Router>
        </>
    );
}

export default App;
