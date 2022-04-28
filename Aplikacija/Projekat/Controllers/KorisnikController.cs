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
    public class KorisnikController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public KorisnikController(ProjekatContext context)
        {
            Context=context;
        }

        [Route("PreuzetiKorisnika/{email}/{password}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> preuzmiKorisnika(string email, string password)
        {   
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos!");
            }
            if(string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.email == email || p.Password == password).FirstOrDefaultAsync();
                if(korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                return Ok(korisnik);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("PreuzetiKorpu/{idKorisnika}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiKorpu(int idKorisnika)
        {
            try
            {
                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);
                if(korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                var korpa = await Context.Korisnici
                                .Include(p => p.Korpa).Where(p => p.ID == idKorisnika)
                                .Select(p => new
                                {
                                    p.Korpa.
                                })
            }
        }*/

        

        [Route("PromenitiSifruKorisnika/{email}/{pass}/{newPass}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> promeniSifruKorisnika(String email, String pass, String newPass)
        {
            if (String.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.email == email && p.Password == pass).FirstOrDefaultAsync();
                if (korisnik != null)
                {
                    korisnik.Password = newPass;
                    Context.Korisnici.Update(korisnik);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno izmenjena sifra!");
                }
                else
                {
                   return BadRequest("Nevalidan email ili sifra!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }       
    }
}
