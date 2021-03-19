using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    [Table("FullOrPartTime")]
    public class FullOrPartTime
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        /// <summary>
        /// Get the display name for the UI
        /// </summary>
        /// <returns></returns>
        public string GetNameForApi()
        {
            switch (Value.ToLower())
            {
                case "high":
                    return "Higher chance of part-time";
                case "low":
                    return "Higher chance of full-time";
                default:
                    return Value;
            }
        }
    }
}