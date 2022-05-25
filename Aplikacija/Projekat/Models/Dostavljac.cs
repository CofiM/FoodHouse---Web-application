using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Dostavljač")]
    public class Dostavljac
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
        public int Cena { get; set; }

        [Required]
        [Column("Br. telefona")]
        [Phone]
        [RegularExpression("^\\s*\\+?\\s*([0-9][\\s-]*){9,}$")]
        public string telefon { get; set; }

        [Required]
        public char Tip { get; set; }

        public List<Poruka> inbox { get; set; }
        // veze ------------------------------
        [JsonIgnore]
        public virtual List<Domacinstvo> Domacinstva { get; set; }

        [JsonIgnore]
        public virtual List<Kupovina> Kupovine { get; set; }

        [JsonIgnore]
        public virtual Administrator Administrator { get; set; }
    }
}