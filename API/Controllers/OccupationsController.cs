using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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

        // GET: api/Occupation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string nocs)
        {
            return _repository.GetNocList(nocs);
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string nocs)
        //{
        //    var placeHolderData = GetPlaceHolderData<Occupation>("SampleJsonFiles/occupations.json");

        //    if (string.IsNullOrWhiteSpace(nocs))
        //        return placeHolderData;

        //    var nocList = nocs.Split(",");

        //    return placeHolderData.Where(o => nocList.Contains(o.NOC)).ToList();

        //}
    }
}
