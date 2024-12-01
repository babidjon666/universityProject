using backend.enums;

namespace backend.models
{
    public class Request
    {
        public int Id { get; set;}
        public int UserId { get; set; } 
        public UserModel User { get; set; } = null!;
        public int DoctorId { get; set; } 
        public string DescriptionOfGoal { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public RequestStatus RequestStatus { get; set; }
    }
}