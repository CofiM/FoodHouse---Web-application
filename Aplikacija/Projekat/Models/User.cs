using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("User")]
    public class User
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
        public  byte[] PasswordHash { get; set; }

        [Required]
        public  byte[] PasswordSalt { get; set; }

        [Required]
        [Column("E-mail")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string email { get; set; }


        [Required]
        public char Tip { get; set; }

        [Required]
        [MaxLength(100)]
        public string Adresa { get; set; }
    }
}