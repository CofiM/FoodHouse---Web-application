using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Kupovina
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int ProizvodFK { get; set; }

        // veze ------------------------------

        [JsonIgnore]
        public virtual Dostavljac Dostavljac { get; set; }

        [JsonIgnore]
        public virtual Korisnik Korisnik { get; set; }

        [JsonIgnore]
        public virtual Proizvod Proizvod { get; set; }
    }
}