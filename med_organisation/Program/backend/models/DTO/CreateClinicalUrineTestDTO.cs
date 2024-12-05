using backend.enums;

namespace backend.models
{
    public class CreateClinicalUrineTestDTO
    {
        public int UserId { get; set;}
        public double RedBloobCells { get; set; }
        public double Urobilinogen { get; set; }
        public double Leukocytes { get; set; }
        public bool Bilirubin { get; set; }
        public double Protien { get; set; }
        public double Acidity { get; set; }
        public double Density { get; set; }
        public bool Nitrites { get; set; }
        public bool Glucose { get; set; }
        public string Color { get; set; }
    }
}