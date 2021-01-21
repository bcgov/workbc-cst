using Xunit;
using SearchAllOccupationsToolAPI.Models;
using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Controllers;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPITests
{
    public class EducationLevelsControllerTests
    {
        [Fact]
        public async void TestGetEducationLevels_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetEducationLevels_Controller_NotEmpty));
            var controller = new EducationLevelsController(dbContext);

            // Act
            var response = await controller.GetEducationLevels();
            var value = response.Value as List<EducationLevel>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
        }

        [Fact]
        public async void TestGetEducationLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetEducationLevels_Repository_NotEmpty));
            var repo = new EducationLevelRepository(dbContext);

            // Act
            var value = repo.GetEducationLevels();
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
        }
    }
}
