using System.Collections.Generic;

namespace web2020januarB.Models
{
    public class Biblioteka
    {
        public int Id {get; set;}
        public string Ime { get; set; }
        public List<Polica> Police {get; set;}
    }
}