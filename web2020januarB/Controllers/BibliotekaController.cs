using System.Net;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using web2020januarB.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace web2020januarB.Controllers
{
    [Route("/api/biblioteka")]
    [ApiController]
    public class BibliotekaController : ControllerBase
    {
        private BibliotekaDbContext _context;
        public BibliotekaController(BibliotekaDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<Biblioteka> GetAll()
        {
            return this._context.Bibliotekas.Include(x => x.Police);
        }

        [HttpPost]
        public async Task<Polica> Apdejt([FromForm]int id, [FromForm]int increment)
        {
            var polica = await this._context.Policas.FirstOrDefaultAsync(x => x.Id == id);
            if (polica.TrenutnoKnjiga + increment > polica.MaxKnjiga || polica.TrenutnoKnjiga + increment < 0)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
            else
            {
                polica.TrenutnoKnjiga += increment;
                await this._context.SaveChangesAsync();
            }

            return polica;
        }

    }
}