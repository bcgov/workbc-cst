using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class OccupationalGroupContext : DbContext, IOccupationalGroupContext
    {
        public DbContext Instance => this;
        public DbSet<OccupationalGroup> OccupationalGroups { get; set; }

        public OccupationalGroupContext(DbContextOptions<OccupationalGroupContext> options)
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