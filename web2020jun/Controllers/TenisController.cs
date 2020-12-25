using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web2020jun.Models;

namespace web2020jun.Controllers
{
    [Route("api/tenis")]
    [ApiController]
    public class TenisController : ControllerBase
    {
        private TenisDbContext context;
        public TenisController( TenisDbContext context)
        {
            this.context = context;
        }

        [HttpGet("svi")]
        public List<Mec> Svi()
        {
            return this.context.Mecevi.Include(x=>x.Igrac1).Include(x => x.Igrac2).ToList();
        }

        [HttpPost("update")]
        public Mec Update([FromForm]int id, [FromForm] int idIgraca)
        {
            Mec mec = this.context.Mecevi.FirstOrDefault(x => x.Id == id);

            if (mec.Igrac1Id == idIgraca)
            {
                if (mec.Rezultat11 == 6|| mec.Rezultat21 == 6)
                {
                    mec.Rezultat12++;
                }
                else
                {
                    mec.Rezultat11++;
                }
            }
            else
            {
                if (mec.Rezultat11 == 6 || mec.Rezultat21 == 6)
                {
                    mec.Rezultat22++;
                }
                else
                {
                    mec.Rezultat21++;
                }
            }

            this.context.SaveChanges();

            return mec;
        }
    }
}
