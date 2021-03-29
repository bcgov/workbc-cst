using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class IndustryRepository : IIndustryRepository
    {
        private readonly IIndustryContext _context;
        
        private const string AllIndustriesTitle = "all";

        public IndustryRepository(IIndustryContext dbContext)
        {
            _context = dbContext;
        }

        public List<Industry> GetIndustries()
        {
            var industries = _context.Industries
                .AsNoTracking()
                .Include(i => i.SubIndustries)
                .Where(i => i.Value.ToLower() != AllIndustriesTitle)
                .OrderBy(i => i.SortOrder)
                .ThenBy(i => i.Value)
                .ToList();

            // Don't return any single sub-category categories
            foreach (var industry in industries.Where(industry => industry.SubIndustries.Count == 1))
                industry.SubIndustries.Clear();

            foreach (var industry in industries) { 
                var sorted = industry.SubIndustries
                    .OrderBy(si => si.SortOrder)
                    .ThenBy(si => si.Value);

                industry.SubIndustries = sorted.ToList();

            }
            return industries;
        }

        public int GetAllIndustriesId()
        {
            var allIndustry = _context.Industries
                .AsNoTracking()
                .FirstOrDefault(i => i.Value.ToLower() == AllIndustriesTitle);

            return allIndustry?.Id ?? 0;
        }
    }
}