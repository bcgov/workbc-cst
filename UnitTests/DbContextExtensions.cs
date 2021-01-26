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

        public static void Seed(this OccupationContext dbContext)
        {
            // Add entities for DbContext instance
            dbContext.Occupations.AddRange(new Occupation[] {
                 new Occupation() {
                    Id = 1,
                    NOC = "0011",
                    Title = "Legislators",
                    Income = "59,545",
                }
            });

            dbContext.SaveChanges();
        }
    }
}
