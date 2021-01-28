using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationRepository : IOccupationRepository
    {
        private readonly IOccupationContext _context;
        private readonly IOccupationalGroupRepository _occupationalGroupRepository;
        private readonly IIndustryContext _industryContext;

        public OccupationRepository(IOccupationContext context, IOccupationalGroupContext occupationalGroupContext, IIndustryContext industryContext)
        {
            _context = context;
            _occupationalGroupRepository = new OccupationalGroupsRepository(occupationalGroupContext);
            _industryContext = industryContext;
        }

        public List<OccupationListItem> GetOccupations(OccupationSearchFilter filter)
        {
            //if (!_context.IsSQLServer)
            //    return ContextHelper.GetPlaceHolderData<OccupationListItem>("SampleJsonFiles/occupationlistitems.json");
            if (!_context.IsSQLServer)
            {
                var source = ContextHelper.GetPlaceHolderData<Occupation>("SampleJsonFiles/occupations-source.json").AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.Keywords))
                    source = source.Where(o => o.NOC.Contains(filter.Keywords) || o.Title.Contains(filter.Keywords));

                if (filter.EducationLevelId > 0)
                {
                    if (filter.EducationLevelId == 1)
                        source = source.Where(e => e.Education.Value == "Degree");
                    if (filter.EducationLevelId == 2)
                        source = source.Where(e => e.Education.Value == "Diploma/Certificate");
                    if (filter.EducationLevelId == 3)
                        source = source.Where(e => e.Education.Value == "High School");
                    if (filter.EducationLevelId == 4)
                        source = source.Where(e => e.Education.Value == "Less than High School");
                }

                var occupationsFiltered = source.Select(s => new OccupationListItem
                {
                    Id = s.Id,
                    NOC = s.NOC,
                    NOCAndTitle = $"{s.Title} ({s.NOC})",
                    JobOpenings = s.JobOpenings
                });
                return occupationsFiltered.ToList(); 
            }

            // Might have performance issues with these includes for unfiltered datasets.
            var occupations = _context.NOCs
                .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.GeographicArea)
                .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.Industry)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Keywords))
            {
                // Bring in the common job titles for keyword query - slow for no keyword query
                occupations = occupations.Include(no => no.CommonJobTitles);
                occupations = occupations.Where(
                    o => o.NocCode.Contains(filter.Keywords) || o.Description.Contains(filter.Keywords) || o.CommonJobTitles.Any(cjt => cjt.JobTitle.Contains(filter.Keywords)));
            }

            if (filter.EducationLevelId > 0)
                occupations = occupations.Where(o => o.EducationLevel.Id == filter.EducationLevelId);

            if (filter.FullTimeOrPartTimeId > 0)
                occupations = occupations.Where(o => o.FullOrPartTime.Id == filter.FullTimeOrPartTimeId);

            if (filter.AnnualSalaryId > 0)
            {
                var salaryChoice = (AnnualSalaryValues)filter.AnnualSalaryId;

                switch (salaryChoice)
                {
                    case AnnualSalaryValues.LessThan20:
                        occupations = occupations.Where(o => o.MedianSalary < 20000);
                        break;
                    case AnnualSalaryValues.Between20And40:
                        occupations = occupations.Where(o => o.MedianSalary >= 20000 && o.MedianSalary < 40000);
                        break;
                    case AnnualSalaryValues.Between40And60:
                        occupations = occupations.Where(o => o.MedianSalary >= 40000 && o.MedianSalary < 60000);
                        break;
                    case AnnualSalaryValues.Between60And80:
                        occupations = occupations.Where(o => o.MedianSalary >= 60000 && o.MedianSalary < 80000);
                        break;
                    case AnnualSalaryValues.Between80And100:
                        occupations = occupations.Where(o => o.MedianSalary >= 80000 && o.MedianSalary < 100000);
                        break;
                    case AnnualSalaryValues.Between100And120:
                        occupations = occupations.Where(o => o.MedianSalary >= 100000 && o.MedianSalary < 120000);
                        break;
                    case AnnualSalaryValues.Between120And140:
                        occupations = occupations.Where(o => o.MedianSalary >= 120000 && o.MedianSalary < 140000);
                        break;
                    case AnnualSalaryValues.Over140:
                        occupations = occupations.Where(o => o.MedianSalary >= 140000);
                        break;
                }
            }

            // Is this the correct group to filter on?
            if (filter.GeographicAreaId > 0)
            {
                occupations = occupations
                    .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.GeographicArea);
                occupations = occupations.Where(o => o.JobOpenings.Any(jo => jo.GeographicArea.Id == filter.GeographicAreaId));
                // NOCOccupationGroup also has a Geographic Area. Do we filter?
            }

            if (filter.OccupationalInterestId > 0)
                occupations = occupations.Where(o => o.OccupationInterests.Any(og => og.OccupationalInterest.Id == filter.OccupationalInterestId));

            if (filter.OccupationalGroupId > 0)
            {
                var groupsFilter = new List<int> { filter.OccupationalGroupId.Value };
                var allGroup = _occupationalGroupRepository.GetAllOccupationalGroup();
                if (allGroup != null)
                    groupsFilter.Add(allGroup.Id);

                occupations = occupations.Where(o => o.OccupationalGroups.Any(og => groupsFilter.Contains(og.OccupationalGroup.Id)));
            }

            if (filter.IndustryId > 0)
            {
                occupations = occupations.Where(o => o.JobOpenings.Any(jo => jo.Industry.Id == filter.IndustryId));
                // Might need to filter industry on another sub query here.
            }

            return occupations.Select(o => new OccupationListItem
                {
                    Id = o.Id,
                    JobOpenings = JobOpenings(o, filter),  // This might not be filtered down correctly or reflecting filters that restrict it
                    NOC = o.NocCode,
                    NOCAndTitle = $"{o.Description} ({o.NocCode})",
                    //DebugInfo = $"Salary: {(o.MedianSalary.HasValue ? o.MedianSalary.Value.ToString("C0") : string.Empty)}"
                })
                .ToList();
        }

        private static int JobOpenings(NOC o, OccupationSearchFilter filter)
        {
            var occ = o.JobOpenings.AsQueryable();

            if (filter.GeographicAreaId > 0)
                occ = occ.Where(oi => oi.GeographicArea.Id == filter.GeographicAreaId.Value);

            if (filter.IndustryId > 0)
                occ = occ.Where(oi => oi.Industry.Id == filter.IndustryId.Value);

            return occ.Sum(oi => oi.JobOpenings);
                
        }

        public List<Occupation> GetNocList(string nocs)
        {
            if (!_context.IsSQLServer)
                return ContextHelper.GetPlaceHolderData<Occupation>("SampleJsonFiles/occupations.json");

            var nocIds = GetNocItems(nocs);
            if (!nocIds.Any())
                return new List<Occupation>();

            return _context.NOCs
                .Where(n => nocIds.Take(3).Contains(n.NocCode))
                .Take(3) // Limit to three NOCs
                .Select(o => new Occupation
                {
                    Id = o.Id,
                    NOC = o.NocCode,
                    Title = o.Description,
                    Education = o.EducationLevel,
                    Description = o.JobOverviewSummary,
                    Income = o.MedianSalary.HasValue ? o.MedianSalary.Value.ToString("C0") : string.Empty,
                    JobOpenings = o.JobOpenings.Sum(jo => jo.JobOpenings),
                })
                .ToList();
        }

        private List<string> GetNocItems(string nocs)
        {
            var nocItems = new List<string>();
            if (string.IsNullOrWhiteSpace(nocs))
                return nocItems;

            var parts = nocs.Split(",");
            if (!parts.Any())
                return nocItems;

            // Check each NOC is a number, but put the 0 padded number back in the list
            foreach (var item in parts)
            {
                if (!int.TryParse(item, out var b)) 
                    continue;
                
                if (b > 0)
                    nocItems.Add(b.ToString("D4"));
            }

            return nocItems
                .Distinct()
                .ToList();
        }
    }
}