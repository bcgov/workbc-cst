using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IWorkExperienceRepository
    {
        List<WorkExperience> GetWorkExperiences();
    }
}