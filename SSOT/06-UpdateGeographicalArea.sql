--Update GeographicArea table with new values.
Update [dbo].[GeographicArea]           
Set Value = 'Mainland/Southwest'
where Value = 'Mainland / Southwest'

Update [dbo].[GeographicArea]           
Set Value = 'North Coast and Nechako'
where Value = 'North Coast & Nechako'

Update [dbo].[GeographicArea]           
Set Value = 'Vancouver Island/Coast'
where Value = 'Vancouver Island / Coast'

--Check results
Select * from [dbo].[GeographicArea]