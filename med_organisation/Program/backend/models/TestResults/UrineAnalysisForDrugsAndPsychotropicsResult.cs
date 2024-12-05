using System.Text.Json.Serialization;

namespace backend.models
{
    public class UrineAnalysisForDrugsAndPsychotropicsResult: TestResult
    {
        public bool NicotinAndMetabolites { get; set; }
        public bool Alcohol { get; set; }
        public bool PsychoactiveSubstances { get; set; }
        public bool NarcoticSubctances { get; set; }
    }
}