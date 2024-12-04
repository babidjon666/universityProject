using backend.enums;

namespace backend.models
{
    public class ReferralForTesting
    {
        public int Id { get; set;}
        public int UserId { get; set; } 
        public UserModel User { get; set; } = null!;
        public TestType TestType { get; set;}
        public DateTime Date { get; set;}
    }
}