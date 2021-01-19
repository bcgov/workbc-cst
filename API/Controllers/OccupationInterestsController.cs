using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationInterestsController : ApiControllerBase
    {
        public OccupationInterestsController()
        {
        }

        // GET: api/OccupationInterests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationInterest>>> GetOccupationInterests()
        {
            return GetPlaceHolderData<OccupationInterest>("SampleJsonFiles/occupationinterests.json");
        }
    }
}
