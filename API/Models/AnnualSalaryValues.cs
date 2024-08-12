using System.ComponentModel;

namespace SearchAllOccupationsToolAPI.Models
{
    public enum AnnualSalaryValues
    {
        [Description("Less than $40,000")]
        LessThan40 = 1,

        [Description("$40,000 – $59,000")]
        Between40And60 = 2,

        [Description("$60,000 – $79,000")]
        Between60And80 = 3,

        [Description("$80,000 – $99,999")]
        Between80And100 = 4,

        [Description("$100,000 – 119,999")]
        Between100And120 = 5,

        [Description("$120,000 – $140,000")]
        Between120And140 = 6,

        [Description("Over $140,000")]
        Over140 = 7,
    }
}
