using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web2020januarA.Models;

namespace web2020januarA.Controllers
{
    [Route("api/pekara")]
    [ApiController]
    public class PekaraController
    {
        private PekaraDbContext dbcontext;
        public PekaraController(PekaraDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public List<Fabrika> fabriciranje()
        {
            return dbcontext.Fabrike.Include(x => x.Silosi).ToList();
        }

        [HttpPost]
        public Silos fabriciranje2([FromForm]int id, [FromForm]int inkrement)
        {
            var silos = dbcontext.Silosi.FirstOrDefault(x => x.Id == id);

            silos.TrenKolicina += inkrement;

            dbcontext.SaveChanges();
            return silos;
        }
    }
}