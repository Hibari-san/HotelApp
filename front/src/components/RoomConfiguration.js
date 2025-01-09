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
            <h1>Configure Room</h1>
            <p>Type: {room.type}</p>
            <p>Capacity: {room.capacity}</p>

            {room.type === "Quad" && (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isDoubleBed}
                            onChange={(e) => setIsDoubleBed(e.target.checked)}
                        />
                        Double Bed
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
                    Include Breakfast
                </label>
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default RoomConfiguration;
