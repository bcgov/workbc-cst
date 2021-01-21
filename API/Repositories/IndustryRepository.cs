using System.Collections.Generic;
using System.Linq;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class IndustryRepository : IIndustryRepository
    {
        private readonly IIndustryContext _context;

        public IndustryRepository(IIndustryContext dbContext)
        {
            _context = dbContext;
        }

        public List<Industry> GetIndustries()
        {
            if (_context.IsSQLServer)
                return _context.Industries.ToList();
            
            return ContextHelper.GetPlaceHolderData<Industry>("SampleJsonFiles/industries.json");
        }
    }
}