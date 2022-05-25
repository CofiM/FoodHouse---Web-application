using Microsoft.EntityFrameworkCore.Migrations;

namespace SWE___PROJEKAT.Migrations
{
    public partial class v13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Poruka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sadrzaj = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DomacinstvoID = table.Column<int>(type: "int", nullable: true),
                    DostavljacID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poruka", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Poruka_Domaćinstvo_DomacinstvoID",
                        column: x => x.DomacinstvoID,
                        principalTable: "Domaćinstvo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Poruka_Dostavljač_DostavljacID",
                        column: x => x.DostavljacID,
                        principalTable: "Dostavljač",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Poruka_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Poruka_DomacinstvoID",
                table: "Poruka",
                column: "DomacinstvoID");

            migrationBuilder.CreateIndex(
                name: "IX_Poruka_DostavljacID",
                table: "Poruka",
                column: "DostavljacID");

            migrationBuilder.CreateIndex(
                name: "IX_Poruka_KorisnikID",
                table: "Poruka",
                column: "KorisnikID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Poruka");
        }
    }
}
