using backend.models;

namespace backend.interfaces
{
    public interface IRequestService
    {
         Task CreateRequestService(int userId,  Request request);
         Task<IEnumerable<Request>> GetUsersRequestsService(int userId);
         Task<IEnumerable<Request>> GetWaitingRequestsService();
         Task SetDoctorService(int doctorId, int requestId);
         Task<IEnumerable<UserModel>> GetFreeDoctorsService(int requestId);
         Task CancelRequestService(int requestId);
    }
}