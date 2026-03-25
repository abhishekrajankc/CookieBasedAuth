using CookieAuth.API.Data;
using CookieAuth.API.DTOs;
using CookieAuth.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookieAuth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }



        [HttpPost("register")]
        public IActionResult Register(RegisterRequestDto dto)
        {
            var result = _authService.Register(dto); 

            if (result == "User already exists")
                return BadRequest(result);

            return Ok(result);
             
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn(LoginRequestDto dto)
        {
            var result = await _authService.LogIn(dto, HttpContext);

            if (!result.Success)
            {
                return Unauthorized(result);
            }

            return Ok(result);
             
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
           var result = await _authService.LogOut(HttpContext);
            return Ok(result);
        }
        [Authorize]
        [HttpGet("getSession")]
        public IActionResult GetSession()
        {
            var email = User.Identity.Name;
            var fullName = User.FindFirst("fullName")?.Value;
            bool isAuth = User.Identity.IsAuthenticated;

            var response = new ApiResponseDto<SessionResponseDto>
            {
                Success = true,
                Message = "Session fetched successfully",
                Data = new SessionResponseDto
                {
                    IsAuthenticated = isAuth,
                    Email = email,
                    FullName = fullName, 
                }
            };

            return Ok(response);
        }
    }
}
