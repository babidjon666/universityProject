using System.Text.Json.Serialization;

namespace backend.models
{
    public class CreateDrugTestDTO
    {
        public int UserId { get; set;}
        public bool NicotinAndMetabolites { get; set; }
        public bool Alcohol { get; set; }
        public bool PsychoactiveSubstances { get; set; }
        public bool NarcoticSubctances { get; set; }
    }
}