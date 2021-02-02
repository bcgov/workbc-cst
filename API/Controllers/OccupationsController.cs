using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationsController : ApiControllerBase
    {
        private readonly IOccupationContext _context;
        private readonly IOccupationRepository _repository;

        public OccupationsController(OccupationContext context)
        {
            _context = context;
            _repository = new OccupationRepository(context);
        }

        // GET: api/Occupations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string nocs)
        {
            return _repository.GetNocList(nocs);
        }
    }
}
