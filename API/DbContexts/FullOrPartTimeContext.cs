using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class FullOrPartTimeContext : DbContext, IFullOrPartTimeContext
    {
        public DbContext Instance => this;
        public DbSet<FullOrPartTime> FullOrPartTimes { get; set; }

        public FullOrPartTimeContext(DbContextOptions<FullOrPartTimeContext> options)
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