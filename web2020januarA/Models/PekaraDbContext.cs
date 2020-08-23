using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace web2020januarA.Models
{
    public class PekaraDbContext : DbContext
    {
        public PekaraDbContext(DbContextOptions<PekaraDbContext> options) : base(options)
        {

        }

        public DbSet<Fabrika> Fabrike { get; set; }
        public DbSet<Silos> Silosi { get; set; }

    }

    public class Fabrika
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public ICollection<Silos> Silosi { get; set; }
    }

    public class Silos
    {
        [Key]
        public int Id { get; set; }
        public string Oznaka { get; set; }

        public int Kapacitet { get; set; }
        public int TrenKolicina { get; set; }
        [ForeignKey("Fabrika")]
        public int FabrikaId { get; set; }
        public Fabrika Fabrika { get; set; }
    }
}