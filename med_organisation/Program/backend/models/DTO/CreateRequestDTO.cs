using backend.enums;

namespace backend.models
{
    public class CreateRequestDTO
    {
        public int UserId { get; set;}
        public string DescriptionOfGoal { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public RequestStatus RequestStatus { get; set; }
    }
}