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
    public class DosavljacController : ControllerBase
    {

        public ProjekatContext Context { get; set; }
        public DosavljacController(ProjekatContext context)
        {
            Context = context;
        }

         [Route("PreuzmiDostavljac/{email}/{password}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiDostavljac(string email, string password)
        {
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.email == email && p.Password == password).Select(p => new{
                            p.ID,
                            p.Username,
                            p.Password,
                            p.email,
                            p.Cena,
                            p.telefon,
                            p.Ime,
                            p.Prezime,
                            p.Tip
                            }).FirstOrDefaultAsync();
                return Ok(dostavljac);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiDostavljac/{idD}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiDostavljac(int idD)
        {
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.ID == idD).Select(p => new{
                            p.ID,
                            p.Username,
                            p.Password,
                            p.email,
                            p.Cena,
                            p.telefon,
                            p.Ime,
                            p.Prezime,
                            p.Tip
                            }).FirstOrDefaultAsync();
                return Ok(dostavljac);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PostaviDostavljaca/{idD}/{id}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> postaviDostavljaca(int idD, int id)
        {
            if (idD < 0)
            {
                return BadRequest("Nevalidna vrednost za idD");
            }
            if (id < 0)
            {
                return BadRequest("Nevalidna vrednost za ID!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.ID == idD)
                .FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var dostavljac = await Context.Dostavljaci
                    .Where(p => p.ID == id)
                    .FirstOrDefaultAsync();
                    if (dostavljac != null)
                    {
                        domacinstvo.Dostavljac = dostavljac;
                        await Context.SaveChangesAsync();
                        dostavljac.Domacinstva.Add(domacinstvo);
                        return Ok("Uspesno dodat dostavljac!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen dostavljac!");
                    }
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiPoruku/{idDostavljac}/{idPoruke}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisatiPoruku(int idDostavljac, int idPoruke)
        {
            if(idDostavljac < 0 || idPoruke < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.ID == idDostavljac).FirstOrDefaultAsync();
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji dostavljac!");
                }
                var poruka = await Context.Poruke.Include(p => p.Domacinstvo).Where(p => p.ID == idPoruke).FirstOrDefaultAsync();
                if(poruka == null){
                    return BadRequest("Ne postoji poruka!");
                }
                dostavljac.inbox.Remove(poruka);
                poruka.Dostavljac = null;
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

        [Route("VratiPorukeDostavljaca/{id}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> vratiPorukeDostavljaca(int id)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.ID == id).FirstOrDefaultAsync();
                if (dostavljac == null)
                {
                    return BadRequest("Nepostoje dostavljac sa zadatim id!");
                }
                var poruke = await Context.Poruke
                            .Include(p => p.Dostavljac).Where(p => p.Dostavljac.ID == id)
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

        [Route("PromeniSifruDostavljaca/{email}/{pass}/{newPass}/{ime}/{prezime}/{username}/{cena}/{telefon}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> promeniSifruDostavljaca(string email, string pass, string newPass, 
                string ime, string prezime, string username, int cena, string telefon)
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
            if( cena < 0 )
            {
                return BadRequest("Nevalidan unos za cenu!");
            }
            if( string.IsNullOrWhiteSpace(telefon) )
            {
                return BadRequest("Nevalidan unos za ime!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci
                .Where(p => p.email == email )
                .FirstOrDefaultAsync();
                if (dostavljac == null)
                {
                    return BadRequest("Ne postoji domacinstvo!");
                }
                if( pass == newPass )
                {
                    dostavljac.Password = newPass;
                    dostavljac.Ime = ime;
                    dostavljac.Prezime = prezime;
                    dostavljac.Username = username;
                    dostavljac.Cena = cena;
                    dostavljac.telefon = telefon;
                    Context.Dostavljaci.Update(dostavljac);
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

        [Route("PreuzmiDostavljace")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiDostavljace()
        {
            try{
                var dostavljaci = await Context.Dostavljaci.Select( p => new {
                    p.ID,
                    p.Ime,
                    p.Prezime,
                    p.Username,
                    p.email,
                    p.Cena,
                    p.telefon,
                    p.Tip
                }).ToListAsync();
                return Ok(dostavljaci);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("PosaljiPoruku/{id}/{receiverEmail}/{message}/{senderType}/{flag}/{receiverType}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> posaljiPoruku(int id, string receiverEmail, string message, char senderType, bool flag, char receiverType)
        {
            if(!CheckEmail(receiverEmail))
            {
                return BadRequest("Nevalidan unos!");
            }
            if(string.IsNullOrWhiteSpace(message) || message.Length > 500)
            {
                return BadRequest("Nevalidan unos za poruku!");
            }
            try
            {
                Poruka poruka = new Poruka();
                var dostavljac = await Context.Dostavljaci.Where(p => p.ID == id).FirstOrDefaultAsync(); 
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji dostavljac!");
                }

                if( receiverType == 'P'){
                    
                    var proizvodjac = await Context.Domacinstva.Where(p => p.email == receiverEmail).FirstOrDefaultAsync();
                    if(proizvodjac == null)
                    {
                        throw new Exception("Ne postoji domacinstvo sa tim mejlom!");
                    }

                    
                    poruka.sadrzaj = message;
                    poruka.Domacinstvo = proizvodjac;
                    poruka.Korisnik = null;
                    poruka.Dostavljac = dostavljac;
                    poruka.Tip = senderType;
                    poruka.Flag = flag;
                    Context.Poruke.Add(poruka);
                    await Context.SaveChangesAsync();
                    proizvodjac.inbox.Add(poruka);
                    dostavljac.inbox.Add(poruka);
                    return Ok("Uspesno poslata poruka!");
                }
               
                
                return BadRequest("Greska!");
            }
            catch( Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}