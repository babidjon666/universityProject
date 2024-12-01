using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;

namespace backend.interfaces
{
    public interface IRequestRepository
    {
        Task CreateRequestInDataBase(int userId, Request request);
        Task<IEnumerable<Request>> GetUsersRequest(int userId);
        Task<IEnumerable<Request>> GetAllWaitingRequests();
        Task SetDoctorRepository(int doctorId, int requestId);
    }
}