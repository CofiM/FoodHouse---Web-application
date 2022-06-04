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
    public class PosaoController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public PosaoController(ProjekatContext context)
        {
            Context=context;
        }
        [Route("PreuzetiPosloveZaDomacinstvo/{idDomacinstva}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPosloveZaDomacinstva(int idDomacinstva)
        {
            try
            {
                var domacinstvo = await Context.Domacinstva.FindAsync(idDomacinstva);
                if(domacinstvo == null)
                {
                    throw new Exception("Ne postoji domacinstvo!");
                }

                var poslovi = await Context.Poslovi
                            .Include(p => p.Domacinstvo).Where(p => p.Domacinstvo.ID == idDomacinstva)
                            .Select(p => new {
                                p.brojRadnihMesta,
                                p.Datum,
                                p.Opis,
                                p.Cena,
                                p.Domacinstvo.Naziv,
                                p.Domacinstvo.Adresa
                            }).ToArrayAsync();
                if(poslovi == null)
                {
                    throw new Exception($"Nema aktuelnih poslova za domacinstvo {domacinstvo.Naziv}");
                }
                return Ok(poslovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiPoslove")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPoslove()
        {
            try
            {

                var poslovi = await Context.Poslovi
                            .Include(p => p.Domacinstvo)
                            .Select(p => new {
                                p.ID,
                                p.brojRadnihMesta,
                                p.Datum,
                                p.Opis,
                                p.Cena,
                                p.Domacinstvo.Naziv,
                                p.Domacinstvo.Adresa,
                                idDomacinstva = p.Domacinstvo.ID
                            }).ToArrayAsync();
                if(poslovi == null)
                {
                    throw new Exception("Nema aktuelnih poslova");
                }
                return Ok(poslovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("PreuzetiPoslovePoAdresi/{adresa}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> preuzmiPoslovePoAdresi(string adresa)
        {
            try
            {
                var poslovi = await Context.Poslovi
                            .Include(p => p.Domacinstvo).Where(p => p.Domacinstvo.Adresa == adresa)
                            .Select(p => new {
                                p.brojRadnihMesta,
                                p.Datum,
                                p.Opis,
                                p.Cena,
                                p.Domacinstvo.Naziv,
                                p.Domacinstvo.Adresa
                            }).ToArrayAsync();
                if(poslovi == null)
                {
                    throw new Exception("Nema aktuelnih poslova za domacinstvo");
                }
                return Ok(poslovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("PreuzetiPosloveZaDatum/{datum}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzetiPosloveZaDatum(DateTime datum)
        {
            try
            {
                var poslovi = await Context.Poslovi
                            .Include(p => p.Domacinstvo).Where(p =>p.Datum <= datum)
                            .Select(p => new {
                                p.brojRadnihMesta,
                                p.Datum,
                                p.Opis,
                                p.Cena,
                                p.Domacinstvo.Naziv,
                                p.Domacinstvo.Adresa
                            }).ToArrayAsync();
                if(poslovi == null)
                {
                    throw new Exception("Nema aktuelnih poslova za domacinstvo");
                }
                return Ok(poslovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         [Route("PreuzmiPoslove/{adresa}/{datum}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzetiPosloveZaDatum(string adresa,DateTime datum)
        {
            try
            {
                var poslovi = await Context.Poslovi
                            .Include(p => p.Domacinstvo).Where(p =>p.Datum <= datum && p.Domacinstvo.Adresa == adresa)
                            .Select(p => new {
                                p.brojRadnihMesta,
                                p.Datum,
                                p.Opis,
                                p.Cena,
                                p.Domacinstvo.Naziv,
                                p.Domacinstvo.Adresa
                            }).ToArrayAsync();
                if(poslovi == null)
                {
                    throw new Exception("Nema aktuelnih poslova za domacinstvo");
                }
                return Ok(poslovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }




                
    }
}
