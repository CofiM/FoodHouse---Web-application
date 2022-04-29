using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Posao
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Range(1,200)]
        [Column("Broj radnih mesta")]
        public int brojRadnihMesta { get; set; }

        [Required]
        [Column("Datum početka posla")]
        public DateTime Datum { get; set; }

        [Required]
        [MaxLength(500)]
        public string Opis { get; set; }

        [Required]
        public int Cena { get; set; }

        // veze ------------------------------
        [JsonIgnore]
        public virtual List<Spoj> PosaoKorisnik { get; set; }

        [JsonIgnore]
        public virtual Domacinstvo Domacinstvo { get; set; }
    }
}