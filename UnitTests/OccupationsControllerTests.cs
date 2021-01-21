using System;
using System.Net.Http;
using Xunit;
using SearchAllOccupationsToolAPI.Models;
using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Controllers;
using SearchAllOccupationsToolAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Controllers.OldCrap;

namespace SearchAllOccupationsToolAPITests
{
    public class OccupationsControllerTests
    {
        [Fact]
        public async void TestGetOccupations_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationContext(nameof(TestGetOccupations_Controller_NotEmpty));
            
            var workExperiencesContext = DbContextMocker.GetWorkExperienceContext(nameof(TestGetOccupations_Controller_NotEmpty));
            var salariesContext = DbContextMocker.GetSalaryContext(nameof(TestGetOccupations_Controller_NotEmpty));
            var educationLevelsContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetOccupations_Controller_NotEmpty));
            var occupationMatchesContext = DbContextMocker.GetOccupationMatchContext(nameof(TestGetOccupations_Controller_NotEmpty));
            var similaritiesContext = DbContextMocker.GetSimilarityContext(nameof(TestGetOccupations_Controller_NotEmpty));

            var controller = new OccupationsController(dbContext,
                workExperiencesContext,
                salariesContext,
                educationLevelsContext,
                occupationMatchesContext,
                similaritiesContext);

            // Act
            var response = await controller.GetOccupations("0011" ,null , null, null, null) as ActionResult<IEnumerable<Occupation>>;
            var value = response.Value as List<Occupation>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetOccupations_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var workExperiencesContext = DbContextMocker.GetWorkExperienceContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var salariesContext = DbContextMocker.GetSalaryContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var educationLevelsContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var occupationMatchesContext = DbContextMocker.GetOccupationMatchContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var similaritiesContext = DbContextMocker.GetSimilarityContext(nameof(TestGetOccupations_Repository_NotEmpty));
            var repo = new OccupationRepository(dbContext,
                workExperiencesContext,
                salariesContext,
                educationLevelsContext,
                occupationMatchesContext,
                similaritiesContext);

            // Act
            var value = repo.GetOccupations("0011", null, null, null, null) as List<Occupation>;
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }
    }
}
