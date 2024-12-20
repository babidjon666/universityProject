using backend.interfaces;
using backend.models;
using backend.models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificateController: ControllerBase
    {
        private readonly ICertificateService certificateService;

        public CertificateController(ICertificateService certificateService)
        {
            this.certificateService = certificateService;
        }

        [Authorize(Roles = "Doctor")]
        [HttpPost("CreateCertificate")]
        public async Task<IActionResult> CreateCertificate([FromBody]CreateCertificateDTO createCertificateRequest)
        {
            try{
                await certificateService.CreateCertificateService(createCertificateRequest.UserId, createCertificateRequest.DateTime, createCertificateRequest.DoctorId);

                return Ok("справка создана");
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [Authorize(Roles = "Client")]
        [HttpGet("GetUsersCertificate")]
        public async Task<ActionResult<IEnumerable<Certificate>>> GetUsersCertificate(int userId)
        {
            try{
                var certificates = await certificateService.GetUserCertificatesService(userId);
                return Ok(certificates);
            }catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [Authorize(Roles = "Client")]
        [HttpGet("DownloadCertificate")]
        public async Task<IActionResult> DownloadCertificate(int certificateId)
        {
            try{
                var pdf = await certificateService.GeneratePDFService(certificateId);
                return File(pdf, "application/pdf", $"Certificate_{certificateId}.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }
    }
}