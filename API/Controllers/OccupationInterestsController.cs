using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationInterestsController : ApiControllerBase
    {
        private readonly IOccupationalInterestContext _context;
        private readonly OccupationalInterestsRepository _repository;

        public OccupationInterestsController(OccupationalInterestContext context)
        {
            _context = context;
            _repository = new OccupationalInterestsRepository(context);
        }

        // GET: api/OccupationInterests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationalInterest>>> GetOccupationInterests()
        {
            return _repository.GetOccupationalInterests();
        }
    }
}
