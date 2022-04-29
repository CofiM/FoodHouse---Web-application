using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Proizvod
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naziv { get; set; }

        [Required]
        [Column("Količina")]
        [Range(1, 1000)]
        public int Kolicina { get; set; }

        [Required]
        public int Cena { get; set; }

        [Required]
        [MaxLength(500)]
        public string Opis { get; set; }

        [Required]
        [MaxLength(100)]
        public string Kategorija { get; set; }

        // veze ------------------------------
        [JsonIgnore]
        public virtual Domacinstvo Domacinstvo { get; set; }

        [JsonIgnore]
        public virtual List<Recenzija> Recenzije { get; set; }

        [JsonIgnore]
        public virtual Kupovina Kupovina { get; set; }
    }
}