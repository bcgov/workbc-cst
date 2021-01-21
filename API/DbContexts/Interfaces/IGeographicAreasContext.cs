using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IGeographicAreasContext : IDbContext
    {
        DbSet<GeographicArea> GeographicAreas { get; set; }
    }
}