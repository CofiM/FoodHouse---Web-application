using System;
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
    public class UserController : ControllerBase
    {

        public ProjekatContext Context{ get; set; }
        private readonly IConfiguration _configuration;
        public static IWebHostEnvironment _webHost;
        public UserController(ProjekatContext context, IConfiguration configuration,IWebHostEnvironment hostingEnvironment)
        {
            Context=context;
            _configuration=configuration;
            _webHost = hostingEnvironment;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmc = new HMACSHA512())
            {
                passwordSalt = hmc.Key;
                passwordHash = hmc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        [Route("AddUser/{name}/{surname}/{username}/{password}/{confPassword}/{email}/{type}/{address}")]  
        [EnableCors("CORS")]
        [HttpPost]    
         public async Task<ActionResult<User>> AddUser(string name, string surname, string username, string password, string confPassword, string email, char type, string address)
        {
            User k = new User();
            if(password != confPassword){
                return BadRequest("Sifre se ne podudaraju!");
            }
            try
            {
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                
                k.PasswordHash = passwordHash;
                k.PasswordSalt = passwordSalt;
                k.Ime = name;
                k.Prezime = surname;
                k.email = email;
                k.Username = username;
                k.Tip = type;
                k.Adresa = address;
                Context.Users.Add(k);
            }
            
            catch (Exception e)
            {
                
               return BadRequest(e.Message);
            }
            await Context.SaveChangesAsync();
            return Ok(k);
        } 
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<string>> Login(string email, string password)
        {
            try{
            var user = await Context.Users.Where(p => p.email == email).FirstOrDefaultAsync();
            if (user == null) return BadRequest("Nemamo ovakvog korisnika");
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
               return  BadRequest("Pogresna sifra");
            }
            return Ok(CreateToken(user));
            }
            catch(Exception e)
            {
                return BadRequest(e.StackTrace);
            }
        }
        private string CreateToken(User k)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, k.Ime),
                new Claim(ClaimTypes.Name, k.Prezime),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims : claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
