using System.Text.Json.Serialization;
using backend.enums;

namespace backend.models
{
    public class TestResult
    {
        public int Id { get; set; }
        public TestType TestType { get; set; }
        [JsonIgnore]
        public UserModel User { get; set; }
        public int UserId { get; set; }
    }
}