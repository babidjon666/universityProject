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

        public async Task<TestResultDTO> GetUsersTests(int userId)
        {
            var user = await _context.Users
                .Include(u => u.TestResults)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }

            var ClinicalBloodTests = await _context.ClinicalBloodTestResults
                .Where(c => c.UserId == userId)
                .ToListAsync();
            
            var ClinicalUrineTests = await _context.ClinicalUrineTestResults
                .Where(c => c.UserId == userId)
                .ToListAsync();
            
            var BloodTestForHIVResults = await _context.BloodTestForHIVResults
                .Where(c => c.UserId == userId)
                .ToListAsync();

            var BloodTestForSyphilisResults = await _context.BloodTestForSyphilisResults
                .Where(c => c.UserId == userId)
                .ToListAsync();
            
            var UrineAnalysisForDrugsAndPsychotropicsResults = await _context.UrineAnalysisForDrugsAndPsychotropicsResults
                .Where(c => c.UserId == userId)
                .ToListAsync();

            var tests = new TestResultDTO{
                ClinicalBloodTestResults = ClinicalBloodTests,
                ClinicalUrineTestResults = ClinicalUrineTests,
                BloodTestForHIVResults = BloodTestForHIVResults,
                BloodTestForSyphilisResults = BloodTestForSyphilisResults,
                UrineAnalysisForDrugsAndPsychotropicsResults = UrineAnalysisForDrugsAndPsychotropicsResults
            };
            return tests;
        }

        public async Task CreateClinicalBloodTestRepo(int userId, ClinicalBloodTestResult testResult)   
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }
            testResult.User = user;
            testResult.TestType = enums.TestType.ClinicalBloodTest;
            _context.ClinicalBloodTestResults.Add(testResult);

            await Save();
        }

        public async Task CreateClinicalUrineTestRepo(int userId, ClinicalUrineTestResult testResult)   
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }
            testResult.User = user;
            testResult.TestType = enums.TestType.ClinicalUrineTests;
            _context.ClinicalUrineTestResults.Add(testResult);

            await Save();
        }

        public async Task CreateBloodTestForHIVRepo(int userId, BloodTestForHIVResult testResult)   
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }
            testResult.User = user;
            testResult.TestType = enums.TestType.BloodTestForHIV;
            _context.BloodTestForHIVResults.Add(testResult);

            await Save();
        }

        public async Task CreateBloodTestForSyphilisRepo(int userId, BloodTestForSyphilisResult testResult)   
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }
            testResult.User = user;
            testResult.TestType = enums.TestType.BloodTestForSyphilis;
            _context.BloodTestForSyphilisResults.Add(testResult);

            await Save();
        }

        public async Task CreateUrineAnalysisForDrugsAndPsychotropicsRepo(int userId, UrineAnalysisForDrugsAndPsychotropicsResult testResult)   
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("пользователь не найден в бд");
            }
            testResult.User = user;
            testResult.TestType = enums.TestType.UrineTestForDrugs;
            _context.UrineAnalysisForDrugsAndPsychotropicsResults.Add(testResult);

            await Save();
        }

        public async Task<IEnumerable<UserModel>> GetUsersWithReferralsRepo()
        {
            var users = await _context.Users
                .Where(u => u.ReferralsForTesting.Count > 0 && u.ReferralsForTesting!=null)
                .ToListAsync();

            return users;
        }
    }
}