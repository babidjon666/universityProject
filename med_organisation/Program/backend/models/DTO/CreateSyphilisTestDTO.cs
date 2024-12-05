using backend.enums;

namespace backend.models
{
    public class CreateSyphilisTestDTO
    {
        public int UserId { get; set;}
        public bool Result { get; set; }
    }
}