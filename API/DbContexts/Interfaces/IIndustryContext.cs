using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IIndustryContext : IDbContext
    {
        DbSet<Industry> Industries { get; set; }
    }
}