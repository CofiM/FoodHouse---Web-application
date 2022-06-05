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
    public class PorukeController : ControllerBase
    {

        public ProjekatContext Context { get; set; }
        public PorukeController(ProjekatContext context)
        {
            Context = context;
        }

        [Route("PreuzmiPorukeDomacinstvo/{idD}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPorukeDomacinstvo(int idD)
        {
            try
            {
                var poruke = await Context.Poruke
                                .Include(p => p.Domacinstvo).Where(p => p.Domacinstvo.ID == idD)
                                .Include(p => p.Dostavljac).Include(p => p.Korisnik)
                                .Select(p => new{
                                    p.ID,
                                    p.sadrzaj,
                                    p.Domacinstvo.Naziv,
                                    p.Dostavljac.Ime,
                                    p.Dostavljac.Prezime,
                                    imeKorisnik = p.Korisnik.Ime,
                                    prezimeKorisnika = p.Korisnik.Prezime,
                                    emailKorisnik = p.Korisnik.email,
                                    emailDostavljac = p.Dostavljac.email,
                                    p.Dostavljac,
                                    p.Tip,
                                    p.Flag
                                }).ToArrayAsync();
                return Ok(poruke);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiPorukeDostavljac/{idD}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPorukeDostavljac(int idD)
        {
            try
            {
                var poruke = await Context.Poruke
                                .Include(p => p.Dostavljac).Where(p => p.Dostavljac.ID == idD)
                                .Include(p => p.Dostavljac).Include(p => p.Korisnik)
                                .Select(p => new{
                                    p.ID,
                                    p.sadrzaj,
                                    p.Domacinstvo.Naziv,
                                    p.Dostavljac.Ime,
                                    p.Dostavljac.Prezime,
                                    imeKorisnik = p.Korisnik.Ime,
                                    prezimeKorisnika = p.Korisnik.Prezime,
                                    emailKorisnik = p.Korisnik.email,
                                    emailDostavljac = p.Dostavljac.email,
                                    p.Dostavljac,
                                    p.Tip,
                                    p.Flag
                                }).ToArrayAsync();
                return Ok(poruke);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiPoruke/{clientID}/{type}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPoruke(int clientID, char type)
        {
            try
            {
                
                if( type == 'P' )
                {
                    var poruke = await Context.Poruke
                                .Include(p => p.Domacinstvo).Where(p => p.Domacinstvo.ID == clientID)
                                .Include(p => p.Dostavljac)
                                .Include(p => p.Korisnik)
                                .Select(p => new{
                                    p.ID,
                                    p.sadrzaj,
                                    p.Domacinstvo.Naziv,
                                    p.Dostavljac.Ime,
                                    p.Dostavljac.Prezime,
                                    imeKorisnik = p.Korisnik.Ime,
                                    prezimeKorisnika = p.Korisnik.Prezime,
                                    emailKorisnik = p.Korisnik.email,
                                    emailDostavljac = p.Dostavljac.email,
                                    emailDomacinstvo = p.Domacinstvo.email,
                                    p.Dostavljac,
                                    p.Tip,
                                    p.Flag
                                }).ToArrayAsync();
                                return Ok(poruke);
                }
                if( type == 'D' )
                {
                    var poruke = await Context.Poruke
                                .Include(p => p.Dostavljac).Where(p => p.Dostavljac.ID == clientID)
                                .Include(p => p.Domacinstvo).Include(p => p.Korisnik)
                                .Select(p => new{
                                    p.ID,
                                    p.sadrzaj,
                                    p.Domacinstvo.Naziv,
                                    p.Dostavljac.Ime,
                                    p.Dostavljac.Prezime,
                                    imeKorisnik = p.Korisnik.Ime,
                                    prezimeKorisnika = p.Korisnik.Prezime,
                                    emailKorisnik = p.Korisnik.email,
                                    emailDostavljac = p.Dostavljac.email,
                                    emailDomacinstvo = p.Domacinstvo.email,
                                    p.Dostavljac,
                                    p.Tip,
                                    p.Flag
                                }).ToArrayAsync();
                                return Ok(poruke);
                }
                if( type == 'K' )
                {
                    var poruke = await Context.Poruke
                                .Include(p => p.Korisnik).Where(p => p.Korisnik.ID == clientID)
                                .Include(p => p.Domacinstvo).Include(p => p.Dostavljac)
                                .Select(p => new{
                                    p.ID,
                                    p.sadrzaj,
                                    p.Domacinstvo.Naziv,
                                    p.Dostavljac.Ime,
                                    p.Dostavljac.Prezime,
                                    imeKorisnik = p.Korisnik.Ime,
                                    prezimeKorisnika = p.Korisnik.Prezime,
                                    emailKorisnik = p.Korisnik.email,
                                    emailDostavljac = p.Dostavljac.email,
                                    emailDomacinstvo = p.Domacinstvo.email,
                                    p.Dostavljac,
                                    p.Tip,
                                    p.Flag
                                }).ToArrayAsync();
                                return Ok(poruke);
                }
                return BadRequest("Nije dodato!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}