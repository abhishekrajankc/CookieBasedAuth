**Cookie-based authentication system built with ASP.NET Core Web API and Angular, featuring secure session handling and layered architecture.** <br>
A full-stack authentication system built using ASP.NET Core Web API and Angular, implementing secure cookie-based session authentication with a clean layered architecture.

**Features** <br>
1. User registration with secure password hashing (BCrypt) <br>
2. Login with cookie-based authentication <br>
3. Session persistence using HTTP-only cookies <br>
4. Protected APIs using [Authorize] <br>
5. Logout functionality <br>
6. Session validation endpoint <br>
7. Layered architecture (Controller → Service → Repository) <br>

**Architecture**<br>
Controller → Service → Repository → DbContext → Database <br>
Controller: Handles HTTP requests <br>
Service: Business logic <br>
Repository: Database interaction <br>

**Authentication Flow**<br>
1. User logs in with email & password <br>
2. Backend validates credentials <br>
3. Server creates a secure cookie <br>
4. Browser stores and sends cookie automatically <br>
5. Backend identifies user using claims <br>

**Backend**<br>
ASP.NET Core Web API (.NET 8)
Entity Framework Core
SQL Server (LocalDB)
Cookie Authentication<br>
**Frontend**<br>
Angular - V19
HttpClient (withCredentials enabled)
