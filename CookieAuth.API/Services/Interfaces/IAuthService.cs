
using CookieAuth.API.DTOs;

public interface IAuthService
{
    string Register(RegisterRequestDto dto);
    Task<ApiResponseDto<LoginRequestDto>> LogIn(LoginRequestDto dto, HttpContext httpContext);
    Task<ApiResponseDto<string>> LogOut(HttpContext httpContext);

}