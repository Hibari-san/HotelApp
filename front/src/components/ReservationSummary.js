import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReservationSummary = () => {
    const location = useLocation();
    const { room, startDate, endDate, isDoubleBed, hasBreakfast } = location.state;

    const handleConfirm = async () => {
        const reservation = {
            roomId: room.id,
            startDate,
            endDate,
            isDoubleBed,
            hasBreakfast,
        };

        console.log("Reservation data being sent:", reservation); // Debugowanie

        try {
            await axios.post("https://localhost:7029/api/reservations", reservation);
            alert("Reservation confirmed!");
        } catch (error) {
            console.error("Error confirming reservation:", error);
            alert("Failed to confirm reservation.");
        }
    };

    return (
        <div>
            <h1>Reservation Summary</h1>
            <p>Room Type: {room.type}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Double Bed: {isDoubleBed ? "Yes" : "No"}</p>
            <p>Breakfast Included: {hasBreakfast ? "Yes" : "No"}</p>
            <button onClick={handleConfirm}>Confirm Reservation</button>
        </div>
    );
};

export default ReservationSummary;
