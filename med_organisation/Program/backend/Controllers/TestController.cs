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

        [HttpGet("GetUsersTests")]
        public async Task<ActionResult<TestResultDTO>> GetUsersTests(int userId)
        {
            try{   
                var tests = await testService.GetUserTestsService(userId);

                return Ok(tests);
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpPost("CreateClinicalBloodTest")]
        public async Task<IActionResult> CreateClinicalBloodTest([FromBody] CreateClinicalBloodTestDTO testRequest)
        {
            var test = new ClinicalBloodTestResult{
                RedBloobCells = testRequest.RedBloobCells,
                ColorIndex = testRequest.ColorIndex,
                ErythrocyteSedimentation = testRequest.ErythrocyteSedimentation,
                Hemoglobin = testRequest.Hemoglobin,
                Platelets = testRequest.Platelets,
                Leukocytes = testRequest.Leukocytes,
                Basophils = testRequest.Basophils,
                Eosinophils = testRequest.Eosinophils,
                Monocytes = testRequest.Monocytes,
                Lymphocytes = testRequest.Lymphocytes
            };
            try{
                await testService.CreateClinicalBloodTestService(testRequest.UserId, test);
                return Ok("CreateClinicalBloodTest создан");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpPost("CreateClinicalUrineTest")]
        public async Task<IActionResult> CreateClinicalUrineTest([FromBody] CreateClinicalUrineTestDTO testRequest)
        {
            var test = new ClinicalUrineTestResult{
                RedBloobCells = testRequest.RedBloobCells,
                Urobilinogen = testRequest.Urobilinogen,
                Leukocytes = testRequest.Leukocytes,
                Bilirubin = testRequest.Bilirubin,
                Protien = testRequest.Protien,
                Acidity = testRequest.Acidity,
                Density = testRequest.Density,
                Nitrites = testRequest.Nitrites,
                Glucose = testRequest.Glucose,
                Color = testRequest.Color
            };
            try{
                await testService.CreateClinicalUrineTestService(testRequest.UserId, test);
                return Ok("CreateClinicalBloodTest создан");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
    }
}