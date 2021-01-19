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
    public class GeographicAreasController : ApiControllerBase
    {
        public GeographicAreasController()
        {
        }

        // GET: api/GeographicAreas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeographicArea>>> GetGeographicAreas()
        {
            return GetPlaceHolderData<GeographicArea>("SampleJsonFiles/geographicareas.json");
        }
    }
}
