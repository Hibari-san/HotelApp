import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReservationSummary = () => {
    const location = useLocation();
    const { room, startDate, endDate, isDoubleBed, hasBreakfast } = location.state || {};
    const [reservationNumber, setReservationNumber] = useState(null); // Przechowuje numer rezerwacji
    const [error, setError] = useState(""); // Przechowuje błędy

    // Oblicz liczbę dni (zgodnie z backendem)
    const numberOfDays = Math.max(1, (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1);

    // Oblicz całkowity koszt
    const totalCost = (numberOfDays * room.price) + (hasBreakfast ? numberOfDays * 30 : 0);

    const handleConfirm = async () => {
        const reservation = {
            roomId: room.id,
            startDate,
            endDate,
            isDoubleBed,
            hasBreakfast,
        };

        console.log("Rezerwacja została wysłana:", reservation);

        try {
            const response = await axios.post("https://localhost:7029/api/reservations", reservation);
            setReservationNumber(response.data.reservationNumber); // Zapisz numer rezerwacji
            alert(`Rezerwacja potwierdzona! Koszt: ${response.data.totalCost} PLN`);
            setError(""); // Wyczyść błędy
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Wyświetl błąd z backendu
            } else {
                setError("Nie udało się potwierdzić rezerwacji. Spróbuj ponownie.");
            }
            console.error("błąd przy potiwerdzaniu rezerwacji:", error);
        }
    };

    if (!room || !startDate || !endDate) {
        return (
            <div>
                <h1>Błąd</h1>
                <p>Brakuje danych wejściowych. Rozpocznij rezerwację od początku.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Podsumowanie rezerwacji</h1>
            <p>Typ pokoju: {room.type}</p>
            <p>Miejsca: {room.capacity}</p>
            <p>Cena za dobę: {room.price} PLN</p>
            <p>Data od: {startDate}</p>
            <p>Data do: {endDate}</p>
            <p>Podwójne łóżko: {isDoubleBed ? "TAK" : "NIE"}</p>
            <p>Śniadanie: {hasBreakfast ? "TAK" : "NIE"}</p>
            <h2>Razem do zapłaty: {totalCost.toFixed(2)} PLN</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!reservationNumber ? (
                <button onClick={handleConfirm}>Potwierdź</button>
            ) : (
                <div>
                    <h2>Rezerwacja potwierdzona!</h2>
                    <p>Numer rezerwacji: <strong>{reservationNumber}</strong></p>
                </div>
            )}

            <p>
                <a href="/search-reservation">Przejdź do wyszukiwarki rezerwacji</a>
            </p>
        </div>
    );
};

export default ReservationSummary;
