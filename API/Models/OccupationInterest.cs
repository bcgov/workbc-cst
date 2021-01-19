using System;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    public class OccupationInterest
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}