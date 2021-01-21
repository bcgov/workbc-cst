using System.Collections.Generic;
using System.Linq;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationalInterestsRepository : IOccupationalInterestsRepository
    {
        private readonly IOccupationalInterestContext _context;

        public OccupationalInterestsRepository(IOccupationalInterestContext dbContext)
        {
            _context = dbContext;
        }

        public List<OccupationalInterest> GetOccupationalInterests()
        {
            if (_context.IsSQLServer)
                return _context.OccupationalInterests
                    .Where(o => !string.IsNullOrWhiteSpace(o.Value))
                    .ToList();

            return ContextHelper.GetPlaceHolderData<OccupationalInterest>("SampleJsonFiles/occupationinterests.json");
        }
    }
}