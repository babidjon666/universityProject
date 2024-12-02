using backend.interfaces;
using backend.models;
using backend.models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController: ControllerBase
    {
        private readonly IRequestService requestService;

        public RequestController(IRequestService requestService)
        {
            this.requestService = requestService;
        }
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateRequest([FromBody]CreateRequestDTO createRequestRequest)
        {
            if (createRequestRequest == null)
            {
                return Conflict("Заявка пустая");
            }

            var request = new Request{
                DescriptionOfGoal = createRequestRequest.DescriptionOfGoal,
                Date = createRequestRequest.Date,
                Time = createRequestRequest.Time,
                RequestStatus = createRequestRequest.RequestStatus
            };

            try{
                await requestService.CreateRequestService(createRequestRequest.UserId, request);
                return Ok($"Заявка создана");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка создании заявки: {ex.Message}");
            }
        }

        [HttpGet("GetUsersRequest")]
        public async Task<ActionResult<IEnumerable<Request>>> GetUsersRequest(int userId)
        {
            
            try{
                var requests = await requestService.GetUsersRequestsService(userId);
                
                if (requests == null || !requests.Any())
                {
                    return NotFound("Запросы для указанного пользователя не найдены.");
                }

                return Ok(requests);
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Некорректный параметр: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }

        [HttpGet("GetAllWaitingRequests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllWaitingRequests()
        {
            try{
                var requests = await requestService.GetWaitingRequestsService();

                return Ok(requests);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }

        [HttpPost("SetDoctor")]
        public async Task<IActionResult> SetDoctor([FromBody]SetDoctorDTO setDoctorRequest)
        {
            try{
                await requestService.SetDoctorService(setDoctorRequest.DoctorId, setDoctorRequest.RequestId);

                return Ok("Доктор установлен");
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }

        [HttpGet("GetFreeDoctors")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetFreeDoctors(int requestId)
        {
            try{
                var doctors = await requestService.GetFreeDoctorsService(requestId);

                return Ok(doctors);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
        [HttpPut("CancelRequest")]
        public async Task<IActionResult> CancelRequest(int requestId)
        {
            try{
                await requestService.CancelRequestService(requestId);
                return Ok($"Заявка с id={requestId} отменена!");
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
    }
}