using Kliensoldali_FF_backend.Models;

using System.Text;

namespace Kliensoldali_FF_backend.Data
{
    public static class SeedData
    {
        public static void Initialize(WebshopDbContext context)
        {
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product
                    {
                        Name = "Alma",
                        Description = "Egy gyümölcs",
                        Price = 1000,
                        Id = new Guid(),
                        ImageUrl = "https://5.imimg.com/data5/WA/NV/LI/SELLER-52971039/apple-indian-500x500.jpg",
                     
                    },
                    new Product
                    {
                        Id = new Guid(),
                        Name = "Guitar",
                        Description = "Egy hangszer",
                        Price = 2000,
                     
                        ImageUrl = "https://i.imgur.com/8NMIv2M.jpeg",


                    },
                    new Product
                    {
                        Id = new Guid(),
                        Name = "Headset",
                        Description = "Egy kütyü",
                        Price = 2000,

                        ImageUrl = "https://i.imgur.com/lyQhVQe.jpeg",


                    }
                );
            }

            // Ellenőrizze, hogy már vannak-e kategóriák az adatbázisban
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category
                    {
                        Id = new Guid(),
                        Name = "Gyümölcs",
                        ImageUrl = "https://cdn.metro-online.com/-/media/Project/MCW/HU_Metro/Images/Elelmiszerek/termekeink/gyumolcsok_og.png?rev=0109bc22c0a04fd68afe965d09e99210"
                    },
                    new Category
                    {
                        Id = new Guid(),
                        Name = "Hangszer",
                        ImageUrl = "https://media.istockphoto.com/id/1224225082/photo/acoustic-guitar-on-the-background-of-a-recording-studio-room-for-musicians-rehearsals-the.jpg?b=1&s=170667a&w=0&k=20&c=FB3qcDsd53_kqr8OBco_l-P7SI3yzur1LgeFpLyPDNw="
                    },
                     new Category
                     {
                         Id = new Guid(),
                         Name = "Kütyü",
                         ImageUrl = "https://euc.ac.cy/wp-content/uploads/2019/07/students-must-have-gadget-list.jpg"
                     }
                );
                if (!context.Users.Any())
                {
                    context.Users.Add(
                        new User
                        {
                            Id = Guid.Parse("96c6671a-d301-408b-a3c1-84e03ed239cd"),
                            UserName = "kusztosdavid@gmail.com",
                            Email = "kusztosdavid@gmail.com",
                            PasswordHash = "AQAAAAEAACcQAAAAENIbbvHh3cQplEVt/xbSIjnpyIc6SG5Lg0k0eAvUVneCMafN42YAFC9ka4pIiTGG6Q==",
                            FirstName = "Dávid",
                            LastName = "Kusztos",
                            isAdmin = true,
                            Provider = "",
                            ProviderUserId = ""
                        }
                    );
                }


                // Mentsük el a változásokat
                context.SaveChanges();
            }


           
        }
        
    }
}
