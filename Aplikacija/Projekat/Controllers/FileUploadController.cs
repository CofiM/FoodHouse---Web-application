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
            if(!fileUpload.Id.HasValue){
                return "Id nevalidan";
            }
            var uploadedFile = fileUpload.File;
            try{
                if(uploadedFile.Length > 0){
                    string path = _webHostEnvironment.WebRootPath + "\\" + fileUpload.Id.Value + "\\";
                    if(!System.IO.Directory.Exists(path)){
                        System.IO.Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + uploadedFile.FileName))
                    {
                        uploadedFile.CopyTo(fileStream);
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
    }
}
