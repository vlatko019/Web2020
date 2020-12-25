using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using VideoKlubModels;

namespace videoKlubApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoKlubController : ControllerBase
    {
        private readonly VideoKlubContext _context;

        public VideoKlubController(VideoKlubContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            return this._context.VideoKlubs.Include(v => v.Police).ToList();
        }

        [HttpPost]
        public IActionResult Post([FromForm] int id, [FromForm] int inc)
        {

            var p = _context.Policas.FirstOrDefault(p => p.Id == id);

            if (p == null)
            {
                return BadRequest();
            }

            p.TrenutnoDVD += inc;
            if (p.TrenutnoDVD > p.MaxDVD || p.TrenutnoDVD < 0)
            {
                return BadRequest();
            }
            _context.SaveChanges();
            return Ok(p);
        }
    }
}