using backend.models;
using backend.interfaces;

namespace backend.Services
{
    public class RequestService: IRequestService    
    {
        private readonly IRequestRepository requestRepository;
        public RequestService(IRequestRepository requestRepository)
        {
            this.requestRepository = requestRepository;
        }

        public async Task CreateRequestService(int userId,  Request request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request), "Request cannot be null");
            }

            if (string.IsNullOrEmpty(request.DescriptionOfGoal))
            {
                throw new ArgumentException("Description of goal is required");
            }

            await requestRepository.CreateRequestInDataBase(userId, request);
        }

        public async Task<IEnumerable<Request>> GetUsersRequestsService(int userId)
        {
            var requests = await requestRepository.GetUsersRequest(userId);

            return requests;
        }

        public async Task<IEnumerable<Request>> GetWaitingRequestsService()
        {
            return await requestRepository.GetAllWaitingRequests();
        }

        public async Task SetDoctorService(int doctorId, int requestId)
        {
            await requestRepository.SetDoctorRepository(doctorId, requestId);
        }
    }
}