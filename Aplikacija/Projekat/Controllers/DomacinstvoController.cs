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
    public class DomacinstvoController : ControllerBase
    {

        public ProjekatContext Context { get; set; }
        public DomacinstvoController(ProjekatContext context)
        {
            Context = context;
        }

        [Route("PreuzmiDomacinstvo/{email}/{pass}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiDomacinstvo(String email, String pass)
        {
            if (String.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            if (String.IsNullOrWhiteSpace(pass))
            {
                return BadRequest("Morate da unesete sifru!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.email == email && p.Password == pass)
                .Select(p => new
                {
                    p.Naziv,
                    p.Username,
                    p.email,
                    p.Tip,
                    p.Poslovi,
                    p.Proizvodi
                }).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    return Ok(domacinstvo);
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

        [Route("PreuzmiDomacinstvo/{id}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiDomacinstvo(int id)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.ID == id)
                .Include(p => p.Proizvodi)
                .ThenInclude(p => p.Recenzije)
                .Select(p => new
                {
                    p.Naziv,
                    p.Username,
                    p.email,
                    p.Tip,
                    p.telefon,
                    p.Adresa,
                    p.otvorenaVrata,
                    p.Poslovi,
                    p.Proizvodi
                }).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    return Ok(domacinstvo);
                }
                else
                {
                    return BadRequest("Nema domacinstva sa zadatim ID-jem!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [Route("PreuzmiSvaDomacinstvo")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiSvaDomacinstvo()
        {
            try
            {
                var domacinstva = await Context.Domacinstva
                .Include(p => p.Dostavljac)
                .Select(p => new
                {
                    p.ID,
                    p.Naziv,
                    p.Username,
                    p.email,
                    p.telefon,
                    p.Adresa,
                    p.otvorenaVrata,
                    p.Tip,
                    p.Poslovi,
                    p.Proizvodi,
                }).ToListAsync();
                return Ok(domacinstva);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiPorukeDomacinstva/{id}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> vratiPorukeDomacinstva(int id)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.ID == id)
                .Select(p=> new {p.inbox}).FirstOrDefaultAsync();
                if (domacinstvo == null)
                {
                    return BadRequest("Nepostoje domacinstvo sa zadatim id!");
                }

                // var poruke = await Context.Poruke
                //             .Include(p => p.Domacinstvo).Include(p => p.Dostavljac).Include(p => p.Korisnik).Where(p => p.Domacinstvo.ID == id)
                //             .Select(p => new {
                //                 p.ID,
                //                 p.sadrzaj,
                //                 p.Domacinstvo,
                //                 p.Dostavljac,
                //                 p.Korisnik
                //             }).ToArrayAsync();
                return Ok(domacinstvo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiPoruku/{idDomacinstva}/{idPoruke}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisatiPoruku(int idDomacinstva, int idPoruke)
        {
            if(idDomacinstva < 0 || idPoruke < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.ID == idDomacinstva).FirstOrDefaultAsync();
                if(domacinstvo == null)
                {
                    throw new Exception("Ne postoji domacinstvo!");
                }
                var poruka = await Context.Poruke.Include(p => p.Domacinstvo).Include(p => p.Korisnik).Include(p => p.Dostavljac).Where(p => p.ID == idPoruke).FirstOrDefaultAsync();
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
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromeniSifruDomacinstva/{email}/{pass}/{newPass}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> promeniSifruDomacinstva(String email, String pass, String newPass)
        {
            if (String.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.email == email && p.Password == pass)
                .FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    domacinstvo.Password = newPass;
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

        [Route("PostaviDanOtvorenihVrata/{usernameD}/{novDatum}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> postaviDanOtvorenihVrata(String usernameD, DateTime novDatum)
        {
            if (String.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidna vrednost za username");
            }
            if (DateTime.Compare(DateTime.Now, novDatum) < 0)
            {
                return BadRequest("Datum ne moze da bude u proslosti!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.Username == usernameD)
                .FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    domacinstvo.otvorenaVrata = novDatum;
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno postavljen dan otvorenih vrata!");
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




        [Route("DodatiPosao/{idD}/{brRadnihMesta}/{datumPocetka}/{opis}/{cena}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajPosao(int idD, int brRadnihMesta, DateTime datumPocetka,
                                    string opis, int cena)
        {
            if (idD < 0)
            {
                return BadRequest("Nevalidan unos za id!");
            }
            if (brRadnihMesta < 0 || brRadnihMesta > 200)
            {
                return BadRequest("Nevalidna vrednost za broj radnih mesta!");
            }
            if (string.IsNullOrWhiteSpace(opis))
            {
                return BadRequest("Nevalidan unos za opis!");
            }
            if (cena == 0 || cena < 0)
            {
                return BadRequest("Nevalidna vrednost za cenu!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.ID == idD).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var posao = new Posao();
                    posao.Domacinstvo = domacinstvo;
                    posao.brojRadnihMesta = brRadnihMesta;
                    posao.Datum = datumPocetka;
                    posao.Opis = opis;
                    posao.Cena = cena;
                    Context.Poslovi.Add(posao);
                    await Context.SaveChangesAsync();
                    domacinstvo.Poslovi.Add(posao);
                    return Ok("Uspesno dodat posao " + posao.Opis);
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate posao!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzmeniPosao/{usernameD}/{id}/{brRadnihMesta}/{datumPocetka}/{opis}/{cena}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> izmeniPosao(string usernameD, int id, int brRadnihMesta, DateTime datumPocetka,
                                    String opis, int cena)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidna vrednost za ID!");
            }
            if (string.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if (brRadnihMesta < 0 || brRadnihMesta > 200)
            {
                return BadRequest("Nevalidna vrednost za broj radnih mesta!");
            }
            if (cena == 0 || cena < 0)
            {
                return BadRequest("Nevalidna vrednost za cenu!");
            }
            if (string.IsNullOrWhiteSpace(opis) || opis.Length > 500)
            {
                return BadRequest("Nevalidan unos za opis!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.Username == usernameD)
                .Include(p => p.Poslovi)
                .FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var posao = domacinstvo.Poslovi
                    .Where(p => p.ID == id)
                    .FirstOrDefault();
                    if (posao != null)
                    {
                        posao.brojRadnihMesta = brRadnihMesta;
                        posao.Datum = datumPocetka;
                        posao.Opis = opis;
                        posao.Cena = cena;
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izmenjen posao!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen posao!");
                    }
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate posao!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiPosao/{usernameD}/{id}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiPosao(string usernameD, int id)
        {
            if (string.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.Username == usernameD).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var posao = await Context.Poslovi
                    .Where(p => p.ID == id && p.Domacinstvo == domacinstvo)
                    .FirstOrDefaultAsync();
                    if (posao != null)
                    {
                        domacinstvo.Poslovi.Remove(posao);
                        Context.Poslovi.Remove(posao);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izbrisan posao!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen posao za to domacinstvo!");
                    }
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate posao!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodatiProizvod/{idD}/{naziv}/{kol}/{cena}/{opis}/{kat}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajProizvod(int idD, String naziv, int kol,
                                    int cena, String opis, String kat)
        {
            if (idD < 0)
            {
                return BadRequest("Nevalidan unos za id!");
            }
            if (kol < 0 || kol > 1000)
            {
                return BadRequest("Nevalidna vrednost za kolicinu!");
            }
            if (cena == 0 || cena < 0)
            {
                return BadRequest("Nevalidna vrednost za cenu!");
            }
            if (string.IsNullOrWhiteSpace(opis) || opis.Length > 500)
            {
                return BadRequest("Nevalidan unos za opis!");
            }
            if (string.IsNullOrWhiteSpace(kat) || kat.Length > 100)
            {
                return BadRequest("Nevalidan unos za kategoriju!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.ID == idD).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var proizvod = new Proizvod();
                    proizvod.Domacinstvo = domacinstvo;
                    proizvod.Naziv = naziv;
                    proizvod.Kolicina = kol;
                    proizvod.Cena = cena;
                    proizvod.Opis = opis;
                    proizvod.Kategorija = kat;
                    Context.Proizvodi.Add(proizvod);
                    await Context.SaveChangesAsync();
                    domacinstvo.Proizvodi.Add(proizvod);
                    return Ok("Uspesno dodat proizvod " + proizvod.Naziv);
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate proizvod!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzmeniProizvod/{usernameD}/{id}/{cena}/{opis}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> izmeniProizvod(string usernameD, int id, int cena, String opis)
        {
            if (id < 0)
            {
                return BadRequest("Nevalidna vrednost za ID!");
            }
            if (string.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if (cena == 0 || cena < 0)
            {
                return BadRequest("Nevalidna vrednost za cenu!");
            }
            if (string.IsNullOrWhiteSpace(opis) || opis.Length > 500)
            {
                return BadRequest("Nevalidan unos za opis!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.Username == usernameD)
                .Include(p => p.Proizvodi)
                .FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var proizvod = domacinstvo.Proizvodi
                    .Where(p => p.ID == id)
                    .FirstOrDefault();
                    if (proizvod != null)
                    {
                        proizvod.Cena = cena;
                        proizvod.Opis = opis;
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izmenjen proizvod!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen proizvod!");
                    }
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate proizvod!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiProizvod/{usernameD}/{id}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiProizvod(string usernameD, int id)
        {
            if (string.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidan unos za username!");
            }
            if (id < 0)
            {
                return BadRequest("Nevalidan id!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.Where(p => p.Username == usernameD).FirstOrDefaultAsync();
                if (domacinstvo != null)
                {
                    var proizvod = await Context.Proizvodi
                    .Where(p => p.ID == id && p.Domacinstvo == domacinstvo)
                    .FirstOrDefaultAsync();
                    if (proizvod != null)
                    {
                        domacinstvo.Proizvodi.Remove(proizvod);
                        Context.Proizvodi.Remove(proizvod);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izbrisan proizvod!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen proizvod u domacinstvu!");
                    }
                }
                else
                {
                    return BadRequest("Nije pronadjeno domacinstvo za koje zelite da dodate posao!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}