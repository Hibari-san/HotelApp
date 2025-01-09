import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomSelection = () => {
    const [rooms, setRooms] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    const fetchAvailableRooms = async () => {
        try {
            const response = await axios.get("https://localhost:7029/api/reservations/available-rooms", {
                params: { startDate, endDate },
            });
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching available rooms:", error);
        }
    };

    const handleSelectRoom = (room) => {
        navigate("/configure-room", { state: { room, startDate, endDate } });
    };

    return (
        <div>
            <h1>Select a Room</h1>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={fetchAvailableRooms}>Check Availability</button>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        {room.type} - Capacity: {room.capacity}{" "}
                        <button onClick={() => handleSelectRoom(room)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomSelection;
