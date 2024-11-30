using backend.interfaces;
using backend.models;
using backend.models.DTO;
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
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerRequest)
        {
            var newUser = new UserModel {
                Name = registerRequest.Name,
                Surname = registerRequest.Surname,
                Login = registerRequest.Login,
                Password = registerRequest.Password,
                Role = new BaseRoleModel {
                    RoleName = enums.RoleName.Client
                }
            };

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

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginRequest)
        {
            try
            {
                var user = await authService.LoginService(loginRequest.Login, loginRequest.Password);
                return Ok($"{user.Role.RoleName} успешно вошел");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка логина: {ex.Message}");
            }
        }
    }
}