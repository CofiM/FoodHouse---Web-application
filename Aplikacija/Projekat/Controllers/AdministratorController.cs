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
    public class AdministratorController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public AdministratorController(ProjekatContext context)
        {
            Context=context;
        }

        [Route("PreuzmiAdministratora")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiAdministratora()
        {
            try
            {
                var administrator = await Context.Administrator.Select(p => new{
                            p.email,
                            p.Password,
                            p.telefon
                            }).FirstOrDefaultAsync();
                return Ok(administrator);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAccount/{email}/{password}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> GetAccount(string email, string password)
        {
            if (String.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            if (String.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Morate da unesete sifru!");
            }
            try
            {
                var retAcc1 = await Context.Domacinstva
                .Where(p => p.email == email && p.Password == password)
                .Select(p => new
                {
                    p.ID,
                    p.Naziv,
                    p.Username,
                    p.email,
                    p.Tip,
                    p.Poslovi,
                    p.Proizvodi
                }).FirstOrDefaultAsync();
                if (retAcc1 == null)
                {
                    var retAcc2 = await Context.Dostavljaci.Where(p => p.email == email && p.Password == password).Select(p => new{
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
                    if(retAcc2 == null){
                        var retAcc3 = await Context.Korisnici.Where(p => p.email == email && p.Password == password).Select(p => new{
                            p.ID,
                            p.Ime,
                            p.Prezime,
                            p.Username,
                            p.Password,
                            p.email,
                            p.Tip
                        }).FirstOrDefaultAsync();
                        if(retAcc3 == null){
                            return BadRequest("Nepostojeci acc!");
                        }
                        return Ok(retAcc3);
                    }
                    return Ok(retAcc2);
                } 
                return Ok(retAcc1);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodatiKorisnika/{ime}/{prezime}/{username}/{password}/{email}/{tip}/{adresa}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajKorisnik(string ime, string prezime, string username, 
                                        string password, string email, char tip, string adresa)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length > 30)
            {
                return BadRequest("Nevalidan unos za ime!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length > 30)
            {
                return BadRequest("Nevalidan unos za prezime!");
            }
            if(string.IsNullOrWhiteSpace(username) || username.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if(string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos za password!");
            }
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            if( string.IsNullOrWhiteSpace(adresa) || adresa.Length > 100 )
            {
                return BadRequest("Nevalidan unos za adresu!");
            }
            try
            {
                if(!CheckEmail(email))
                {
                    throw new Exception("Niste lepo uneli e-mail!");
                }
                var korisnik = await Context.Korisnici.Where(p => p.email == email && p.Username == username).FirstOrDefaultAsync();
                if(korisnik != null)
                {
                    throw new Exception("Postoji vec korisnik sa ovim mejlom!");
                }
                Korisnik k = new Korisnik();
                k.Ime = ime;
                k.Prezime = prezime;
                k.Username = username;
                k.Password = password;
                k.email = email;
                k.Tip = tip;
                k.Adresa = adresa;
                Context.Korisnici.Add(k);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat korisnik!");
            }
            catch(Exception e)
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


        [Route("DodatiProizvodjaca/{naziv}/{username}/{password}/{email}/{telefon}/{adresa}/{datum}/{tip}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajProizvodjaca(string naziv, string username, string password, 
                        string email, string telefon, string adresa, DateTime datum, char tip )
        {
            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Nevalidan unos za naziv!");
            }
            if(string.IsNullOrWhiteSpace(username) || username.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if(string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos za password!");
            }
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            if(string.IsNullOrWhiteSpace(telefon))
            {
                return BadRequest("Nevalidan unos za telefon!");
            }
            if(string.IsNullOrWhiteSpace(adresa) || adresa.Length > 100)
            {
                return BadRequest("Nevalidan unos za adresu!");
            }
            if(tip == null){
                return BadRequest("Nevalidan unos za tip!");
            }
            try
            {
                if(!CheckEmail(email))
                {
                    throw new Exception("Niste lepo uneli e-mail!");
                }
                var proizvodjac = await Context.Domacinstva.Where(p => p.email == email && p.Username == username).FirstOrDefaultAsync(); 
                if(proizvodjac != null)
                {
                    throw new Exception("Postoji proizvodjac!");
                }
                Domacinstvo d = new Domacinstvo();
                d.Naziv = naziv;
                d.Username = username;
                d.Password = password;
                d.email = email;
                d.telefon = telefon;
                d.Adresa = adresa;
                d.otvorenaVrata = datum;
                d.Tip = tip;
                Context.Domacinstva.Add(d);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodato domacinstvo!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        [Route("PosaljiPorukuDomacinDostavljac/{idDomacin}/{idDostavljac}/{por}/{tip}/{flag}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> posaljiPorukuDomacinDostavljac(int idDomacin, int idDostavljac, string por, char tip, bool flag)
        {
            if(idDomacin < 0 || idDostavljac < 0)
            {
                return BadRequest("Nevalidan unos id-ja!");
            }
            if(string.IsNullOrWhiteSpace(por) || por.Length > 500)
            {
                return BadRequest("Nevalidan unos za poruka!");
            }
            try
            {
                var proizvodjac = await Context.Domacinstva.Where(p => p.ID == idDomacin).FirstOrDefaultAsync(); 
                if(proizvodjac == null)
                {
                    throw new Exception("Ne postoji proizvodjac!");
                }
                var dostavljac = await Context.Dostavljaci.Where(p => p.ID == idDostavljac).FirstOrDefaultAsync(); 
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji dostavljac!");
                }
                Poruka poruka = new Poruka();
                poruka.sadrzaj = por;
                poruka.Domacinstvo = proizvodjac;
                poruka.Dostavljac = dostavljac;
                poruka.Korisnik = null;
                poruka.Tip = tip;
                poruka.Flag = flag;
                Context.Poruke.Add(poruka);
                await Context.SaveChangesAsync();
                proizvodjac.inbox.Add(poruka);
                dostavljac.inbox.Add(poruka);
                return Ok("Uspesno poslata poruka!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        [Route("PosaljiPoruku/{idDomacin}/{receiverEmail}/{message}/{senderType}/{flag}/{receiverType}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> posaljiPoruku(int idDomacin, string receiverEmail, string message, char senderType, bool flag, char receiverType)
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
                var proizvodjac = await Context.Domacinstva.Where(p => p.ID == idDomacin).FirstOrDefaultAsync(); 
                if(proizvodjac == null)
                {
                    throw new Exception("Ne postoji proizvodjac!");
                }

                if( receiverType == 'K'){
                    
                    var korisnik = await Context.Korisnici.Where(p => p.email == receiverEmail).FirstOrDefaultAsync();
                    if(korisnik == null)
                    {
                        throw new Exception("Ne postoji korisnik sa tim mejlom!");
                    }

                    
                    poruka.sadrzaj = message;
                    poruka.Domacinstvo = proizvodjac;
                    poruka.Korisnik = korisnik;
                    poruka.Dostavljac = null;
                    poruka.Tip = senderType;
                    poruka.Flag = flag;
                    Context.Poruke.Add(poruka);
                    await Context.SaveChangesAsync();
                    proizvodjac.inbox.Add(poruka);
                    korisnik.inbox.Add(poruka);
                    return Ok("Uspesno poslata poruka!");
                }
               
                var dostavljac = await Context.Dostavljaci.Where(p => p.email == receiverEmail).FirstOrDefaultAsync(); 
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji dostavljac!");
                }
                
                poruka.sadrzaj = message;
                poruka.Domacinstvo = proizvodjac;
                poruka.Dostavljac = dostavljac;
                poruka.Korisnik = null;
                poruka.Tip = senderType;
                poruka.Flag = flag;
                Context.Poruke.Add(poruka);
                await Context.SaveChangesAsync();
                proizvodjac.inbox.Add(poruka);
                dostavljac.inbox.Add(poruka);
                return Ok("Uspesno poslata poruka!");
            }
            catch( Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiPoruku/{ClientID}/{MessageID}/{type}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisiPoruku(int ClientID, int MessageID, char type)
        {
            try
            {
                if(type == 'P')
                {
                    var domacinstvo = await Context.Domacinstva.FindAsync(ClientID);
                    if( domacinstvo ==  null)
                    {
                        throw new Exception("Ne postoji domacinstvo!");
                    }
                    var poruka = await Context.Poruke.FindAsync(MessageID);
                    if(poruka == null){
                        return BadRequest("Ne postoji poruka!");
                    }
                    domacinstvo.inbox.Remove(poruka);
                    poruka.Domacinstvo = null;
                    await Context.SaveChangesAsync();
                    if(poruka.Korisnik == null && poruka.Dostavljac == null){
                        Context.Poruke.Remove(poruka);
                    }
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno obrisana poruka!");
                }
                if( type == 'D')
                {
                    var dostavljac = await Context.Dostavljaci.FindAsync(ClientID);
                    if(dostavljac == null)
                    {
                        throw new Exception("Ne postoji dostavljac!");
                    }
                    var poruka = await Context.Poruke.FindAsync(MessageID);
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
                if( type == 'K')
                {
                    var korisnik = await Context.Korisnici.FindAsync(ClientID);
                    if(korisnik == null)
                    {
                        throw new Exception("Ne postoji korisnik!");
                    }
                    var poruka = await Context.Poruke.FindAsync(MessageID);
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
                return Ok("");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PosaljiPorukuDomacinKorisnik/{idDomacin}/{idKorisnik}/{por}/{tip}/{flag}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> posaljiPorukuDomacinKorisnik(int idDomacin, int idKorisnik, string por, char tip, bool flag)
        {
            if(idDomacin < 0 || idKorisnik < 0)
            {
                return BadRequest("Nevalidan unos id-ja!");
            }
            if(string.IsNullOrWhiteSpace(por) || por.Length > 500)
            {
                return BadRequest("Nevalidan unos za poruka!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == idKorisnik).FirstOrDefaultAsync(); 
                if(korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                var proizvodjac = await Context.Domacinstva.Where(p => p.ID == idDomacin).FirstOrDefaultAsync(); 
                if(proizvodjac == null)
                {
                    throw new Exception("Ne postoji proizvodjac!");
                }
                Poruka poruka = new Poruka();
                poruka.sadrzaj = por;
                poruka.Domacinstvo = proizvodjac;
                poruka.Korisnik = korisnik;
                poruka.Dostavljac = null;
                poruka.Tip = tip;
                poruka.Flag = flag;
                Context.Poruke.Add(poruka);
                await Context.SaveChangesAsync();
                proizvodjac.inbox.Add(poruka);
                korisnik.inbox.Add(poruka);
                return Ok("Uspesno poslata poruka!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        [Route("DodatiDostavljac/{ime}/{prezime}/{username}/{password}/{email}/{telefon}/{cena}/{tip}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajDostavljaca(string ime, string prezime, string username, string password, string email, 
                                    string telefon, int cena, char tip)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length > 30)
            {
                return BadRequest("Nevalidan unos za ime!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length > 30)
            {
                return BadRequest("Nevalidan unos za prezime!");
            }
            if(string.IsNullOrWhiteSpace(username) || username.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if(string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos za password!");
            }
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            if(string.IsNullOrWhiteSpace(telefon))
            {
                return BadRequest("Nevalidan unos za telefon!");
            }
            if(cena == 0)
            {
                return BadRequest("Cena ne moze da bude 0");
            }
            try
            {
                if(!CheckEmail(email))
                {
                    throw new Exception("Niste lepo uneli e-mail!");
                }
                var dostavljac = await Context.Dostavljaci.Where(p => p.email == email && p.Username == username).FirstOrDefaultAsync(); 
                if(dostavljac != null) 
                {
                    throw new Exception("Postoji dostavljac!");
                }
                Dostavljac dos = new Dostavljac();
                dos.Ime = ime;
                dos.Prezime = prezime;
                dos.Username = username;
                dos.Password = password;
                dos.email = email;
                dos.telefon = telefon;
                dos.Cena = cena;
                dos.Tip = tip;
                Context.Dostavljaci.Add(dos);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat dostavljac!");
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("ObrisatiKorisnika/{email}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisiKorisnika(string email)
        {
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.email==email).FirstOrDefaultAsync();
                if(korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                var username = korisnik.Username;
                Context.Korisnici.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno smo uklonili korisnika {username}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiProizvodjaca/{email}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisiProizvodjaca(string email)
        {
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            try
            {
                var proizvodjac = await Context.Domacinstva.Where(p => p.email==email).FirstOrDefaultAsync();
                if(proizvodjac == null)
                {
                    throw new Exception("Ne postoji proizvodjac!");
                }
                var naziv = proizvodjac.Naziv;
                Context.Domacinstva.Remove(proizvodjac);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno smo uklonili domacinstvo {naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }  

        [Route("ObrisatiDostavljaca/{email}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisiDostavljaca(string email)
        {
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos za email!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.email==email).FirstOrDefaultAsync();
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji proizvodjac!");
                }
                var username = dostavljac.Username;
                Context.Dostavljaci.Remove(dostavljac);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno smo uklonili dostavljaca {username}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }             
    }
}
