using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationListItemsController : ApiControllerBase
    {
        public OccupationListItemsController()
        {
        }

        // GET: api/OccupationListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItems([FromQuery] string partialNocOrTitle)
        {
            var placeHolderData = GetPlaceHolderData<OccupationListItem>("SampleJsonFiles/occupationlistitems.json");
            return placeHolderData;
        }
    }
}
