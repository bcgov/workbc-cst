using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    [Table("Industry")]
    public class Industry
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [NotMapped]
        public List<SubIndustry> SubIndustries { get; set; }  // Use Collection
    }

    public class SubIndustry
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual Industry Industry { get; set; }
    }
}