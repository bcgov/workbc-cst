using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IEducationLevelContext : IDbContext
    {
        DbSet<EducationLevel> EducationLevels { get; set; }
    }
}