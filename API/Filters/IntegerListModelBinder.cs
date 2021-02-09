using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SearchAllOccupationsToolAPI.Filters
{
    public class IntegerListModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            var value = valueProviderResult.FirstValue;

            var splitList = value?.Split(",", StringSplitOptions.RemoveEmptyEntries);
            var model = new List<int>();
            if (splitList != null && splitList.Any())
            {
                foreach (var id in splitList)
                {
                    if (!int.TryParse(id, out var idResult)) 
                        continue;
                    
                    if (idResult > 0)
                        model.Add(idResult);
                }
            }

            bindingContext.Result = ModelBindingResult.Success(model);
            return Task.CompletedTask;
        }
    }
}