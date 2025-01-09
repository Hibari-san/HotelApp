import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReservationSummary = () => {
    const location = useLocation();
    const { room, startDate, endDate, isDoubleBed, hasBreakfast } = location.state || {};

    // Oblicz liczbę dni
    const numberOfDays = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));

    // Oblicz koszt pokoju
    const roomCost = numberOfDays * room.price;

    // Oblicz koszt śniadania (jeśli wybrano)
    const breakfastCost = hasBreakfast ? numberOfDays * 30 : 0;

    // Całkowity koszt
    const totalCost = roomCost + breakfastCost;

    const handleConfirm = async () => {
        const reservation = {
            roomId: room.id,
            startDate,
            endDate,
            isDoubleBed,
            hasBreakfast,
        };

        console.log("Reservation being sent:", reservation);

        try {
            const response = await axios.post("https://localhost:7029/api/reservations", reservation);
            alert(`Rezerwacja potwierdzona`);
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Nie udalo sie potiwerdzic rezerwacji: ${error.response.data.message}`);
            } else {
                alert("nie udalo sie, zacznij jeszcze raz.");
            }
            console.error("Error confirming reservation:", error);
        }
    };

    if (!room || !startDate || !endDate) {
        return (
            <div>
                <h1>Error</h1>
                <p>co poszo nie tak. zacznij ponownie.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Podsumowanie rezerwacji</h1>
            <p>Typ pokoju: {room.type}</p>
            <p>miejsca: {room.capacity}</p>
            <p>cena za dobe: {room.price} PLN</p>
            <p>data od: {startDate}</p>
            <p>data do: {endDate}</p>
            <p>podwojne lozko: {isDoubleBed ? "TAK" : "NIE"}</p>
            <p>Sniadanie: {hasBreakfast ? "TAK" : "NIE"}</p>
            <p>Cena Pokoju: {roomCost} PLN</p>
            <p>Cena Sniadan: {breakfastCost} PLN</p>
            <h2>Razem: {totalCost} PLN</h2>
            <button onClick={handleConfirm}>Potwierdz</button>
        </div>
    );
};

export default ReservationSummary;
