using HotelReservationAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationAPI.Data
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options) { }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seedowanie danych dla pokoi
            modelBuilder.Entity<Room>().HasData(
                new Room { Id = 1, Type = "Single", Capacity = 1, HasBreakfast = true, IsDoubleBed = false },
                new Room { Id = 2, Type = "Single", Capacity = 1, HasBreakfast = false, IsDoubleBed = false },
                new Room { Id = 3, Type = "Double", Capacity = 2, HasBreakfast = true, IsDoubleBed = true },
                new Room { Id = 4, Type = "Double", Capacity = 2, HasBreakfast = false, IsDoubleBed = true },
                new Room { Id = 5, Type = "Quad", Capacity = 4, HasBreakfast = true, IsDoubleBed = false },
                new Room { Id = 6, Type = "Quad", Capacity = 4, HasBreakfast = false, IsDoubleBed = true }
            );
        }
    }
}
