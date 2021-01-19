using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IndustriesController : ApiControllerBase
    {
        public IndustriesController()
        {
        }

        // GET: api/Industries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Industry>>> GetIndustries()
        {
            var placeHolderData = GetPlaceHolderData<Industry>("SampleJsonFiles/industries.json");
            return placeHolderData;
        }
    }
}
