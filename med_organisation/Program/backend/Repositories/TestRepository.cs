using backend.Data;
using backend.interfaces;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TestRepository : BaseRepository, ITestRepository
    {
        public TestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateReferralFroUser(int userId, ReferralForTesting referralForTesting)
        {
            var user = await _context.Users
                .Include(u => u.ReferralsForTesting)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null){
                throw new Exception("Пользователь не найден в бд");
            }

            var newReferralForTesting = new ReferralForTesting {
                User = user,
                TestType = referralForTesting.TestType,
                Date = referralForTesting.Date
            };

            _context.ReferralForTesting.Add(newReferralForTesting);
            await Save();
        }

        public async Task<IEnumerable<ReferralForTesting>> GetReferralForTesting(int userId)
        {
            var user = await _context.Users
                .Include(u => u.ReferralsForTesting)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null){
                throw new Exception("Пользователь не найден в бд");
            }
            
            return user.ReferralsForTesting;
        }

        public async Task<IEnumerable<UserModel>> GetMyClientsRepository(int doctorId)
        {
            var doctor = await _context.Users.FirstOrDefaultAsync(u => u.Id == doctorId);

            if (doctor == null)
            {
                throw new Exception("Доктор не найден");
            }

            var requests = await _context.Requests
                .Include(r => r.User)
                .Where(r => r.DoctorId == doctorId)
                .ToListAsync();
            
            var users = new List<UserModel>();
            foreach(var request in requests)
            {
                if (!users.Contains(request.User)){
                    users.Add(request.User);
                }
            }
            
            return users;
        }
    }
}