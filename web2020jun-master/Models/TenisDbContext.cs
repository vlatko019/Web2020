using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace web2020jun.Models
{
    public class TenisDbContext : DbContext
    {
        public TenisDbContext(DbContextOptions<TenisDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Mec> Mecevi { get; set; }
        public DbSet<Igrac> Igraci { get; set; }
    }

    public class Mec
    {
        [Key]
        public int Id { get; set; }

        public DateTime Vreme { get; set; } = DateTime.Now;
        public string Lokacija { get; set; }

        public int Rezultat11 { get; set; }//igrac 1 set 1
        public int Rezultat12 { get; set; }//igrac 1 set 2
        public int Rezultat21 { get; set; }//...
        public int Rezultat22 { get; set; }

        [ForeignKey("Igrac1")]
        public int Igrac1Id { get; set; }

        [ForeignKey("Igrac2")]
        public int Igrac2Id { get; set; }

        public Igrac Igrac1 { get; set; }
        public Igrac Igrac2 { get; set; }
    }

    public class Igrac
    {
        [Key]
        public int Id { get; set; }
        public string Ime { get; set; }
        public int Godine { get; set; }
        public int Rang { get; set; }
        public string Slika { get; set; }
    }
}
