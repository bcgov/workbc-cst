using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IEducationLevelRepository
    {
        List<EducationLevel> GetEducationLevels();
    }
}