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
            Console.WriteLine($"Checking availability for dates: StartDate={startDate}, EndDate={endDate}");

            // Pobierz listę zajętych pokoi w wybranym przedziale dat
            var unavailableRoomIds = await _context.Reservations
                .Where(r => r.StartDate <= endDate && r.EndDate >= startDate)
                .Select(r => r.RoomId)
                .ToListAsync();

            Console.WriteLine("Unavailable Room IDs: " + string.Join(", ", unavailableRoomIds));

            // Pobierz listę dostępnych pokoi
            var availableRooms = await _context.Rooms
                .Where(r => !unavailableRoomIds.Contains(r.Id))
                .ToListAsync();

            Console.WriteLine("Available Rooms: " + string.Join(", ", availableRooms.Select(r => r.Id)));

            return Ok(availableRooms);
        }



        [HttpPost]
        public async Task<IActionResult> MakeReservation([FromBody] Reservation reservation)
        {
            Console.WriteLine($"Received reservation: RoomId={reservation.RoomId}, StartDate={reservation.StartDate}, EndDate={reservation.EndDate}, IsDoubleBed={reservation.IsDoubleBed}, HasBreakfast={reservation.HasBreakfast}");

            // Walidacja dat
            if (reservation.StartDate > reservation.EndDate)
            {
                return BadRequest(new { message = "Start date must be before or equal to end date." });
            }

            // Pobierz istniejące rezerwacje dla danego pokoju
            var existingReservations = await _context.Reservations
                .Where(r => r.RoomId == reservation.RoomId)
                .ToListAsync();

            Console.WriteLine("Existing reservations:");
            foreach (var res in existingReservations)
            {
                Console.WriteLine($"RoomId={res.RoomId}, StartDate={res.StartDate}, EndDate={res.EndDate}");
            }

            // Sprawdzenie kolizji dat
            var isRoomAvailable = !existingReservations
                .Any(r => r.StartDate <= reservation.EndDate && r.EndDate >= reservation.StartDate);

            if (!isRoomAvailable)
            {
                return BadRequest(new { message = "Room is not available for the selected dates." });
            }

            try
            {
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                Console.WriteLine("Reservation successfully added!");
                return Ok(new { message = "Reservation confirmed." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during reservation: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the reservation.", error = ex.Message });
            }
        }




    }
}
