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
    public class ProfileController: ControllerBase
    {
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [HttpGet("GetProfile")]
        public async Task<ActionResult<UserModel>> GetProfile(int userId)
        {
            try
            {
                var user = await profileService.GetProfileService(userId);
                return user;
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка логина: {ex.Message}");
            }
        }

        [HttpPost("EditPatient")]
        public async Task<IActionResult> EditPatient([FromBody]EditPatientDTO patientRequest)
        {
            if (patientRequest == null){
                return Conflict("Нету патента");
            }

            var patient = new Patient{
                DocumentNumber = patientRequest.DocumentNumber,
                Serie = patientRequest.Serie,
                INN = patientRequest.INN,
                PatentTerritory = patientRequest.PatentTerritory,
                IssuedBy = patientRequest.IssuedBy,
                Nationality = patientRequest.Nationality,
                DateOfIssue = patientRequest.DateOfIssue,
            };

            try{
                await profileService.EditPatientService(patientRequest.OldPatientId, patient);
                return Ok($"Патент с id={patientRequest.OldPatientId} был изменен");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка смены патента: {ex.Message}");
            }
        }
        [HttpPost("EditPassport")]
        public async Task<IActionResult> EditPatient([FromBody]EditPassportDTO passportRequest)
        {
            if (passportRequest == null){
                return Conflict("Нету паспорта");
            }

            var passport = new Passport {
                DocumentNumber = passportRequest.DocumentNumber,
                Serie = passportRequest.Serie,
                Sex = passportRequest.Sex,
                PlaceOfBirthday = passportRequest.PlaceOfBirthday,
                CodeOfState = passportRequest.CodeOfState,
                Nationality = passportRequest.Nationality,
                IssuingAuthority = passportRequest.IssuingAuthority,
                PlaceOfResidence = passportRequest.PlaceOfResidence,
                DateOfBirth = passportRequest.DateOfBirth,
                DateOfIssue = passportRequest.DateOfIssue,
                DateOfExpiry = passportRequest.DateOfExpiry
            };

            try{
                await profileService.EditPassportService(passportRequest.OldPassportId, passport);
                return Ok($"Пасспорт с id={passportRequest.OldPassportId} был изменен");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка смены паспорта: {ex.Message}");
            }
        }
    }
}