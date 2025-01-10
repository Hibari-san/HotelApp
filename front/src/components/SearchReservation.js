import React, { useState } from "react";
import axios from "axios";

const SearchReservation = () => {
    const [reservationNumber, setReservationNumber] = useState("");
    const [reservationDetails, setReservationDetails] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://localhost:7029/api/reservations/${reservationNumber}`);
            setReservationDetails(response.data);
            setError(""); // Wyczyść poprzednie błędy
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch reservation details.");
            setReservationDetails(null);
        }
    };

    return (
        <div>
            <h1>Wyszukaj Rezerwacji</h1>
            <input
                type="text"
                placeholder="Wprowadz numer rezerwacji"
                value={reservationNumber}
                onChange={(e) => setReservationNumber(e.target.value)}
            />
            <button onClick={handleSearch}>Wyszukaj</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {reservationDetails && (
                <div>
                    <h2>Szczegóły rezerwacji:</h2>
                    <p><strong>Numer Rezerwacji:</strong> {reservationDetails.reservationNumber}</p>
                    <p><strong>Data od:</strong> {reservationDetails.startDate}</p>
                    <p><strong>Data do:</strong> {reservationDetails.endDate}</p>
                    <p><strong>Koszt:</strong> {reservationDetails.totalCost} PLN</p>
                    <p><strong>Śniadanie:</strong> {reservationDetails.breakfast}</p>
                    <p><strong>podwójne łóżko:</strong> {reservationDetails.doubleBed}</p>
                </div>
            )}

        </div>
    );
};

export default SearchReservation;
