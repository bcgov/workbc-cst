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
    public class OccupationListItemsController : ApiControllerBase
    {
        private readonly IOccupationContext _context;
        private readonly IOccupationRepository _repository;

        public OccupationListItemsController(OccupationContext context, OccupationalGroupContext groupContext)
        {
            _context = context;
            _repository = new OccupationRepository(context, groupContext);
        }

        // GET: api/OccupationListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItems([FromQuery] OccupationSearchFilter filter)
        {
            return _repository.GetOccupations(filter);
        }
    }
}
