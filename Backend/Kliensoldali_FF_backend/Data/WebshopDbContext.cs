
using Kliensoldali_FF_backend.Models;
using Microsoft.EntityFrameworkCore;



namespace Kliensoldali_FF_backend.Data
{
    public class WebshopDbContext:DbContext
    {

        public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }

        
       
    }

    
}
