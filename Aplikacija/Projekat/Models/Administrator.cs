using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Administrator
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        [Column("E-mail")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string email { get; set; }

        [Required]
        [Column("Br. telefona")]
        [Phone]
        [RegularExpression("^\\s*\\+?\\s*([0-9][\\s-]*){9,}$")]
        public string telefon { get; set; }

        // veze ------------------------------

        [JsonIgnore]
        public virtual List<Korisnik> Korisnici { get; set; }

        [JsonIgnore]
        public virtual List<Dostavljac> Dostavljaci { get; set; }

        [JsonIgnore]
        public virtual List<Domacinstvo> Domacinstva { get; set; }

    }
}