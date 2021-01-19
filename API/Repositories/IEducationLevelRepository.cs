using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IEducationLevelRepository
    {
        List<EducationLevel> GetEducationLevels();
    }
}