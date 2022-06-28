using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SWE___PROJEKAT.Migrations
{
    public partial class pass2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Korisnik");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Korisnik",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Korisnik",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Korisnik");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Korisnik");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Korisnik",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
