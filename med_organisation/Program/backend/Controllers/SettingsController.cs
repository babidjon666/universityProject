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
    public class SettingsController: ControllerBase
    {
        private readonly ISettingsService settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpPost("CreateSettings")]
        public async Task<IActionResult> CreateSettings([FromBody]CreateSettingsDTO settingsRequest)
        {
            var setting = new Settings{
                Deadlines = settingsRequest.Deadlines,
                Terms = settingsRequest.Terms
            };

            try{
                await settingsService.CreateSettingsService(setting);
                return Ok("Настройка создана");
            }
            catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpDelete("DeleteSettings")]
        public async Task<IActionResult> DeleteSettings(int settingId)
        {
            try{
                await settingsService.DeleteSettingsService(settingId);
                return Ok($"Настройка с id={settingId} удалена");
            }
            catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }

        [HttpGet("GetAllSettings")]
        public async Task<ActionResult<IEnumerable<Settings>>> GetAllSettings()
        {
            try{
                var setting = await settingsService.GetSettingsService();
                return Ok(setting);
            }
            catch(Exception ex){
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}"); 
            }
        }
    }
}