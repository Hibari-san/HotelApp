using System;

namespace HotelReservationAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsDoubleBed { get; set; }
        public bool HasBreakfast { get; set; }
        public decimal TotalCost { get; set; } // Całkowity koszt rezerwacji
        public string ReservationNumber { get; set; } = Guid.NewGuid().ToString(); // Generuje unikalny numer rezerwacji

    }

}

