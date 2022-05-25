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

        public Domacinstvo Domacinstvo { get; set; }

        public Dostavljac Dostavljac { get; set; }

        public Korisnik Korisnik { get; set; }
    }
}