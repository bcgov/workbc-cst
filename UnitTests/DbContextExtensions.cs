using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPITests
{
    public static class DbContextExtensions
    {
        public static void Seed(this EducationLevelContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.EducationLevels.AddRange(new EducationLevel
            {
                Id = 1,
                Value = "Less than High School"
            }, new EducationLevel
            {
                Id = 2,
                Value = "High School"
            }, new EducationLevel
            {
                Id = 3,
                Value = "Diploma/Certificate"
            }, new EducationLevel
            {
                Id = 4,
                Value = "Degree"
            });

            dbContext.SaveChanges();
        }

        //public static void Seed(this WorkExperienceContext dbContext)
        //{
        //    // Add entities for DbContext instance
        //    dbContext.WorkExperiences.AddRange(new WorkExperience[] {
        //        new WorkExperience() {
        //                Id = 1,
        //                Value = "None"
        //            },
        //            new WorkExperience() {
        //                Id = 2,
        //                Value = "< 1 year"
        //            },
        //            new WorkExperience() {
        //                Id = 3,
        //                Value = "> 1 year to 4 years"
        //            },
        //            new WorkExperience() {
        //                Id = 4,
        //                Value = "> 4 years to 10 years"
        //            }
        //    });

        //    dbContext.SaveChanges();
        //}

        public static void Seed(this OccupationListItemContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.OccupationListItems.AddRange(new OccupationListItem[] {
                 new OccupationListItem() {
                    Id = 1,
                    NOC = "0011",
                    NOCAndTitle = "0011 - Legislators"
                },
                new OccupationListItem() {
                    Id = 2,
                    NOC = "0012",
                    NOCAndTitle = "0012 - Senior government managers and officials"
                },
                new OccupationListItem() {
                    Id = 3,
                    NOC = "0013",
                    NOCAndTitle = "0013 - Senior managers - financial, communications and other business services"
                }
            });

            dbContext.SaveChanges();
        }

        public static void Seed(this OccupationContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.Occupations.AddRange(new Occupation[] {
                 new Occupation() {
                    Id = 1,
                    NOC = "0011",
                    Title = "Legislators",
                    //EducationId = 4,
                    //Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    //WorkExperienceId = 4,
                    //WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    Income = "59,545",
                    //SalaryRangeId = 2,
                    //SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"},
                    //OccupationMatches = new List<OccupationMatch>()
                    //{
                    //    new OccupationMatch()
                    //    {
                    //        Id = 2,
                    //        SimilarityId = 3,
                    //        Similarity = new Similarity(){Id = 3, Value = "High"},
                    //        NOC = "0012",
                    //        Title = "Senior government managers and officials",
                    //        EducationId = 4,
                    //        //Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    //        WorkExperienceId = 4,
                    //        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    //        Income = "108,727",
                    //        SalaryRangeId = 5,
                    //        SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
                    //    },
                    //    new OccupationMatch()
                    //    {
                    //        Id = 3,
                    //        SimilarityId = 3,
                    //        Similarity = new Similarity(){Id = 3, Value = "High"},
                    //        NOC = "0013",
                    //        Title = "Senior managers - financial, communications and other business services",
                    //        EducationId = 4,
                    //        //Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    //        WorkExperienceId = 4,
                    //        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    //        Income = "119,882",
                    //        SalaryRangeId = 5,
                    //        SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
                    //    },
                    //    new OccupationMatch()
                    //    {
                    //        Id = 4,
                    //        SimilarityId = 3,
                    //        Similarity = new Similarity(){Id = 3, Value = "High"},
                    //        NOC = "0014",
                    //        Title = "Senior managers - health, education, social and community services and membership organizations",
                    //        EducationId = 4,
                    //        //Education = new EducationLevel(){ Id = 4, Value = "Degree" },
                    //        WorkExperienceId = 3,
                    //        WorkExperience = new WorkExperience(){ Id = 3, Value = "> 1 year to 4 years" },
                    //        Income = "96,077",
                    //        SalaryRangeId = 4,
                    //        SalaryRange = new Salary(){ Id = 4, Value = "$80k-$100k"}
                    //    },
                    //    new OccupationMatch()
                    //    {
                    //        Id = 14,
                    //        SimilarityId = 3,
                    //        Similarity = new Similarity(){Id = 3, Value = "High"},
                    //        NOC = "0125",
                    //        Title = "Other business services managers",
                    //        EducationId = 3,
                    //        //Education = new EducationLevel(){ Id = 3, Value = "Diploma/Certificate" },
                    //        WorkExperienceId = 4,
                    //        WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
                    //        Income = "59,114",
                    //        SalaryRangeId = 2,
                    //        SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
                    //    }
                    //}
                }
            });

            dbContext.SaveChanges();
        }
    }
}
