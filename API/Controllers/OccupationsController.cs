using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OccupationsController : ApiControllerBase
    {
        public OccupationsController()
        {
        }

        // GET: api/Industries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string nocs)
        {
            var placeHolderData = GetPlaceHolderData<Occupation>("SampleJsonFiles/occupations.json");

            if (string.IsNullOrWhiteSpace(nocs))
                return placeHolderData;

            var nocList = nocs.Split(",");

            return placeHolderData.Where(o => nocList.Contains(o.NOC)).ToList();

        }
    }
}
