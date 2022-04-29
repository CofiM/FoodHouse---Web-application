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

        [Route("PostaviDostavljaca/{usernameD}/{id}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> postaviDostavljaca(String usernameD, int id)
        {
            if (String.IsNullOrWhiteSpace(usernameD) || usernameD.Length > 30)
            {
                return BadRequest("Nevalidna vrednost za username");
            }
            if (id < 0)
            {
                return BadRequest("Nevalidna vrednost za ID!");
            }
            try
            {
                var domacinstvo = await Context.Domacinstva
                .Where(p => p.Username == usernameD)
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

        [Route("PromeniSifruDostavljaca/{email}/{pass}/{newPass}")]
        [EnableCors("CORS")]
        [HttpPut]
        public async Task<ActionResult> promeniSifruDostavljaca(String email, String pass, String newPass)
        {
            if (String.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Morate da unesete email!");
            }
            try
            {
                var dostavljac = await Context.Dostavljaci
                .Where(p => p.email == email && p.Password == pass)
                .FirstOrDefaultAsync();
                if (dostavljac != null)
                {
                    dostavljac.Password = newPass;
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
    }
}