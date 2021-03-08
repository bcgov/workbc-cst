using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class OccupationalInterestContext : DbContext, IOccupationalInterestContext
    {
        public DbContext Instance => this;
        public DbSet<OccupationalInterest> OccupationalInterests { get; set; }

        public OccupationalInterestContext(DbContextOptions<OccupationalInterestContext> options)
            : base(options)
        {
        }
    }
}