using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Filters;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationListItemsController : ApiControllerBase
    {
        private readonly IOccupationRepository _repository;

        public OccupationListItemsController(OccupationContext context, GeographicAreasContext geographicAreasContext)
        {
            _repository = new OccupationRepository(context, geographicAreasContext);
        }

        // GET: api/OccupationListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItemsAsync([FromQuery] OccupationSearchFilter filter)
        {
            return await _repository.GetOccupationsAsync(filter);
        }
    }
}
