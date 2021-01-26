using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class IndustryContext : DbContext, IIndustryContext
    {
        public DbContext Instance => this;
        public DbSet<Industry> Industries { get; set; }

        public IndustryContext(DbContextOptions<IndustryContext> options)
            : base(options)
        {
        }

        public bool IsSQLServer
        {
            get => Database.IsSqlServer();
            set { return; }
        }
    }
}