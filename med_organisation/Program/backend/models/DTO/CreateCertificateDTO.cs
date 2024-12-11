using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.models.DTO
{
    public class CreateCertificateDTO
    {
        public DateTime DateTime { get; set; }
        public int UserId { get; set; } 
        public int DoctorId { get; set; }  
    }
}