using backend.enums;

namespace backend.models
{
    public class ClinicalBloodTestResult: TestResult
    {
        public double RedBloobCells { get; set; }
        public double ColorIndex { get; set; }
        public double ErythrocyteSedimentation { get; set; }
        public double Hemoglobin { get; set; }
        public double Platelets { get; set; }
        public double Leukocytes { get; set; }
        public double Basophils { get; set; }
        public double Eosinophils { get; set; }
        public double Monocytes { get; set; }
        public double Lymphocytes { get; set; }
    }
}