using backend.Data;
using backend.interfaces;
using backend.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Repositories
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public RequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateRequestInDataBase(int userId, Request request)
        {
            var user = await _context.Users
                                        .Include(u => u.Requests)
                                        .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var newRequest = new Request
            {
                User = user,
                DescriptionOfGoal = request.DescriptionOfGoal,  
                Date = request.Date,  
                Time = request.Time,  
                RequestStatus = request.RequestStatus 
            };
            _context.Requests.Add(newRequest);
            await Save();

            //if (user.Profile != null)
            //{
            //    user.Profile.Requests.Add(newRequest);
            //    await Save();
            //}
        }

        public async Task<IEnumerable<Request>> GetUsersRequest(int userId)
        {
            var user = await _context.Users
                                        .Include(u => u.Requests)
                                        .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null)
            {
                throw new Exception("User not found");
            }

            return user.Requests;
        }
    }
}