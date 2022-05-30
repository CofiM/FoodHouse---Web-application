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
    public class RecenzijaController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public RecenzijaController(ProjekatContext context)
        {
            Context=context;
        }

        [Route("GetRecenzije/{idP}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> GetRecenzije(int idP)
        {
            try
            {
                var recenzije = await Context.Recenzije.Include(p => p.Proizvod)
                .Where(p => p.Proizvod.ID == idP).Select(p => new{
                            p.Ocena,
                            p.Komentar,
                            p.Proizvod.ID
                            }).ToArrayAsync();
                return Ok(recenzije);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("GetComment/{idP}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> GetComment(int idP)
        {
            try
            {
                var recenzije = await Context.Recenzije.Include(p => p.Proizvod)
                .Where(p => p.Proizvod.ID == idP).Select(p => new{
                            p.Komentar,
                            }).ToArrayAsync();
                return Ok(recenzije);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodatiRecenziju/{ocena}/{komentar}/{idProizvoda}")]
        [EnableCors("CORS")]
        [HttpPost]
        public async Task<ActionResult> dodajRecenziju(int ocena, string komentar, int idProizvoda)
        {
            if(ocena < 1 || ocena > 5)
            {
                return BadRequest("Nevalidan unos za ocenu!");
            }
            if(string.IsNullOrWhiteSpace(komentar) || komentar.Length > 100)
            {
                return BadRequest("Nevalidan unos za komentar!");
            }
            try
            {
                var proizvod = await Context.Proizvodi.Where(p => p.ID == idProizvoda).FirstOrDefaultAsync();
                if(proizvod == null)
                {
                    throw new Exception("Ne postoji proizvod za koji hocemo da postavimo recenziju!");
                }
                Recenzija rec = new Recenzija();
                rec.Ocena = ocena;
                rec.Komentar = komentar;
                rec.Proizvod = proizvod;
                Context.Recenzije.Add(rec);
                await Context.SaveChangesAsync();
                return Ok("Dodata recenzija!");
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
        
            
    }
}
