using Microsoft.EntityFrameworkCore.Migrations;

namespace SWE___PROJEKAT.Migrations
{
    public partial class ficafinal7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Narudzbine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnikFK = table.Column<int>(type: "int", nullable: false),
                    ProizvodFK = table.Column<int>(type: "int", nullable: false),
                    DomacinstvoFK = table.Column<int>(type: "int", nullable: false),
                    DostavljacFK = table.Column<int>(type: "int", nullable: false),
                    CenaDostavljaca = table.Column<int>(type: "int", nullable: false),
                    CenaProizvoda = table.Column<int>(type: "int", nullable: false),
                    ProveriDostava = table.Column<int>(type: "int", nullable: false),
                    brojProizvoda = table.Column<int>(type: "int", nullable: false),
                    ImeProizvoda = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzbine", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Narudzbine");
        }
    }
}
