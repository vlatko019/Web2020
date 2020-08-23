using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace web2020januarB.Models
{
    public class Polica
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxKnjiga { get; set; }
        public int TrenutnoKnjiga { get; set; }
        [ForeignKey("Biblioteka")]
        public int BibliotekaId { get; set; }
        // public Biblioteka Biblioteka { get; set; }

    }
}