using Microsoft.EntityFrameworkCore;

namespace web2020januarB.Models
{
    public class BibliotekaDbContext : DbContext
    {
        public BibliotekaDbContext(DbContextOptions<BibliotekaDbContext> options) : base(options)
        {
                
        }

        public DbSet<Biblioteka> Bibliotekas { get; set; }
        public DbSet<Polica> Policas { get; set; }

    }
}