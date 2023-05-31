using Kliensoldali_FF_backend.Data;
using Kliensoldali_FF_backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Kliensoldali_FF_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly WebshopDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserController(WebshopDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<User>();
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(UserRegistration userRegistration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (userRegistration.Password != userRegistration.PasswordConfirm)
            {
                return BadRequest(new { message = "The passwords do not match." });
            }

            if (!string.IsNullOrEmpty(userRegistration.Provider) && !string.IsNullOrEmpty(userRegistration.ProviderUserId))
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Provider == userRegistration.Provider && u.ProviderUserId == userRegistration.ProviderUserId);

                if (existingUser != null)
                {
                    return Conflict(new { message = "This social account is already registered." });
                }

                userRegistration.User.Provider = userRegistration.Provider;
                userRegistration.User.ProviderUserId = userRegistration.ProviderUserId;
            }
            else
            {
                userRegistration.User.PasswordHash = _passwordHasher.HashPassword(userRegistration.User, userRegistration.Password);
            }

            _context.Users.Add(userRegistration.User);
            await _context.SaveChangesAsync();

            userRegistration.User.PasswordHash = null;

            return CreatedAtAction("GetUser", new { id = userRegistration.User.Id }, userRegistration.User);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserLoginModel userLogin)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userLogin.Username);

            if (user == null)
            {
                return NotFound();
            }

            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, userLogin.Password);

            if (passwordVerificationResult != PasswordVerificationResult.Success)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                 {
                new Claim(ClaimTypes.Name, user.Id.ToString()),
                new Claim("UserName", user.UserName),
                new Claim("isAdmin", user.isAdmin.ToString()),
                new Claim("Email", user.Email),
                new Claim("FirstName", user.FirstName),
                new Claim(ClaimTypes.Role, user.isAdmin ? "Admin" : "User"),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }


        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
