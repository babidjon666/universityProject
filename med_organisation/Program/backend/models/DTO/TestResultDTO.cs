using backend.enums;

namespace backend.models
{
    public class TestResultDTO
    {
        public IEnumerable<ClinicalUrineTestResult> ClinicalUrineTestResults { get; set; } 
        public IEnumerable<ClinicalBloodTestResult> ClinicalBloodTestResults { get; set; } 
    }
}