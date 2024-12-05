using backend.models;

namespace backend.interfaces
{
    public interface ITestService
    {
        Task CreateReferralService(int userId, ReferralForTesting referralForTesting);
        Task<IEnumerable<ReferralForTesting>> GetReferralForTestingService(int userId);
        Task<IEnumerable<UserModel>> GetMyClientsService(int doctorId);
        Task CreateClinicalBloodTestService(int userId, ClinicalBloodTestResult testResult);
        Task CreateClinicalUrineTestService(int userId, ClinicalUrineTestResult testResult);
        Task<TestResultDTO> GetUserTestsService(int userId);
    }
}