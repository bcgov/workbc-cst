using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationalGroupContext : IDbContext
    {
        DbSet<OccupationalGroup> OccupationalGroups { get; set; }
    }
}