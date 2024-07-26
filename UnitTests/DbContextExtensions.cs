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
                Id = 0,
                Value = "Management"
            }, new EducationLevel
            {
                Id = 1,
                Value = "University Degree"
            }, new EducationLevel
            {
                Id = 2,
                Value = "College Diploma or Apprenticeship, 2 or more years"
            }, new EducationLevel
            {
                Id = 3,
                Value = "College Diploma or Apprenticeship, less than 2 years"
            }, new EducationLevel
            {
                Id = 4,
                Value = "High School Diploma"
            }, new EducationLevel
            {
                Id = 5,
                Value = "No Formal Education"
            });

            dbContext.SaveChanges();
        }

        public static void Seed(this OccupationContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.Occupations.AddRange(new Occupation[] {
                 new Occupation() {
                    Id = 1,
                    NOC = "00010",
                    Title = "Legislators",
                    Income = "76000",
                }
            });

            dbContext.SaveChanges();
        }
    }
}
