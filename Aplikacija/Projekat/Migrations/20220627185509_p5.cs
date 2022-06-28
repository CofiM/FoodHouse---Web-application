using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SWE___PROJEKAT.Migrations
{
    public partial class p5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Dostavljač");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Domaćinstvo");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Dostavljač",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Dostavljač",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Domaćinstvo",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Domaćinstvo",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Dostavljač");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Dostavljač");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Domaćinstvo");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Domaćinstvo");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Dostavljač",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Domaćinstvo",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
