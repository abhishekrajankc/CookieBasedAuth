using CookieAuth.API.Entities;

public interface IUserRepository
{
    User? GetUserByEmail(string email);
    void AddUser(User user);
    void SaveChanges();
}
