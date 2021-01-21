using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationalInterestContext : IDbContext
    {
        DbSet<OccupationalInterest> OccupationalInterests { get; set; }
    }
}