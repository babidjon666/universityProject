using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public RoleName RoleName { get; set; } 
        public Profile? Profile { get; set; }
        public List<Request> Requests { get; set; } = new List<Request>();
        public List<ReferralForTesting> ReferralsForTesting { get; set; } = new List<ReferralForTesting>();
        public List<TestResult> TestResults { get; set; } = new List<TestResult>();
        public List<Certificate> Certificates { get; set; } = new List<Certificate>();
    }
}