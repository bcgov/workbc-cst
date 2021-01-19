using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationRepository : IOccupationRepository
    {
        private IOccupationContext _context;

        //private readonly OccupationContext _context;
        private IWorkExperienceContext _workExperienceContext;
        private ISalaryContext _salaryRangeContext;
        private IEducationLevelContext _educationLevelContext;
        private IOccupationMatchContext _occupationMatchContext;
        private ISimilarityContext _similarityContext;

        public OccupationRepository(IOccupationContext dbContext,
            IWorkExperienceContext workExperienceContext, 
            ISalaryContext salaryRangeContext,
            IEducationLevelContext educationLevelContext,
            IOccupationMatchContext occupationMatchContext,
            ISimilarityContext similarityContext
            )
        {
            _context = dbContext;
            _workExperienceContext = workExperienceContext;
            _salaryRangeContext = salaryRangeContext;
            _educationLevelContext = educationLevelContext;
            _occupationMatchContext = occupationMatchContext;
            _similarityContext = similarityContext;
        }

        public List<Occupation> GetOccupations(string NOC,
            int? similarityId,
            int? educationLevelId,
            int? salaryId,
            int? workExperienceId)
        {
            if (NOC != null)
            {
                return FindMatchingOccupations(NOC, similarityId, educationLevelId, salaryId, workExperienceId);
            }
            else
            {
                return GetOccupationsPrivate(false, NOC);
            }
        }

        private List<Occupation> GetOccupationsPrivate(bool returnMatches, string NOC)
        {
            if (_context.IsSQLServer)
            {
                //Get WorkExperiences Lookup List
                List<Occupation> occupations = _context.Occupations.ToList();
                if(!string.IsNullOrEmpty(NOC))
                    occupations = occupations.FindAll(x => x.NOC == NOC);
                List<WorkExperience> localWorkExperiencesList = _workExperienceContext.WorkExperiences.ToList();
                List<Salary> localSalaryRangesList = _salaryRangeContext.Salaries.ToList();
                List<EducationLevel> localEducationLevelsList = _educationLevelContext.EducationLevels.ToList();
                List<Similarity> localSimilaritiesList = _similarityContext.Similarities.ToList();

                foreach (var occupation in occupations)
                {
                    occupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == occupation.WorkExperienceId).FirstOrDefault();
                    occupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == occupation.SalaryRangeId).FirstOrDefault();
                    occupation.Education = localEducationLevelsList.FindAll(x => x.Id == occupation.EducationId).FirstOrDefault();
                    var occupationId = new SqlParameter("occupationId", occupation.Id);

                    List<OccupationMatch> localOccupationMatchesList = _occupationMatchContext.FromSQLRaw(@"select 
	                        MatchedOccupation.Id,
	                        OM.SimilarityId,
	                        MatchedOccupation.NOC,
	                        MatchedOccupation.Title,
	                        MatchedOccupation.EducationId,
	                        MatchedOccupation.WorkExperienceId,
	                        MatchedOccupation.Income,
	                        MatchedOccupation.SalaryRangeId
                        from OccupationMatches OM
                        inner join Occupations MatchedOccupation on OM.MatchedOccupationId = MatchedOccupation.Id
                        where 
	                        OM.CurrentOccupationId = @occupationId
                            and OM.MatchedOccupationId <> @occupationId
                        order by OM.SimilarityId desc", occupationId).ToList();

                    foreach (var matchedOccupation in localOccupationMatchesList)
                    {
                        matchedOccupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == matchedOccupation.WorkExperienceId).FirstOrDefault();
                        matchedOccupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == matchedOccupation.SalaryRangeId).FirstOrDefault();
                        matchedOccupation.Education = localEducationLevelsList.FindAll(x => x.Id == matchedOccupation.EducationId).FirstOrDefault();
                        matchedOccupation.Similarity = localSimilaritiesList.FindAll(x => x.Id == matchedOccupation.SimilarityId).FirstOrDefault();
                    }
                    occupation.OccupationMatches = localOccupationMatchesList;
                }
                return _context.Occupations.ToList();
            }
            else
            {
                List<Occupation> occupations;
                if (!returnMatches)
                {
                    occupations = new List<Occupation>(){
                new Occupation() {
                    Id = 1,
                    NOC = "0011",
                    Title = "Legislators",
                    EducationId = 4,
                    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    WorkExperienceId = 4,
                    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    Income = "59,545",
                    SalaryRangeId = 2,
                    SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
                }
                };
                }
                else
                {
                    occupations = new List<Occupation>(){
                new Occupation() {
                    Id = 1,
                    NOC = "0011",
                    Title = "Legislators",
                    EducationId = 4,
                    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    WorkExperienceId = 4,
                    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    Income = "59,545",
                    SalaryRangeId = 2,
                    SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"},
                    OccupationMatches = new List<OccupationMatch>()
                    {
                        new OccupationMatch()
                        {
                            Id = 2,
                            SimilarityId = 3,
                            Similarity = new Similarity(){Id = 3, Value = "High"},
                            NOC = "0012",
                            Title = "Senior government managers and officials",
                            EducationId = 4,
                            Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                            WorkExperienceId = 4,
                            WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                            Income = "108,727",
                            SalaryRangeId = 5,
                            SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
                        },
                        new OccupationMatch()
                        {
                            Id = 3,
                            SimilarityId = 3,
                            Similarity = new Similarity(){Id = 3, Value = "High"},
                            NOC = "0013",
                            Title = "Senior managers - financial, communications and other business services",
                            EducationId = 4,
                            Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                            WorkExperienceId = 4,
                            WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                            Income = "119,882",
                            SalaryRangeId = 5,
                            SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
                        },
                        new OccupationMatch()
                        {
                            Id = 4,
                            SimilarityId = 3,
                            Similarity = new Similarity(){Id = 3, Value = "High"},
                            NOC = "0014",
                            Title = "Senior managers - health, education, social and community services and membership organizations",
                            EducationId = 4,
                            Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                            WorkExperienceId = 3,
                            WorkExperience = new WorkExperience(){ Id = 3, Value = "> 1 year to 4 years" },
                            Income = "96,077",
                            SalaryRangeId = 4,
                            SalaryRange = new Salary(){ Id = 4, Value = "$80k-$100k"}
                        },
                        new OccupationMatch()
                        {
                            Id = 14,
                            SimilarityId = 3,
                            Similarity = new Similarity(){Id = 3, Value = "High"},
                            NOC = "0125",
                            Title = "Other business services managers",
                            EducationId = 3,
                            Education = new EducationLevel(){ Id = 3, Value = "Diploma/Certificate" },
                            WorkExperienceId = 4,
                            WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                            Income = "59,114",
                            SalaryRangeId = 2,
                            SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
                        }
                    }
                }
                };
                }
                return occupations;
            }
        }

        private List<Occupation> FindMatchingOccupations(
            string NOC,
            int? similarityId,
            int? educationLevelId,
            int? salaryId,
            int? workExperienceId
            )
        {
            var occupations = GetOccupationsPrivate(true, NOC);
            occupations = occupations.FindAll(x => x.NOC == NOC);
            if (similarityId != null)
            {
                occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Similarity.Id == similarityId);
            }
            if (educationLevelId != null)
            {
                occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Education.Id == educationLevelId);
            }
            if (workExperienceId != null)
            {
                occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.WorkExperience.Id == workExperienceId);
            }

            return occupations;

        }
    }
}
