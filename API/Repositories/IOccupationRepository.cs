using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IOccupationRepository
    {
        List<Occupation> GetOccupations(string NOC, int? similarityId, int? educationLevelId, int? salaryId, int? workExperienceId);
        List<Occupation> GetNocList(string nocs);
    }
}