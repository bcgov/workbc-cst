using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class OccupationContext : DbContext, IOccupationContext
    {
        public DbSet<JobOpening> JobOpenings { get; set; }
        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<NOC> NOCs { get; set; }
        public DbSet<CommonJobTitle> CommonJobTitles{ get; set; }
        
        public DbContext Instance => this;

        public OccupationContext(DbContextOptions<OccupationContext> options)
            : base(options)
        {
        }
    }
}
