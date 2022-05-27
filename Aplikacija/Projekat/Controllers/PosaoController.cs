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

    


        [Route("PreuzetiPosloveZaDomacinstvo/{idDoma}")]
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

                
    }
}
