using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public interface IWorkExperienceContext : IDbContext
    {
        DbSet<WorkExperience> WorkExperiences { get; set; }
        DbContext Instance { get; }
    }
}