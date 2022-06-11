using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Models;
using System.Text;

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
        [HttpPost]

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
            // var filePath = path + fileName + ".png";
            // if(System.IO.File.Exists(filePath)){
            //     byte[] b = System.IO.File.ReadAllBytes(filePath);
            //     return File(b, "image/png");
            // }
            // return null;
            return Ok(files);
        }

        [Route("Multiple/{id:int}")]
        [HttpPost]

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
        [HttpPost]

        public IActionResult DomacinstvoPost([FromRoute]int id, [FromForm]IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\dom\\" + id + "\\";
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
            string path = _webHostEnvironment.WebRootPath + "\\" + id + "\\";
            var images = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories).ToList();
            var files = new List<byte[]>();
            foreach (var image in images)
            {
                 byte[] b = System.IO.File.ReadAllBytes(image);
                 files.Add(b);
            }
            // var filePath = path + fileName + ".png";
            // if(System.IO.File.Exists(filePath)){
            //     byte[] b = System.IO.File.ReadAllBytes(filePath);
            //     return File(b, "image/png");
            // }
            // return null;
            return Ok(files);
        }

    }
}