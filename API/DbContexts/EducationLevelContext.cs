using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class EducationLevelContext : DbContext, IEducationLevelContext
    {
        public DbContext Instance => this;
        public DbSet<EducationLevel> EducationLevels { get; set; }

        public EducationLevelContext(DbContextOptions<EducationLevelContext> options)
            : base(options)
        {
        }
    }
}
