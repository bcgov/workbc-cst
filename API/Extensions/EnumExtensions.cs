using System;
using System.ComponentModel;

namespace SearchAllOccupationsToolAPI.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum @enum, string emptyValue = "---")
        {
            if (@enum == null)
                return emptyValue;

            var fieldInfo = @enum.GetType().GetField(@enum.ToString());

            if (fieldInfo == null)
                return @enum.ToString();

            var attributes = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes.Length > 0)
                return ((DescriptionAttribute)attributes[0]).Description;

            return @enum.ToString();
        }
    }
}