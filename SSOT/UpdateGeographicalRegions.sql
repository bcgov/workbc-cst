--Update GeographicArea table with new values.
IF NOT EXISTS (Select * from dbo.GeographicArea where Value = 'British Columbia')
BEGIN
	INSERT INTO [dbo].[GeographicArea]
           ([Value])
	VALUES
           ('British Columbia')
END

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