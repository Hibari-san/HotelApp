import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoomConfiguration = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { room, startDate, endDate } = location.state;
    const [isDoubleBed, setIsDoubleBed] = useState(room.isDoubleBed);
    const [hasBreakfast, setHasBreakfast] = useState(room.hasBreakfast);

    const handleNext = () => {
        navigate("/summary", {
            state: { room, startDate, endDate, isDoubleBed, hasBreakfast },
        });
    };


    return (
        <div>
            <h1>Opcje dodatkowe</h1>
            <p>Typ: {room.type}</p>
            <p>Miejsca: {room.capacity}</p>

            {room.type === "Quad" && (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isDoubleBed}
                            onChange={(e) => setIsDoubleBed(e.target.checked)}
                        />
                        Podwójne łóżko
                    </label>
                </div>
            )}

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={hasBreakfast}
                        onChange={(e) => setHasBreakfast(e.target.checked)}
                    />
                    Śniadanie
                </label>
            </div>
            <button onClick={handleNext}>Dalej</button>
        </div>
    );
};

export default RoomConfiguration;
