using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IFullOrPartTimeContext : IDbContext
    {
        DbSet<FullOrPartTime> FullOrPartTimes { get; set; }
    }
}