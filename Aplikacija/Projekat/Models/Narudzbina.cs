using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Narudzbina
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int KorisnikFK { get; set; }

        [Required]
        public int ProizvodFK { get; set; }

        [Required]
        public int DomacinstvoFK { get; set; }

        [Required]
        public int DostavljacFK { get; set; }

        [Required]
        public int CenaDostavljaca {get; set; }
        
        [Required]
        public int CenaProizvoda {get; set;} 

        [Required]
        public int ProveriDostava {get; set; }

        [Required]
        public int brojProizvoda {get; set; }

        [Required]
        public string ImeProizvoda{get;set;}

    }
}