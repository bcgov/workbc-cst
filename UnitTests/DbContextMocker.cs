using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;

namespace SearchAllOccupationsToolAPITests
{
    public static class DbContextMocker
    {
        public static EducationLevelContext GetEducationLevelContext(string dbName)
        {
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<EducationLevelContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Create instance of DbContext
            var dbContext = new EducationLevelContext(options);

            // Add entities in memory
            dbContext.Seed();

            return dbContext;
        }

        public static OccupationContext GetOccupationContext(string dbName)
        {
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<OccupationContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Create instance of DbContext
            var dbContext = new OccupationContext(options);

            // Add entities in memory
            dbContext.Seed();

            return dbContext;
        }
    }
}
