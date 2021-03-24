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
    public class GeographicAreasController : ApiControllerBase
    {
        private readonly IGeographicAreasRepository _repository;

        public GeographicAreasController(GeographicAreasContext context)
        {
            _repository = new GeographicAreasRepository(context);
        }

        // GET: api/GeographicAreas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeographicArea>>> GetGeographicAreas()
        {
            return _repository.GetGeographicAreas();
        }
    }
}
