using System.Collections.Generic;
using System.Linq;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class FullOrPartTimesRepository : IFullOrPartTimeRepository
    {
        private readonly IFullOrPartTimeContext _context;

        public FullOrPartTimesRepository(IFullOrPartTimeContext dbContext)
        {
            _context = dbContext;
        }

        public List<FullOrPartTime> GetFullOrPartTimes()
        {
            if (_context.IsSQLServer)
                return _context.FullOrPartTimes.ToList();

            return ContextHelper.GetPlaceHolderData<FullOrPartTime>("SampleJsonFiles/fullorparttime.json");
        }
    }
}