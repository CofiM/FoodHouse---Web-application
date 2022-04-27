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
    public class DostavljacController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        public DostavljacController(ProjekatContext context)
        {
            Context=context;
        }

        [Route("PreuzetiDostavljaca/{email}/{password}")]
        [EnableCors("CORS")]
        [HttpDelete]
        public async Task<ActionResult> preuzmiDostavljaca(string email, string password)
        {   
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Nevalidan unos!");
            }
            if(string.IsNullOrWhiteSpace(password) || password.Length > 50)
            {
                return BadRequest("Nevalidan unos!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci.Where(p => p.email == email || p.Password == password).FirstOrDefaultAsync();
                if(dostavljac == null)
                {
                    throw new Exception("Ne postoji dostavljac!");
                }
                return Ok(dostavljac);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
                
    }
}
