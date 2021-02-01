using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    // The Occupation model does not map to a class in the database
    public class Occupation
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        
        [JsonPropertyName("noc")]
        public string NOC { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
        
        [JsonPropertyName("education")]
        public EducationLevel Education { get; set; }
        
        [JsonPropertyName("workExperience")]
        public WorkExperience WorkExperience { get; set; }

        [JsonPropertyName("income")]
        public string Income { get; set; }
        
        [JsonPropertyName("jobOpenings")]
        public int JobOpenings { get; set; }

        [NotMapped]
        [JsonPropertyName("careertrekvideoids")]
        public List<string> CareerTrekVideoIds { get; set; }
    }
}
