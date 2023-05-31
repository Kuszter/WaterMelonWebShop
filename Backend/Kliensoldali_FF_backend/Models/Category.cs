using System.ComponentModel.DataAnnotations;

namespace Kliensoldali_FF_backend.Models
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
