using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using SearchAllOccupationsToolAPI.Extensions;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class AnnualSalaryRepository : IAnnualSalaryRepository
    {
        public List<AnnualSalary> GetAnnualSalaries()
        {
            var salaryEnums = Enum.GetValues(typeof(AnnualSalaryValues)).Cast<AnnualSalaryValues>().ToList();

            //var salaries = new List<AnnualSalary>
            //{
            //    new AnnualSalary { Id = 0, SalaryText = "All" },
            //    new AnnualSalary { Id = 1, SalaryText = "Less than $20,000" },
            //    new AnnualSalary { Id = 2, SalaryText = "$20,000 to $40,000" },
            //    new AnnualSalary { Id = 3, SalaryText = "$40,000 to $60,000" },
            //    new AnnualSalary { Id = 4, SalaryText = "$60,000 to $80,000" },
            //    new AnnualSalary { Id = 5, SalaryText = "$80,000 to $100,000" },
            //    new AnnualSalary { Id = 6, SalaryText = "$100,000 to $120,000" },
            //    new AnnualSalary { Id = 7, SalaryText = "$120,000 to $140,000" },
            //    new AnnualSalary { Id = 8, SalaryText = "Over $140,000" }
            //};

            return salaryEnums.Select(salary => new AnnualSalary {Id = (int) salary, SalaryText = salary.GetDescription()}).ToList();
        }
    }

    public enum AnnualSalaryValues
    {
        [Description("All")]
        All = 0,

        [Description("Less than $20,000")]
        LessThan20 = 1,

        [Description("$20,000 to $40,000")]
        Between20And40 = 2,

        [Description("$40,000 to $60,000")]
        Between40And60 = 3,

        [Description("$60,000 to $80,000")]
        Between60And80 = 4,

        [Description("$80,000 to $100,000")]
        Between80And100 = 5,

        [Description("$100,000 to $120,000")]
        Between100And120 = 6,

        [Description("$120,000 to $140,000")]
        Between120And140 = 7,

        [Description("Over $140,000")]
        Over140 = 8,
    }
}