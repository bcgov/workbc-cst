using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            {
                var industries = _context.Industries
                    .AsNoTracking()
                    .Include(i => i.SubIndustries)
                    .OrderBy(i => i.Value)
                    .ToList();

                // Don't return any single sub-category categories
                foreach (var industry in industries.Where(industry => industry.SubIndustries.Count == 1))
                    industry.SubIndustries.Clear();

                return industries;
            }

            return ContextHelper.GetPlaceHolderData<Industry>("SampleJsonFiles/industries.json");
        }
    }
}