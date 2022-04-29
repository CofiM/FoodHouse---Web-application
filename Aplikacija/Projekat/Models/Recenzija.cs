using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Recenzija
    {
        [Key]
        public int ID { get; set; }

        [Range(1,5)]
        [Required]
        [RegularExpression("\\d$")]
        public int Ocena { get; set; }

        [MaxLength(100)]
        public string Komentar { get; set; }

        // VEZE --------------------------

        [JsonIgnore]
        public virtual Proizvod Proizvod { get; set; }
    }
}