using System;
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
        private readonly AnnualSalaryRepository _salaryRepository;

        public OccupationRepository(IOccupationContext context)
        {
            _context = context;
            _salaryRepository = new AnnualSalaryRepository();
        }

        public List<OccupationListItem> GetOccupations(OccupationSearchFilter filter)
        {
            if (!_context.IsSQLServer)
                return ContextHelper.GetPlaceHolderData<OccupationListItem>("SampleJsonFiles/occupationlistitems.json");


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
            {
                occupations = occupations.Where(o => o.OccupationInterests.Any(og => og.OccupationalInterest.Id == filter.OccupationalInterestId));
            }

            if (filter.OccupationalGroupId > 0)
            {
                occupations = occupations.Where(o => o.OccupationalGroups.Any(og => og.OccupationalGroup.Id == filter.OccupationalGroupId));
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
                occ = occ.Where(o => o.GeographicArea.Id == filter.GeographicAreaId.Value);

            if (filter.IndustryId > 0)
                occ = occ.Where(o => o.Industry.Id == filter.IndustryId.Value);

            return occ.Sum(o => o.JobOpenings);
                
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
                .Take(3) // Limit to three nocs
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

        //    private IOccupationContext _context;

        //    //private readonly OccupationContext _context;
        //    private IWorkExperienceContext _workExperienceContext;
        //    private ISalaryContext _salaryRangeContext;
        //    private IEducationLevelContext _educationLevelContext;
        //    private IOccupationMatchContext _occupationMatchContext;
        //    private ISimilarityContext _similarityContext;

        //    public OccupationRepository(IOccupationContext dbContext,
        //        IWorkExperienceContext workExperienceContext, 
        //        ISalaryContext salaryRangeContext,
        //        IEducationLevelContext educationLevelContext,
        //        IOccupationMatchContext occupationMatchContext,
        //        ISimilarityContext similarityContext
        //        )
        //    {
        //        _context = dbContext;
        //        _workExperienceContext = workExperienceContext;
        //        _salaryRangeContext = salaryRangeContext;
        //        _educationLevelContext = educationLevelContext;
        //        _occupationMatchContext = occupationMatchContext;
        //        _similarityContext = similarityContext;
        //    }

        //    public List<Occupation> GetOccupations(string NOC,
        //        int? similarityId,
        //        int? educationLevelId,
        //        int? salaryId,
        //        int? workExperienceId)
        //    {
        //        if (NOC != null)
        //        {
        //            return FindMatchingOccupations(NOC, similarityId, educationLevelId, salaryId, workExperienceId);
        //        }
        //        else
        //        {
        //            return GetOccupationsPrivate(false, NOC);
        //        }
        //    }

        //    private List<Occupation> GetOccupationsPrivate(bool returnMatches, string NOC)
        //    {
        //        if (_context.IsSQLServer)
        //        {
        //            //Get WorkExperiences Lookup List
        //            List<Occupation> occupations = _context.Occupations.ToList();
        //            if(!string.IsNullOrEmpty(NOC))
        //                occupations = occupations.FindAll(x => x.NOC == NOC);
        //            List<WorkExperience> localWorkExperiencesList = _workExperienceContext.WorkExperiences.ToList();
        //            List<Salary> localSalaryRangesList = _salaryRangeContext.Salaries.ToList();
        //            List<EducationLevel> localEducationLevelsList = _educationLevelContext.EducationLevels.ToList();
        //            List<Similarity> localSimilaritiesList = _similarityContext.Similarities.ToList();

        //            foreach (var occupation in occupations)
        //            {
        //                occupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == occupation.WorkExperienceId).FirstOrDefault();
        //                occupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == occupation.SalaryRangeId).FirstOrDefault();
        //                occupation.Education = localEducationLevelsList.FindAll(x => x.Id == occupation.EducationId).FirstOrDefault();
        //                var occupationId = new SqlParameter("occupationId", occupation.Id);

        //                List<OccupationMatch> localOccupationMatchesList = _occupationMatchContext.FromSQLRaw(@"select 
        //                     MatchedOccupation.Id,
        //                     OM.SimilarityId,
        //                     MatchedOccupation.NOC,
        //                     MatchedOccupation.Title,
        //                     MatchedOccupation.EducationId,
        //                     MatchedOccupation.WorkExperienceId,
        //                     MatchedOccupation.Income,
        //                     MatchedOccupation.SalaryRangeId
        //                    from OccupationMatches OM
        //                    inner join Occupations MatchedOccupation on OM.MatchedOccupationId = MatchedOccupation.Id
        //                    where 
        //                     OM.CurrentOccupationId = @occupationId
        //                        and OM.MatchedOccupationId <> @occupationId
        //                    order by OM.SimilarityId desc", occupationId).ToList();

        //                foreach (var matchedOccupation in localOccupationMatchesList)
        //                {
        //                    matchedOccupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == matchedOccupation.WorkExperienceId).FirstOrDefault();
        //                    matchedOccupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == matchedOccupation.SalaryRangeId).FirstOrDefault();
        //                    matchedOccupation.Education = localEducationLevelsList.FindAll(x => x.Id == matchedOccupation.EducationId).FirstOrDefault();
        //                    matchedOccupation.Similarity = localSimilaritiesList.FindAll(x => x.Id == matchedOccupation.SimilarityId).FirstOrDefault();
        //                }
        //                occupation.OccupationMatches = localOccupationMatchesList;
        //            }
        //            return _context.Occupations.ToList();
        //        }
        //        else
        //        {
        //            List<Occupation> occupations;
        //            if (!returnMatches)
        //            {
        //                occupations = new List<Occupation>(){
        //            new Occupation() {
        //                Id = 1,
        //                NOC = "0011",
        //                Title = "Legislators",
        //                EducationId = 4,
        //                Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                WorkExperienceId = 4,
        //                WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                Income = "59,545",
        //                SalaryRangeId = 2,
        //                SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
        //            }
        //            };
        //            }
        //            else
        //            {
        //                occupations = new List<Occupation>(){
        //            new Occupation() {
        //                Id = 1,
        //                NOC = "0011",
        //                Title = "Legislators",
        //                EducationId = 4,
        //                Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                WorkExperienceId = 4,
        //                WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                Income = "59,545",
        //                SalaryRangeId = 2,
        //                SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"},
        //                OccupationMatches = new List<OccupationMatch>()
        //                {
        //                    new OccupationMatch()
        //                    {
        //                        Id = 2,
        //                        SimilarityId = 3,
        //                        Similarity = new Similarity(){Id = 3, Value = "High"},
        //                        NOC = "0012",
        //                        Title = "Senior government managers and officials",
        //                        EducationId = 4,
        //                        Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                        WorkExperienceId = 4,
        //                        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                        Income = "108,727",
        //                        SalaryRangeId = 5,
        //                        SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
        //                    },
        //                    new OccupationMatch()
        //                    {
        //                        Id = 3,
        //                        SimilarityId = 3,
        //                        Similarity = new Similarity(){Id = 3, Value = "High"},
        //                        NOC = "0013",
        //                        Title = "Senior managers - financial, communications and other business services",
        //                        EducationId = 4,
        //                        Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                        WorkExperienceId = 4,
        //                        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                        Income = "119,882",
        //                        SalaryRangeId = 5,
        //                        SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
        //                    },
        //                    new OccupationMatch()
        //                    {
        //                        Id = 4,
        //                        SimilarityId = 3,
        //                        Similarity = new Similarity(){Id = 3, Value = "High"},
        //                        NOC = "0014",
        //                        Title = "Senior managers - health, education, social and community services and membership organizations",
        //                        EducationId = 4,
        //                        Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                        WorkExperienceId = 3,
        //                        WorkExperience = new WorkExperience(){ Id = 3, Value = "> 1 year to 4 years" },
        //                        Income = "96,077",
        //                        SalaryRangeId = 4,
        //                        SalaryRange = new Salary(){ Id = 4, Value = "$80k-$100k"}
        //                    },
        //                    new OccupationMatch()
        //                    {
        //                        Id = 14,
        //                        SimilarityId = 3,
        //                        Similarity = new Similarity(){Id = 3, Value = "High"},
        //                        NOC = "0125",
        //                        Title = "Other business services managers",
        //                        EducationId = 3,
        //                        Education = new EducationLevel(){ Id = 3, Value = "Diploma/Certificate" },
        //                        WorkExperienceId = 4,
        //                        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                        Income = "59,114",
        //                        SalaryRangeId = 2,
        //                        SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
        //                    }
        //                }
        //            }
        //            };
        //            }
        //            return occupations;
        //        }
        //    }

        //    private List<Occupation> FindMatchingOccupations(
        //        string NOC,
        //        int? similarityId,
        //        int? educationLevelId,
        //        int? salaryId,
        //        int? workExperienceId
        //        )
        //    {
        //        var occupations = GetOccupationsPrivate(true, NOC);
        //        occupations = occupations.FindAll(x => x.NOC == NOC);
        //        if (similarityId != null)
        //        {
        //            occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Similarity.Id == similarityId);
        //        }
        //        if (educationLevelId != null)
        //        {
        //            occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Education.Id == educationLevelId);
        //        }
        //        if (workExperienceId != null)
        //        {
        //            occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.WorkExperience.Id == workExperienceId);
        //        }

        //        return occupations;

        //    }
}

