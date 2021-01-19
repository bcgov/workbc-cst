using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace SearchAllOccupationsToolAPI.Controllers
{
    public class ApiControllerBase : ControllerBase
    {
        public List<T> GetPlaceHolderData<T>(string sampleFile) where T : class
        {
            var sample = System.IO.File.ReadAllText(sampleFile);
            return JsonSerializer.Deserialize<List<T>>(sample, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
    }
}