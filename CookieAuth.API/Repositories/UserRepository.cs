using CookieAuth.API.Data;
using CookieAuth.API.Entities;
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public User GetUserByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    public void AddUser(User user)
    {
        _context.Users.Add(user);
    }
    public void SaveChanges()
    {
        _context.SaveChanges();
    }
}
