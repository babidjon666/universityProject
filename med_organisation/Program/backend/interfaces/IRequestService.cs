using backend.models;

namespace backend.interfaces
{
    public interface IRequestService
    {
         Task CreateRequestService(int userId,  Request request);
         Task<IEnumerable<Request>> GetUsersRequestsService(int userId);
    }
}