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

        public ProjekatContext Context { get; set; }
        public KorisnikController(ProjekatContext context)
        {
            Context = context;
        }
        [HttpGet]  
        public ActionResult Test()
        {
            return Ok("test");
        } 

        [Route("PreuzetiKorisnika/{email}/{password}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiKorisnika(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos!");
            }
            if (string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.email == email && p.Password == password).FirstOrDefaultAsync();
                if (korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                return Ok(korisnik);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiKorisnika/{idK}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiKorisnika(int idK)
        {
            if (idK < 0)
            {
                return BadRequest("Nevalidan ID!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == idK).FirstOrDefaultAsync();
                if (korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                return Ok(korisnik);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("VratiPorukeKorisnika/{id}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> vratiPorukeKorisnika(int id)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == id).FirstOrDefaultAsync();
                if (korisnik == null)
                {
                    return BadRequest("Nepostoje korisnik sa zadatim id!");
                }
                var poruke = await Context.Poruke
                            .Include(p => p.Korisnik).Where(p => p.Korisnik.ID == id)
                            .Select(p => new {
                                p.ID,
                                p.sadrzaj
                            }).ToArrayAsync();
                return Ok(poruke);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiPoruku/{idKorisnik}/{idPoruke}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisatiPoruku(int idKorisnik, int idPoruke)
        {
            if(idKorisnik < 0 || idPoruke < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == idKorisnik).FirstOrDefaultAsync();
                if(korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                var poruka = await Context.Poruke.Include(p => p.Domacinstvo).Where(p => p.ID == idPoruke).FirstOrDefaultAsync();
                if(poruka == null){
                    return BadRequest("Ne postoji poruka!");
                }
                korisnik.inbox.Remove(poruka);
                poruka.Korisnik = null;
                await Context.SaveChangesAsync();
                if(poruka.Domacinstvo == null){
                    Context.Poruke.Remove(poruka);
                 }
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana poruka!");
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

        [NonAction]
        public bool CheckEmail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }


        [Route("PromenitiSifruKorisnika/{email}/{pass}/{newPass}/{ime}/{prezime}/{username}/{adresa}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> promeniSifruKorisnika(string email, string pass, string newPass,
            string ime, string prezime, string username, string adresa)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            if( string.IsNullOrWhiteSpace(pass) || string.IsNullOrWhiteSpace(newPass) )
            {
                return BadRequest("Morate da unesete sifru!");
            }
            if(!CheckEmail(email))
            {
                return BadRequest("Nevalidan unos za e-mail!");
            }
            if( string.IsNullOrWhiteSpace(ime) )
            {
                return BadRequest("Nevalidan unos za ime!");
            }
            if( string.IsNullOrWhiteSpace(username) )
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if( string.IsNullOrWhiteSpace(prezime) )
            {
                return BadRequest("Nevalidan unos za prezime!");
            }
            if( string.IsNullOrWhiteSpace(adresa) )
            {
                return BadRequest("Nevalidan unos za adresu");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.email == email).FirstOrDefaultAsync();
                if (korisnik == null)
                {
                    return BadRequest("Ne postoji domacinstvo!");
                }
                if( pass == newPass )
                {
                    korisnik.Password = newPass;
                    korisnik.Ime = ime;
                    korisnik.Prezime = prezime;
                    korisnik.Username = username;
                    korisnik.Adresa = adresa;
                    Context.Korisnici.Update(korisnik);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno izmenjena sifra!");
                }
                return BadRequest("Neuspesna izmena!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("DodatiPosao/{idPosla}/{idKorisnika}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajPosao(int idPosla, int idKorisnika)
        {
            try
            {
                var spoj = await Context.Spojevi.Where(p => p.Korisnik.ID == idKorisnika
                                                        && p.Posao.ID == idPosla).FirstOrDefaultAsync();
                if (spoj == null)
                {
                    throw new Exception("Korisnik nije aplicirao za ovaj posao!");
                }
                var posao = await Context.Poslovi.FindAsync(idPosla);
                if (posao == null)
                {
                    throw new Exception("Ne postoji trazeni posao!");
                }
                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);
                if (korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                if (posao.brojRadnihMesta != 0)
                {
                    Spoj s = new Spoj();
                    s.Korisnik = korisnik;
                    s.Posao = posao;
                    posao.brojRadnihMesta--;
                    Context.Spojevi.Add(s);
                    Context.Poslovi.Update(posao);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno smo se prijavili za posao!");
                }
                else
                {
                    return BadRequest("Nije moguce dodati radnika!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
