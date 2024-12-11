using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.models
{
    public class Certificate
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int UserId { get; set; } 
        [JsonIgnore]
        public UserModel User { get; set; } = null!;
        public int DoctorId { get; set; }  
        //public UserModel Doctor { get; set; } = null!;
    }
}