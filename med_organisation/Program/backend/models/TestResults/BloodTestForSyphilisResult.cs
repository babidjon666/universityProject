using System.Text.Json.Serialization;

namespace backend.models
{
    public class BloodTestForSyphilisResult: TestResult
    {
        public bool Result { get; set; }
    }
}