using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class AddDoubleBedAndBreakfast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Rooms_RoomId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_RoomId",
                table: "Reservations");

            migrationBuilder.AddColumn<bool>(
                name: "HasBreakfast",
                table: "Reservations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDoubleBed",
                table: "Reservations",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasBreakfast",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "IsDoubleBed",
                table: "Reservations");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RoomId",
                table: "Reservations",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Rooms_RoomId",
                table: "Reservations",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
