using backend.interfaces;
using backend.models;
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
                // Если requestService выбросил исключение из-за некорректных данных
                return BadRequest($"Некорректный параметр: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Логгирование исключения, если это возможно
                // _logger.LogError(ex, "Ошибка при получении запросов пользователя.");
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }
    }
}