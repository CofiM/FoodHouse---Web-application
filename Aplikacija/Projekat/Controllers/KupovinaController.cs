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

        [Route("DodatiKupovinu/{idProizvoda}/{idKorisnika}/{idDostavljaca}/{suma}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajKupovinu(int idProizvoda, int idKorisnika,int idDostavljaca,int suma)
        {
            if (idProizvoda < 0)
            {
                return BadRequest("Pogresan ID proizvoda!");
            }
            if (idKorisnika     < 0)
            {
                return BadRequest("Pogresan ID korisnika!");
            }
             if (suma < 0)
            {
                return BadRequest("Pogresna suma");
            }

            try
            {
                var proizvod = await Context.Proizvodi
                .Where(p => p.ID == idProizvoda)
                .Include(p => p.Domacinstvo)
                .ThenInclude(p => p.Dostavljac)
                .FirstOrDefaultAsync();

                var korisnik = await Context.Korisnici
                .Where(p => p.ID == idKorisnika)
                .FirstOrDefaultAsync();

                var dostavljac = await Context.Dostavljaci
                .Where(p=>p.ID == idDostavljaca)
                .FirstOrDefaultAsync();
                
                if (proizvod == null || korisnik == null)
                {
                    return BadRequest("Nije pronadjen proizvod ili korinik");
                }
                else
                {
                    
                    var kupovina = new Kupovina();
                    kupovina.Proizvod = proizvod;
                    kupovina.Korisnik = korisnik;
                    kupovina.Dostavljac = dostavljac;
                    kupovina.KolicinaProizvoda = suma;
                    kupovina.show = 1;
                    Context.Kupovine.Add(kupovina);
                    await Context.SaveChangesAsync();
                    return Ok(kupovina);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiKupovineZaDostavljaca/{idDostavljaca}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzmitiKupovineZaDostavljaca(int idDostavljaca)
        {
            try
            {
                var kupovine = await Context.Kupovine.Include(p => p.Dostavljac)
                    .Where(p=>p.Dostavljac.ID==idDostavljaca)
                    .Select(p=>new{
                        id = p.ID,
                        ime = p.Korisnik.Ime,
                        prezime = p.Korisnik.Prezime,
                        adresaKorisnika = p.Korisnik.Adresa,
                        proizvodNaziv = p.Proizvod.Naziv,
                        kolicinaProizvoda = p.KolicinaProizvoda,
                        domacinstvoNaziv = p.Proizvod.Domacinstvo.Naziv,
                        domacinstvoAdresa = p.Proizvod.Domacinstvo.Adresa
                    })
                    .ToListAsync();
                // var kupovine = Context.Dostavljaci.Include(p=>p.Korpa).Where(p=>p.Dostavljac.ID==idDostavljaca).ToListAsync();

                if(kupovine == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                return Ok(kupovine);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiKupovineZaKorisnika/{idKorisnika}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzmitiKupovineZaKorisnika(int idKorisnika)
        {
            try
            {
                var kupovine = await Context.Kupovine.Include(p => p.Korisnik)
                    .Where(p=>p.Korisnik.ID==idKorisnika)
                    .Select(p=>new{
                        p.ID,
                        proizvodID = p.Proizvod.ID,
                        proizvodNaziv = p.Proizvod.Naziv,
                        proizvodKolicina = p.Proizvod.Kolicina,
                        proizvodCena = p.Proizvod.Cena,
                        proizvodOpisa = p.Proizvod.Opis,
                        kolicinaProizvoda = p.KolicinaProizvoda,
                        show = p.show,
                        domacinstvoNaziv = p.Proizvod.Domacinstvo.Naziv,
                        domacinstvoAdresa = p.Proizvod.Domacinstvo.Adresa
                    })
                    .ToListAsync();

                if(kupovine == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                return Ok(kupovine);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }  

    }
}
