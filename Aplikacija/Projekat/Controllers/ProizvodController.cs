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
    public class ProizvodController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public ProizvodController(ProjekatContext context)
        {
            Context=context;
        }

        [Route("PreuzetiProizvodeZaDomacinstvo/{idDomacinstva}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiProizvodeZaDomacinstvo(int idDomacinstva)
        {
            try
            {
                var domacinstvo = await Context.Domacinstva.FindAsync(idDomacinstva);
                if(domacinstvo == null)
                {
                    throw new Exception("Ne postoji zadato domacinstvo!");
                }
                var proizvodi = await Context.Proizvodi
                                .Include(p => p.Domacinstvo).Include(p => p.Recenzije).Where(p => p.Domacinstvo.ID == idDomacinstva)
                                .Select(p => new{
                                    p.ID,
                                    p.Naziv,
                                    p.Kolicina,
                                    p.Cena,
                                    p.Opis,
                                    p.Kategorija,
                                    p.Recenzije
                                }).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Nije pronadjen!");
                }
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         [Route("IzmeniProizvod/{id}/{naziv}/{kolicina}/{cena}/{opis}/{kategorija}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> izmeniProizvod(int id, string naziv, int kolicina, int cena, string opis, string kategorija)
        {
            try
            {
                    var proizvod =  await Context.Proizvodi
                .Where(p => p.ID == id)
                .FirstOrDefaultAsync();
                    if (proizvod != null)
                    {
                        proizvod.Naziv = naziv;
                        proizvod.Kolicina = kolicina;
                        proizvod.Cena = cena;
                        proizvod.Opis = opis;
                        proizvod.Kategorija = kategorija;
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izmenjen proizvod!");
                    }
                    else
                    {
                        return BadRequest("Nije pronadjen proizvod!");
                    }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiProizvod/{id}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> obrisatiProizvod(int id)
        {
            if(id < 0)
            {
                return BadRequest("Nevalidan unos za id!");
            }
            try
            {
                var proizvod = await Context.Proizvodi.Where(p => p.ID==id).FirstOrDefaultAsync();
                if(proizvod == null)
                {
                    throw new Exception("Ne postoji proizvod!");
                }
                Context.Proizvodi.Remove(proizvod);
                await Context.SaveChangesAsync();
                return Ok("Izbrisan proizvod!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiProizvodeZaDomacinstvoZaKategoriju/{idDomacinstva}/{kategorija}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiProizvodeZaDomacinstvoZaKategoriju(int idDomacinstva, string kategorija)
        {
            if(string.IsNullOrWhiteSpace(kategorija) || kategorija.Length > 100)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva.FindAsync(idDomacinstva);
                if(domacinstvo == null)
                {
                    throw new Exception("Ne postoji zadato domacinstvo!");
                }
                var proizvodi = await Context.Proizvodi
                                .Include(p => p.Domacinstvo).Where(p => p.Domacinstvo.ID == idDomacinstva && p.Kategorija == kategorija)
                                .Select(p => new{
                                    p.ID,
                                    p.Naziv,
                                    p.Kolicina,
                                    p.Cena,
                                    p.Opis,
                                    p.Kategorija
                                }).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Nije pronadjen!");
                }
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("PreuzetiProizvodeZaKategoriju/{kategorija}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiProizvodeZaKategoriju(string kategorija)
        {
            if(string.IsNullOrWhiteSpace(kategorija) || kategorija.Length > 100)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var proizvodi = await Context.Proizvodi
                                .Include(p => p.Domacinstvo).Where(p => p.Kategorija == kategorija)
                                .Select(p => new{
                                    p.ID,
                                    p.Naziv,
                                    p.Kolicina,
                                    p.Cena,
                                    p.Opis,
                                    p.Kategorija,
                                    nazivDomacinstva = p.Domacinstvo.Naziv
                                }).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Nije pronadjen!");
                }
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiProizvodeNaziv/{naziv}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiProizvodeZaNaziv(string naziv)
        {
            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length > 100)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var proizvodi = await Context.Proizvodi
                                .Include(p => p.Domacinstvo).Where(p => p.Naziv == naziv)
                                .Select(p => new{
                                    p.ID,
                                    p.Naziv,
                                    p.Kolicina,
                                    p.Cena,
                                    p.Opis,
                                    p.Kategorija,
                                    nazivDomacinstva = p.Domacinstvo.Naziv
                                }).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Nije pronadjen!");
                }
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiProizvodeNazivKategorija/{naziv}/{kategorija}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzetiProizvodeNazivKategorija(string naziv, string kategorija)
        {
            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length > 100)
            {
                return BadRequest("Nevalidan unos!");
            }
            if(string.IsNullOrWhiteSpace(kategorija) || kategorija.Length > 100)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var proizvodi = await Context.Proizvodi
                                .Include(p => p.Domacinstvo).Where(p => p.Naziv == naziv && p.Kategorija == kategorija)
                                .Select(p => new{
                                    p.ID,
                                    p.Naziv,
                                    p.Kolicina,
                                    p.Cena,
                                    p.Opis,
                                    p.Kategorija,
                                    nazivDomacinstva = p.Domacinstvo.Naziv
                                }).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Nije pronadjen!");
                }
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiRecenzije/{idProizvoda}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiRecenzije(int idProizvoda)
        {
            try
            {
                var proizvod = await Context.Proizvodi.FindAsync(idProizvoda);
                if(proizvod == null)
                {
                    throw new Exception("Ne postoji trazeni proizvod!");
                }
                var recenzije = await Context.Proizvodi
                                .Include(p => p.Recenzije).Where(p => p.ID == idProizvoda)
                                .Select(p => new
                                {
                                    p.Recenzije
                                }).ToListAsync();
                if(recenzije == null)
                {
                    throw new Exception("Nema recenzije za taj proizvod!");
                }
                return Ok(recenzije);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }      
    }
}
