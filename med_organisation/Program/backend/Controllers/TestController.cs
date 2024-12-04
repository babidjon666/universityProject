using backend.interfaces;
using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;
using backend.models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController: ControllerBase
    {
        private readonly ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }

        [HttpPost("CreateReferral")]
        public async Task<IActionResult> CreateReferral(CreateReferralDTO createReferraRequest)
        {
            try{   
                var referral = new ReferralForTesting{
                    Date = createReferraRequest.Date,
                    TestType = createReferraRequest.TestType
                } ;
                await testService.CreateReferralService(createReferraRequest.UserId, referral);
                return Ok("Направление на анализы создано!");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpGet("GetReferralForTesting")]
        public async Task<ActionResult<IEnumerable<ReferralForTesting>>> GetReferralForTesting(int userId)
        {
            try{   
                var referrals = await testService.GetReferralForTestingService(userId);

                return Ok(referrals);
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpGet("GetMyClients")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetMyClients(int doctorId)
        {
            try{   
                var clients = await testService.GetMyClientsService(doctorId);

                return Ok(clients);
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
    }
}