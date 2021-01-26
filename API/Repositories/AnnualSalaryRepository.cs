using System;
using System.Collections.Generic;
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
            return salaryEnums.Select(salary => new AnnualSalary {Id = (int) salary, SalaryText = salary.GetDescription()}).ToList();
        }
    }
}