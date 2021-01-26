using System.Collections.Generic;
using System.Text.Json;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public static class ContextHelper
    {
        public static List<T> GetPlaceHolderData<T>(string sampleFile) where T : class
        {
            var sample = System.IO.File.ReadAllText(sampleFile);
            return JsonSerializer.Deserialize<List<T>>(sample, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
    }
}