using backend.interfaces;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserModel newUser)
        {
            if (newUser == null)
            {
                return BadRequest("Пользователь пустой");
            }

            try
            {
                await authService.RegisterService(newUser);
                return Ok("Пользователь успешно зарегестрирован");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка регистрации: {ex.Message}");
            }
        }
    }
}