using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Spoj
    {
        [Key]
        public int ID { get; set; }

        [JsonIgnore]
        public virtual Korisnik Korisnik { get; set; }

        [JsonIgnore]
        public virtual Posao Posao { get; set; }

    }
}