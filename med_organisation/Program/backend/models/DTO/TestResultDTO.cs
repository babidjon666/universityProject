using backend.enums;

namespace backend.models
{
    public class TestResultDTO
    {
        public IEnumerable<ClinicalUrineTestResult> ClinicalUrineTestResults { get; set; } 
        public IEnumerable<ClinicalBloodTestResult> ClinicalBloodTestResults { get; set; } 
        public IEnumerable<BloodTestForHIVResult> BloodTestForHIVResults { get; set; } 
        public IEnumerable<BloodTestForSyphilisResult> BloodTestForSyphilisResults { get; set; } 
        public IEnumerable<UrineAnalysisForDrugsAndPsychotropicsResult> UrineAnalysisForDrugsAndPsychotropicsResults { get; set; } 
    }
}