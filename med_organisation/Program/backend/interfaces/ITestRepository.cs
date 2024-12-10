using backend.models;

namespace backend.interfaces
{
    public interface ITestRepository
    {
        Task CreateReferralFroUser(int userId, ReferralForTesting referralForTesting);
        Task<IEnumerable<ReferralForTesting>> GetReferralForTesting(int userId);
        Task<IEnumerable<UserModel>> GetMyClientsRepository(int doctorId);
        Task CreateClinicalBloodTestRepo(int userId, ClinicalBloodTestResult testResult);
        Task CreateClinicalUrineTestRepo(int userId, ClinicalUrineTestResult testResult);
        Task<TestResultDTO> GetUsersTests(int userId);
        Task CreateBloodTestForHIVRepo(int userId, BloodTestForHIVResult testResult);
        Task CreateBloodTestForSyphilisRepo(int userId, BloodTestForSyphilisResult testResult);
        Task CreateUrineAnalysisForDrugsAndPsychotropicsRepo(int userId, UrineAnalysisForDrugsAndPsychotropicsResult testResult);
        Task<IEnumerable<UserModel>> GetUsersWithReferralsRepo();
    }
}