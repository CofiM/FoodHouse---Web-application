using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(30)]
        public string Prezime { get; set; }

        [Required]
        [MaxLength(30)]
        public string Username { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        [Column("E-mail")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string email { get; set; }


        [Required]
        public char Tip { get; set; }

        [Required]
        [MaxLength(100)]
        public string Adresa { get; set; }

        public List<Poruka> inbox { get; set; }

        // VEZE --------------------------

        [JsonIgnore]
        public virtual List<Spoj> KorisnikPosao { get; set; }

        [JsonIgnore]
        public virtual List<Kupovina> Korpa { get; set; }

        [JsonIgnore]
        public virtual Administrator Administrator { get; set; }
    }
}