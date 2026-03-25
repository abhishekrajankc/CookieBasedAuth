namespace CookieAuth.API.DTOs
{
    public class SessionResponseDto
    {
        public bool IsAuthenticated { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
    }
}
