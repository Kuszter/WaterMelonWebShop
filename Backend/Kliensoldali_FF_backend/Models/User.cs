using System.ComponentModel.DataAnnotations;

namespace Kliensoldali_FF_backend.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        
        public bool isAdmin { get; set; }

        public string Provider { get; set; }
        public string ProviderUserId { get; set; }
    }
}
