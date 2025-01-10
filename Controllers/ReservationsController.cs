using HotelReservationAPI.Data;
using HotelReservationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReservationsController(HotelDbContext context)
        {
            _context = context;
        }

        [HttpGet("available-rooms")]
        public async Task<IActionResult> GetAvailableRooms(DateTime startDate, DateTime endDate)
        {
            Console.WriteLine($"sprawdzam dostępność: StartDate={startDate}, EndDate={endDate}");

            // Pobierz listę zajętych pokoi w wybranym przedziale dat
            var unavailableRoomIds = await _context.Reservations
                .Where(r => r.StartDate <= endDate && r.EndDate >= startDate)
                .Select(r => r.RoomId)
                .ToListAsync();

            Console.WriteLine("niedostepne pokoje: " + string.Join(", ", unavailableRoomIds));

            // Pobierz listę dostępnych pokoi
            var availableRooms = await _context.Rooms
                .Where(r => !unavailableRoomIds.Contains(r.Id))
                .ToListAsync();

            Console.WriteLine("dostępne pokoje: " + string.Join(", ", availableRooms.Select(r => r.Id)));

            return Ok(availableRooms);
        }

        [HttpGet("{reservationNumber}")]
        public async Task<IActionResult> GetReservationByNumber(string reservationNumber)
        {
            // Pobierz rezerwację na podstawie numeru
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.ReservationNumber == reservationNumber);

            if (reservation == null)
            {
                return NotFound(new { message = "nie znaleziono rezerwacji." });
            }

            return Ok(new
            {
                reservation.ReservationNumber,
                RoomId = reservation.RoomId,
                reservation.StartDate,
                reservation.EndDate,
                reservation.TotalCost,
                Breakfast = reservation.HasBreakfast ? "tak" : "Nie",
                DoubleBed = reservation.IsDoubleBed ? "tak" : "nie"
            });
        }



        [HttpPost]
        public async Task<IActionResult> MakeReservation([FromBody] Reservation reservation)
        {
            Console.WriteLine($"Received reservation: RoomId={reservation.RoomId}, StartDate={reservation.StartDate}, EndDate={reservation.EndDate}, IsDoubleBed={reservation.IsDoubleBed}, HasBreakfast={reservation.HasBreakfast}");

            if (reservation.StartDate > reservation.EndDate)
            {
                return BadRequest(new { message = "data rozpoczęcia musi byc wcześniejsza niż data zakończenia." });
            }

            var room = await _context.Rooms.FindAsync(reservation.RoomId);
            if (room == null)
            {
                return NotFound(new { message = "Nie znaleziono pokoju." });
            }

            int numberOfDays = (reservation.EndDate - reservation.StartDate).Days + 1;
            decimal totalCost = numberOfDays * room.Price + (reservation.HasBreakfast ? numberOfDays * 30 : 0);
            reservation.TotalCost = totalCost;

            var isRoomAvailable = !await _context.Reservations
                .AnyAsync(r => r.RoomId == reservation.RoomId &&
                               r.StartDate <= reservation.EndDate &&
                               r.EndDate >= reservation.StartDate);

            if (!isRoomAvailable)
            {
                return BadRequest(new { message = "Rdla podanego okresu pokój jest niedostępny." });
            }

            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Rezerwacja dodana pomyslnie! Koszt: {reservation.TotalCost}, RNumer rezerwacji: {reservation.ReservationNumber}");
                return Ok(new
                {
                    message = "Rezerwacja potwierdzona.",
                    totalCost = reservation.TotalCost,
                    reservationNumber = reservation.ReservationNumber
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd przetwarzania rezerwacji: {ex.Message}");
                return StatusCode(500, new { message = "wystapił błąd podczas przetwarzania rezerwacji.", error = ex.Message });
            }
        }






    }
}
