using System;

namespace HotelReservationAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsDoubleBed { get; set; } // Dodano
        public bool HasBreakfast { get; set; } // Dodano
    }
}

