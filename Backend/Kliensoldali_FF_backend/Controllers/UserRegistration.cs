using Kliensoldali_FF_backend.Models;

namespace Kliensoldali_FF_backend.Controllers
{
    public class UserRegistration
    {
        public User User { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public string Provider { get; set; }
        public string ProviderUserId { get; set; }
    }


}