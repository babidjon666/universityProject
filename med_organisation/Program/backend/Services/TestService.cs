using backend.Data;
using backend.interfaces;
using backend.models;

namespace backend.Services
{
    public class TestService: ITestService
    {
        private readonly ITestRepository testRepository;

        public TestService(ITestRepository testRepository)
        {
            this.testRepository = testRepository;
        }

        public async Task CreateReferralService(int userId, ReferralForTesting referralForTesting)
        {
            await testRepository.CreateReferralFroUser(userId, referralForTesting);
        }

        public async Task<IEnumerable<ReferralForTesting>> GetReferralForTestingService(int userId)
        {
            return await testRepository.GetReferralForTesting(userId);
        }

        public async Task<IEnumerable<UserModel>> GetMyClientsService(int doctorId)
        {
            return await testRepository.GetMyClientsRepository(doctorId);
        }
    }
}