using backend.interfaces;
using backend.models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "Doctor")]
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

        [Authorize(Roles = "Client,LaboratoryAssistent")]
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

        [Authorize(Roles = "Doctor,LaboratoryAssistent")]
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

        [Authorize(Roles = "Doctor,LaboratoryAssistent,Client")]
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

        [Authorize(Roles = "LaboratoryAssistent")]
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

        [Authorize(Roles = "LaboratoryAssistent")]
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

        [Authorize(Roles = "LaboratoryAssistent")]
        [HttpPost("CreateHIVTest")]
        public async Task<IActionResult> CreateHIVTest([FromBody]CreateHIVTestDTO testRequest)
        {
            var test = new BloodTestForHIVResult{
                Result = testRequest.Result
            };
            try{
                await testService.CreateBloodTestForHIVService(testRequest.UserId, test);
                return Ok("CreateHIVTest создан");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [Authorize(Roles = "LaboratoryAssistent")]
        [HttpPost("CreateSyphilisTest")]
        public async Task<IActionResult> CreateSyphilisTest([FromBody]CreateSyphilisTestDTO testRequest)
        {
            var test = new BloodTestForSyphilisResult{
                Result = testRequest.Result
            };
            try{
                await testService.CreateBloodTestForSyphilisService(testRequest.UserId, test);
                return Ok("CreateHIVTest создан");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [Authorize(Roles = "LaboratoryAssistent")]
        [HttpPost("CreateDrugsTest")]
        public async Task<IActionResult> CreateDrugsTest([FromBody]CreateDrugTestDTO testRequest)
        {
            var test = new UrineAnalysisForDrugsAndPsychotropicsResult{
                NicotinAndMetabolites = testRequest.NicotinAndMetabolites,
                Alcohol = testRequest.Alcohol,
                PsychoactiveSubstances = testRequest.PsychoactiveSubstances,
                NarcoticSubctances = testRequest.NarcoticSubctances
            };
            try{
                await testService.CreateUrineAnalysisForDrugsAndPsychotropicsService(testRequest.UserId, test);
                return Ok("CreateDrugsTest создан");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [Authorize(Roles = "LaboratoryAssistent")]
        [HttpGet("GetUsersWithReferrals")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsersWithReferrals()
        {
            try{
                var users = await testService.GetUsersWithReferralsService();
                return Ok(users);
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
    }
}