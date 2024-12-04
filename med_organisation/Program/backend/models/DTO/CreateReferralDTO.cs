using backend.enums;

namespace backend.models
{
    public class CreateReferralDTO
    {
        public int UserId { get; set;}
        public TestType TestType { get; set;}
        public DateTime Date { get; set;}
    }
}