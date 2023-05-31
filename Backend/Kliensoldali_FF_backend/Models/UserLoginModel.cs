using System.ComponentModel.DataAnnotations;

namespace Kliensoldali_FF_backend.Models
{
    public class UserLoginModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
