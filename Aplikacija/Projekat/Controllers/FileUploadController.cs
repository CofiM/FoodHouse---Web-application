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

        [HttpPost]

        public async Task<string> Post([FromForm] FileUpload fileUpload){
            try{
                if(fileUpload.files.Length > 0){
                    string path = _webHostEnvironment.WebRootPath + "\\uploads\\";
                    if(!System.IO.Directory.Exists(path)){
                        System.IO.Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + fileUpload.files.FileName))
                    {
                        fileUpload.files.CopyTo(fileStream);
                        fileStream.Flush();
                        return "Upload done";
                    }
                }
                else{
                    return "Failed";
                }
            }
            catch(Exception ex){
                return ex.Message;
            }
        }

        [HttpGet("{fileName}")]

        public async Task<IActionResult> Get(string fileName)
        {
            string path = _webHostEnvironment.WebRootPath + "\\uploads\\";
            var filePath = path + fileName + ".png";
            if(System.IO.File.Exists(filePath)){
                byte[] b = System.IO.File.ReadAllBytes(filePath);
                return File(b, "image/png");
            }
            return null;
        }
    }
}
