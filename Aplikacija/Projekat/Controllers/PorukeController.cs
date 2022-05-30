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
                var poruke = await Context.Poruke.Include(p => p.Domacinstvo).Include(p => p.Dostavljac).Include(p => p.Korisnik)
                .Where(p => p.Domacinstvo.ID == idD)
                .Select(p => new{
                    p.sadrzaj,
                    p.Domacinstvo,
                    p.Dostavljac,
                    p.Korisnik
                }).ToArrayAsync();
                return Ok(poruke);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}