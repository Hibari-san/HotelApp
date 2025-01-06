namespace HotelReservationAPI.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Type { get; set; } // Single, Double, Quad
        public int Capacity { get; set; }
        public bool IsDoubleBed { get; set; } // For Quad rooms
        public bool HasBreakfast { get; set; }
    }
}
