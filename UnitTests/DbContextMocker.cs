using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;

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

        //public static WorkExperienceContext GetWorkExperienceContext(string dbName)
        //{
        //    // Create options for DbContext instance
        //    var options = new DbContextOptionsBuilder<WorkExperienceContext>()
        //        .UseInMemoryDatabase(databaseName: dbName)
        //        .Options;

        //    // Create instance of DbContext
        //    var dbContext = new WorkExperienceContext(options);

        //    // Add entities in memory
        //    dbContext.Seed();

        //    return dbContext;
        //}

        public static OccupationListItemContext GetOccupationListItemContext(string dbName)
        {
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<OccupationListItemContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Create instance of DbContext
            var dbContext = new OccupationListItemContext(options);

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
