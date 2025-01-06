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
            var unavailableRoomIds = await _context.Reservations
                .Where(r => r.StartDate < endDate && r.EndDate > startDate)
                .Select(r => r.RoomId)
                .ToListAsync();

            var availableRooms = await _context.Rooms
                .Where(r => !unavailableRoomIds.Contains(r.Id))
                .ToListAsync();

            return Ok(availableRooms);
        }

        [HttpPost]
        public async Task<IActionResult> MakeReservation([FromBody] Reservation reservation)
        {
            if (reservation.StartDate >= reservation.EndDate)
                return BadRequest("Start date must be before end date.");

            var isRoomAvailable = !await _context.Reservations
                .AnyAsync(r => r.RoomId == reservation.RoomId &&
                               r.StartDate < reservation.EndDate &&
                               r.EndDate > reservation.StartDate);

            if (!isRoomAvailable)
                return BadRequest("Room is not available for the selected dates.");

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok(reservation);
        }
    }
}
