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
                DoctorId = 0,
                Date = request.Date,  
                Time = request.Time,  
                RequestStatus = request.RequestStatus 
            };
            _context.Requests.Add(newRequest);
            await Save();
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

        public async Task<IEnumerable<Request>> GetAllWaitingRequests()
        {
            try{
                return await _context.Requests
                                    .Where(r => r.RequestStatus == enums.RequestStatus.InProcess)
                                    .ToListAsync();
            }
            catch(Exception ex){
                throw new Exception("Ошибка в базе данных");
            }
        }

       public async Task SetDoctorRepository(int doctorId, int requestId)
        {
            var requestForSet = await _context.Requests
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (requestForSet == null)
            {
                throw new Exception("Заявка не найдена");
            }

            var checkRequest = await _context.Requests
                .FirstOrDefaultAsync(r => r.Date == requestForSet.Date 
                                        && r.Time == requestForSet.Time 
                                        && r.DoctorId == doctorId 
                                        && r.Id != requestId);

            if (checkRequest != null)
            {
                throw new Exception("Доктор занят");
            }

            requestForSet.DoctorId = doctorId;
            requestForSet.RequestStatus = enums.RequestStatus.Ready;
            await Save();
        }

        public async Task<IEnumerable<UserModel>> GetAllFreeDoctors(int requestId)
        {
            var request = await _context.Requests
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null)
            {
                throw new Exception("Заявка не найдена");
            }

            // Получить всех докторов
            var allDoctors = await _context.Users
                .Where(u => u.RoleName == enums.RoleName.Doctor)
                .ToListAsync();

            // Найти занятых докторов на это время
            var busyDoctors = await _context.Requests
                .Where(r => r.Date == request.Date && r.Time == request.Time && r.DoctorId != 0)
                .Select(r => r.DoctorId)
                .ToListAsync();

            // Отфильтровать свободных докторов
            var freeDoctors = allDoctors
                .Where(d => !busyDoctors.Contains(d.Id))
                .Select(d => new UserModel
                {
                    Id = d.Id,
                    Name = d.Name,
                    Surname = d.Surname
                });

            return freeDoctors;
        }

        public async Task CancelRequestRepository(int requestId)
        {
            var request = await _context.Requests
                .FirstOrDefaultAsync(r => r.Id == requestId);

            if (request == null)
            {
                throw new Exception("Заявка не найдена!");
            }

            request.RequestStatus = enums.RequestStatus.Canceled;
            await Save();
        }
    }
}