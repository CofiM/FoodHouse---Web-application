using System;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Models;


namespace SWE___PROJEKAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NarudzbineController : ControllerBase
    {
        public ProjekatContext Context { get; set; }
        public NarudzbineController(ProjekatContext context)
        {
            Context = context;
        }

        [Route("DodatiNarudzbinu/{idKorisnika}/{idProizvoda}/{idDomacinstva}/{idDostavljaca}/{cenaDostave}/{proveriDostavu}/{brojProizvoda}/{cenaProizvoda}/{imeProizvoda}")]
        [EnableCors("CORS")]
        [HttpPost, Authorize(Roles = "K")]
        public async Task<ActionResult> dodajNarudzbinu(int idKorisnika,int idProizvoda,int idDomacinstva,int idDostavljaca,int cenaDostave,int proveriDostavu,int brojProizvoda,int cenaProizvoda,string imeProizvoda)
        {
            if (idKorisnika < 0)
            {
                return BadRequest("Pogresan ID korisnika!");
            }
            try
            {
                var narudzbina = await Context.Narudzbine
                .Where(p=>p.KorisnikFK == idKorisnika && p.ProizvodFK == idProizvoda).FirstOrDefaultAsync();


                if (narudzbina != null)
                {
                    narudzbina.brojProizvoda = brojProizvoda;/*narudzbina.brojProizvoda + U slucaju da se dodaje nadoknado*/
                    narudzbina.ProveriDostava = proveriDostavu;
                    await Context.SaveChangesAsync();
                    return Ok(narudzbina);
                }
                else
                {
                   var novaNarudzbina = new Narudzbina();
                   novaNarudzbina.KorisnikFK = idKorisnika;
                   novaNarudzbina.ProizvodFK = idProizvoda;
                   novaNarudzbina.DomacinstvoFK =  idDomacinstva;
                   novaNarudzbina.DostavljacFK = idDostavljaca;
                   novaNarudzbina.CenaDostavljaca = cenaDostave;
                   novaNarudzbina.ProveriDostava = proveriDostavu;
                   novaNarudzbina.brojProizvoda = brojProizvoda;
                   novaNarudzbina.CenaProizvoda = cenaProizvoda;
                   novaNarudzbina.ImeProizvoda = imeProizvoda;
                   Context.Narudzbine.Add(novaNarudzbina);
                    await Context.SaveChangesAsync();
                    return Ok(novaNarudzbina);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisatiNarudzbinu/{idNarudzbine}")]
        [EnableCors("CORS")]
        [HttpDelete, Authorize(Roles = "K,D")]
        public async Task<ActionResult> ObrisatiNarudzbinu(int idNarudzbine)
        {
            try
            {
                
                var narudzbina = await Context.Narudzbine.Where(p=>p.ID == idNarudzbine).FirstOrDefaultAsync();
                if(narudzbina == null)
                {
                    throw new Exception("Ne postoji narudzbina!");
                }
                Context.Narudzbine.Remove(narudzbina);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana narudzbina!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzetiNarudzbine/{id}")]
        [EnableCors("CORS")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNarudzbine(int id)
        {
            try
            {
                var proizvodi = await Context.Narudzbine.Where(p=>p.KorisnikFK==id).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                return Ok(proizvodi);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }  

        [Route("IzracunajRacun/{id}")]
        [EnableCors("CORS")]
        [HttpGet, Authorize(Roles = "K")]
        public async Task<ActionResult> IzracunajRacun(int id)
        {
            //slicna funkcija ali samo da racuna dodatne dostave;
            try
            {
                int cena = 0;
                var ids = new List<int>();
                var idsDomacinstva = new List<int>();
                var proizvodi = await Context.Narudzbine.Where(p=>p.KorisnikFK==id).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                for(int i =0;i<proizvodi.Count;i++)
                {
                    if(ids.Contains(proizvodi[i].DostavljacFK))
                    {
                        cena = cena + (proizvodi[i].CenaProizvoda*proizvodi[i].brojProizvoda);
                    }
                    else
                    {
                        if(proizvodi[i].ProveriDostava==1)
                        {
                            cena = cena + (proizvodi[i].CenaProizvoda*proizvodi[i].brojProizvoda) + proizvodi[i].CenaDostavljaca;
                        }
                        else
                        {
                            cena = cena + (proizvodi[i].CenaProizvoda*proizvodi[i].brojProizvoda);
                        }
                        ids.Add(proizvodi[i].DostavljacFK);
                    }
                   
                }
                return Ok(cena);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzracunajDostavu/{id}")]
        [EnableCors("CORS")]
        [HttpGet, Authorize(Roles = "K")]
        public async Task<ActionResult> IzracunajDostavu(int id)
        {
            //slicna funkcija ali samo da racuna dodatne dostave;
            try
            {
                int cena = 0;
                var ids = new List<int>();
                var idsDomacinstva = new List<int>();
                var proizvodi = await Context.Narudzbine.Where(p=>p.KorisnikFK==id).ToListAsync();
                if(proizvodi == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                for(int i =0;i<proizvodi.Count;i++)
                {
                    // if(proizvodi[i].ProveriDostava==1)
                    // {
                    //     if(ids.Contains(proizvodi[i].DostavljacFK))
                    //     {
                    //         cena += 0;
                    //     }
                    //     else{
                    //         cena += proizvodi[i].CenaDostavljaca;
                    //         ids.Add(proizvodi[i].DostavljacFK);
                    //     }
                    // }
                    if(idsDomacinstva.Contains(proizvodi[i].DomacinstvoFK))
                    {
                        if(proizvodi[i].ProveriDostava==1)
                        {
                            if(ids.Contains(proizvodi[i].DostavljacFK))
                            {
                                cena += 0;
                            }
                            else
                            {
                                 cena += proizvodi[i].CenaDostavljaca;
                                 ids.Add(proizvodi[i].DostavljacFK);
                            }
                        }
                    }
                    else
                    {
                        if(proizvodi[i].ProveriDostava==1)
                        {
                            cena += proizvodi[i].CenaDostavljaca;
                            if(!ids.Contains(proizvodi[i].DostavljacFK))
                            {
                                ids.Add(proizvodi[i].DostavljacFK);
                            }
                        }
                        else
                        {
                            cena += 0;
                        }
                        idsDomacinstva.Add(proizvodi[i].DomacinstvoFK);
                    }

                }
                return Ok(cena);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromenitiKvantitet/{idKorisnika}/{idProizvoda}/{kvantitet}/")]
        [EnableCors("CORS")]
        [HttpPut, Authorize(Roles = "K")]
        public async Task<ActionResult> PromenitiKvantitet(int idKorisnika,int idProizvoda,int kvantitet)
        {
            try
            {
                var proizvod = await Context.Narudzbine.Where(p=>p.KorisnikFK==idKorisnika && p.ProizvodFK==idProizvoda).FirstOrDefaultAsync();
                if(proizvod == null)
                {
                    throw new Exception("Ne postoje narudzbine za tog korisnika");
                }
                proizvod.brojProizvoda=kvantitet;
                await Context.SaveChangesAsync();
                return Ok(proizvod);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiNarudzbinu/{idKorisnika}/{idProizvoda}")]
        [EnableCors("CORS")]
        [HttpDelete, Authorize(Roles = "K")]
        public async Task<ActionResult> ObrisiNarudzbinu(int idKorisnika,int idProizvoda)
        {
            try
            {
                
                var narudzbina = await Context.Narudzbine.Where(p=>p.KorisnikFK == idKorisnika && p.ProizvodFK == idProizvoda).FirstOrDefaultAsync();
                if(narudzbina == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                }
                Context.Narudzbine.Remove(narudzbina);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana narudzbina!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiNarudzbine/{idKorisnika}")]
        [EnableCors("CORS")]
        [HttpDelete, Authorize(Roles = "K")]
        public async Task<ActionResult> ObrisiNarudzbinu(int idKorisnika)
        {
            try
            {
                
                var narudzbine = await Context.Narudzbine.Where(p=>p.KorisnikFK == idKorisnika).ToListAsync();
                if(narudzbine == null)
                {
                    throw new Exception("Ne postoji korisnik!");
                   
                }
                foreach (var item in narudzbine)
                {
                    Context.Narudzbine.Remove(item);
                }
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana narudzbina!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}