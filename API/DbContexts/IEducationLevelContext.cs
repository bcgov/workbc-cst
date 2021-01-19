using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public interface IEducationLevelContext : IDbContext
    {
        DbSet<EducationLevel> EducationLevels { get; set; }
        Microsoft.EntityFrameworkCore.DbContext Instance { get; }
    }
}