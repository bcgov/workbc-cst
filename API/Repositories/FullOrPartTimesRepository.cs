using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            var fullOrPartTimes = _context.FullOrPartTimes
                .AsNoTracking()
                .OrderByDescending(f => f.Value)
                .ToList();

            return fullOrPartTimes;
        }
    }
}