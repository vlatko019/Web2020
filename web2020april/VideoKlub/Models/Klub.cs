using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VideoKlubModels
{

    public class Polica
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("VideoKlub")]
        public int VideoKlubId { get; set; }
        public string Name { get; set; }
        public int MaxDVD { get; set; }
        public int TrenutnoDVD { get; set; }
        public VideoKlub VideoKlub { get; set; }

    }

    public class VideoKlub
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Polica> Police { get; set; }

    }

    public class VideoKlubContext : DbContext
    {
        public VideoKlubContext(DbContextOptions<VideoKlubContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<VideoKlub> VideoKlubs { get; set; }
        public DbSet<Polica> Policas { get; set; }
    }
}
