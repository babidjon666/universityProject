using backend.models;

namespace backend.interfaces
{
    public interface ITestRepository
    {
        Task CreateReferralFroUser(int userId, ReferralForTesting referralForTesting);
        Task<IEnumerable<ReferralForTesting>> GetReferralForTesting(int userId);
    }
}