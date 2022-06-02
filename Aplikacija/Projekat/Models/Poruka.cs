using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Poruka")]
    public class Poruka
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(500)]
        public string sadrzaj { get; set; }

        [Required]
        public char Tip { get; set; }

        
        public bool Flag { get; set; }

        public Domacinstvo Domacinstvo { get; set; }

        [JsonIgnore]
        public Dostavljac Dostavljac { get; set; }

        [JsonIgnore]
        public Korisnik Korisnik { get; set; }
    }
}