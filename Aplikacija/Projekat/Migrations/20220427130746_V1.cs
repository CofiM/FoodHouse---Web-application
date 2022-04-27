using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SWE___PROJEKAT.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administrator",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(name: "E-mail", type: "nvarchar(max)", nullable: false),
                    Brtelefona = table.Column<string>(name: "Br. telefona", type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrator", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Dostavljač",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(name: "E-mail", type: "nvarchar(max)", nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Brtelefona = table.Column<string>(name: "Br. telefona", type: "nvarchar(max)", nullable: false),
                    AdministratorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dostavljač", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dostavljač_Administrator_AdministratorID",
                        column: x => x.AdministratorID,
                        principalTable: "Administrator",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(name: "E-mail", type: "nvarchar(max)", nullable: false),
                    AdministratorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Korisnik_Administrator_AdministratorID",
                        column: x => x.AdministratorID,
                        principalTable: "Administrator",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Domaćinstvo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(name: "E-mail", type: "nvarchar(max)", nullable: false),
                    Brtelefona = table.Column<string>(name: "Br. telefona", type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Danotvorenihvrata = table.Column<DateTime>(name: "Dan otvorenih vrata", type: "datetime2", nullable: false),
                    DostavljacID = table.Column<int>(type: "int", nullable: true),
                    AdministratorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Domaćinstvo", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Domaćinstvo_Administrator_AdministratorID",
                        column: x => x.AdministratorID,
                        principalTable: "Administrator",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Domaćinstvo_Dostavljač_DostavljacID",
                        column: x => x.DostavljacID,
                        principalTable: "Dostavljač",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Poslovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brojradnihmesta = table.Column<int>(name: "Broj radnih mesta", type: "int", nullable: false),
                    Datumpočetkaposla = table.Column<DateTime>(name: "Datum početka posla", type: "datetime2", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    DomacinstvoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poslovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Poslovi_Domaćinstvo_DomacinstvoID",
                        column: x => x.DomacinstvoID,
                        principalTable: "Domaćinstvo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Proizvodi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Količina = table.Column<int>(type: "int", nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Kategorija = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DomacinstvoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvodi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Proizvodi_Domaćinstvo_DomacinstvoID",
                        column: x => x.DomacinstvoID,
                        principalTable: "Domaćinstvo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spojevi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    PosaoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spojevi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Spojevi_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spojevi_Poslovi_PosaoID",
                        column: x => x.PosaoID,
                        principalTable: "Poslovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kupovine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProizvodFK = table.Column<int>(type: "int", nullable: false),
                    DostavljacID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kupovine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Kupovine_Dostavljač_DostavljacID",
                        column: x => x.DostavljacID,
                        principalTable: "Dostavljač",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Kupovine_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Kupovine_Proizvodi_ProizvodFK",
                        column: x => x.ProizvodFK,
                        principalTable: "Proizvodi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recenzije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    Komentar = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ProizvodID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recenzije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Recenzije_Proizvodi_ProizvodID",
                        column: x => x.ProizvodID,
                        principalTable: "Proizvodi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Domaćinstvo_AdministratorID",
                table: "Domaćinstvo",
                column: "AdministratorID");

            migrationBuilder.CreateIndex(
                name: "IX_Domaćinstvo_DostavljacID",
                table: "Domaćinstvo",
                column: "DostavljacID");

            migrationBuilder.CreateIndex(
                name: "IX_Dostavljač_AdministratorID",
                table: "Dostavljač",
                column: "AdministratorID");

            migrationBuilder.CreateIndex(
                name: "IX_Korisnik_AdministratorID",
                table: "Korisnik",
                column: "AdministratorID");

            migrationBuilder.CreateIndex(
                name: "IX_Kupovine_DostavljacID",
                table: "Kupovine",
                column: "DostavljacID");

            migrationBuilder.CreateIndex(
                name: "IX_Kupovine_KorisnikID",
                table: "Kupovine",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Kupovine_ProizvodFK",
                table: "Kupovine",
                column: "ProizvodFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Poslovi_DomacinstvoID",
                table: "Poslovi",
                column: "DomacinstvoID");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvodi_DomacinstvoID",
                table: "Proizvodi",
                column: "DomacinstvoID");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_ProizvodID",
                table: "Recenzije",
                column: "ProizvodID");

            migrationBuilder.CreateIndex(
                name: "IX_Spojevi_KorisnikID",
                table: "Spojevi",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Spojevi_PosaoID",
                table: "Spojevi",
                column: "PosaoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kupovine");

            migrationBuilder.DropTable(
                name: "Recenzije");

            migrationBuilder.DropTable(
                name: "Spojevi");

            migrationBuilder.DropTable(
                name: "Proizvodi");

            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "Poslovi");

            migrationBuilder.DropTable(
                name: "Domaćinstvo");

            migrationBuilder.DropTable(
                name: "Dostavljač");

            migrationBuilder.DropTable(
                name: "Administrator");
        }
    }
}
