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
    public class FileUploadController : ControllerBase
    {
 
        public ProjekatContext Context{ get; set; }
        public static IWebHostEnvironment _webHostEnvironment;
        public FileUploadController(ProjekatContext context, IWebHostEnvironment webHostEnvironment)
        {
            Context=context;
            _webHostEnvironment = webHostEnvironment;
        }

        [Route("{id:int}")]
        [HttpPost, Authorize(Roles = "P")]

        public IActionResult Post([FromRoute]int id, [FromForm]IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\" + id + "\\";
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + file.FileName))
                    {
                        file.CopyTo(fileStream);
                        fileStream.Flush();
                        return Ok("Upload done");
                    }
                }
                else
                {
                    return BadRequest("Upload failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [HttpGet("{id}")]
 
        public async Task<IActionResult> Get(int id)
        {
            string path = _webHostEnvironment.WebRootPath + "\\" + id + "\\";
            var images = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories).ToList();
            var files = new List<byte[]>();
            foreach (var image in images)
            {
                 byte[] b = System.IO.File.ReadAllBytes(image);
                 files.Add(b);
            }
            return Ok(files);
        }

        [Route("Multiple/{id:int}")]
        [HttpPost, Authorize(Roles = "P")]

        public async Task<IActionResult> PostMultiple([FromRoute]int id, [FromForm]IFormFile[] files)
        {
            try
            {
                foreach(var file in files)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\" + id + "\\";
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + file.FileName))
                    {
                        file.CopyTo(fileStream);
                        fileStream.Flush();
                    }
                }

                return Ok("Upload done");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DomacinstvoPost/{id:int}")]
        [HttpPost, Authorize(Roles = "P")]

        public IActionResult DomacinstvoPost([FromRoute]int id, [FromForm]IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\dom" + id + "\\";
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + file.FileName))
                    {
                        file.CopyTo(fileStream);
                        fileStream.Flush();
                        return Ok("Upload done");
                    }
                }
                else
                {
                    return BadRequest("Upload failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DomacinstvoGet/{id:int}")]
        [HttpGet]
 
        public async Task<IActionResult> DomacinstvoGet(int id)
        {
            string path = _webHostEnvironment.WebRootPath + "\\dom" + id + "\\";
            var images = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories).ToList();
            var files = new List<byte[]>();
            foreach (var image in images)
            {
                 byte[] b = System.IO.File.ReadAllBytes(image);
                 files.Add(b);
            }
            return Ok(files);
        }

    }
}