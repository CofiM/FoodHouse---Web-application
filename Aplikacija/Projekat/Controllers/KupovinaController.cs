using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace SWE___PROJEKAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KupovinaController : ControllerBase
    {

        public ProjekatContext Context { get; set; }
        public KupovinaController(ProjekatContext context)
        {
            Context = context;
        }

        [Route("DodatiKupovinu/{idP}/{idKorisnika}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajKupovinu(int idP, int idKorisnika)
        {
            if (idP < 0)
            {
                return BadRequest("Pogresan ID proizvoda!");
            }
            if (idKorisnika < 0)
            {
                return BadRequest("Pogresan ID korisnika!");
            }
            try
            {
                var proizvod = await Context.Proizvodi
                .Where(p => p.ID == idP)
                .Include(p => p.Domacinstvo)
                .ThenInclude(p => p.Dostavljac)
                .FirstOrDefaultAsync();
                var korisnik = await Context.Korisnici
                .Where(p => p.ID == idKorisnika)
                .FirstOrDefaultAsync();
                if (proizvod == null || korisnik == null)
                {
                    return BadRequest("Nije pronadjen proizvod ili korinik");
                }
                else
                {
                    var dostavljac = proizvod.Domacinstvo.Dostavljac;
                    var kupovina = new Kupovina();
                    kupovina.Proizvod = proizvod;
                    kupovina.Korisnik = korisnik;
                    kupovina.Dostavljac = dostavljac;
                    //Nisam nista dalje radio jer ne razumem ovo ProizvodFK zar to
                    //isto kao i proizvod?
                    return Ok("CAO");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
