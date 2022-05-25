using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Domaćinstvo")]
    public class Domacinstvo
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

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
        [Column("Br. telefona")]
        [Phone]
        [RegularExpression("^\\s*\\+?\\s*([0-9][\\s-]*){9,}$")]
        public string telefon { get; set; }

        [Required]
        [MaxLength(100)]
        public string Adresa { get; set; }

        [Required]
        [Column("Dan otvorenih vrata")]
        public DateTime otvorenaVrata { get; set; }

        [Required]
        public char Tip { get; set; }

        public List<Poruka> inbox { get; set; }

        // VEZE --------------------------

        [JsonIgnore]
        public virtual List<Posao> Poslovi { get; set; }

        [JsonIgnore]
        public virtual List<Proizvod> Proizvodi { get; set; }

        [JsonIgnore]
        public virtual Dostavljac Dostavljac { get; set; }

        [JsonIgnore]
        public virtual Administrator Administrator { get; set; }
    }
}