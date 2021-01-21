using System.Collections.Generic;
using System.Text.Json;
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
    public class OccupationalGroupsController : ApiControllerBase
    {
        private readonly IOccupationalGroupContext _context;
        private readonly OccupationalGroupsRepository _repository;

        public OccupationalGroupsController(OccupationalGroupContext context)
        {
            _context = context;
            _repository = new OccupationalGroupsRepository(context);
        }

        // GET: api/OccupationalGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationalGroup>>> GetOccupationalGroups()
        {
            return _repository.GetOccupationalGroups();
        }
    }
}
