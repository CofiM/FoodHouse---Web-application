using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace Models
{
    public class FileUpload
    {
        public IFormFile files { get; set; }

    }
}