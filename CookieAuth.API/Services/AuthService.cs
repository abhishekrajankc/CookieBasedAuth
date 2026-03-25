using CookieAuth.API.DTOs;
using CookieAuth.API.Entities;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using System.Security.Principal;

public class AuthService : IAuthService
{
    public readonly IUserRepository _userRepository;
    public readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;

        _httpContextAccessor = httpContextAccessor;
    }

    public string Register(RegisterRequestDto dto)
    {
        // Check if user with the same email already exists
        var existingUser = _userRepository.GetUserByEmail(dto.Email);
        if (existingUser != null)
        {
            throw new Exception("User with this email already exists.");
        }
        // Hash the password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        // Create a new user entity
        var newUser = new User
        {
            Email = dto.Email,
            PasswordHash = passwordHash,
            FullName = dto.FullName,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
        // Add the new user to the repository and save changes
        _userRepository.AddUser(newUser);
        _userRepository.SaveChanges();
        return "User registered successfully.";
    }

    public async Task<ApiResponseDto<LoginRequestDto>> LogIn(LoginRequestDto dto, HttpContext httpContext)
    {
        // Find the user by email
        var user = _userRepository.GetUserByEmail(dto.Email);
        if (user == null || !user.IsActive)
        {
            return new ApiResponseDto<LoginRequestDto>
            {
                Success = false,
                Message = "Invalid credentials", 
            };
        }
        // Verify the password
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return new ApiResponseDto<LoginRequestDto>
            {
                Success = false,
                Message = "Invalid credentials"
            };
        }
        var claims = new List<Claim>
        {
            new Claim("fullName", user.FullName.ToString()),
            new Claim(ClaimTypes.Name, user.Email), 
        };
        var identity = new ClaimsIdentity(claims, "Cookies");
        var principal = new ClaimsPrincipal(identity);
       
        await _httpContextAccessor.HttpContext.SignInAsync("Cookies", principal);

        return new ApiResponseDto<LoginRequestDto>
        {
            Success = true,
            Message = "User logged in successfully.",
             Data = dto
        };
    }

    public async Task<ApiResponseDto<string>> LogOut(HttpContext httpContext)
    {
        await _httpContextAccessor.HttpContext.SignOutAsync("Cookies");

        return new ApiResponseDto<string>
        {
            Success = true,
            Message = "User logged out successfully."

        };
    }
}
