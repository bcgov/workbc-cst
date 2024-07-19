--Update OccupationGroup tables.
IF NOT EXISTS (Select * from dbo.OccupationGroup where Value = 'All')
BEGIN
	INSERT INTO [dbo].[OccupationGroup]
           ([Value])
	VALUES
           ('All')
END

IF NOT EXISTS (Select * from dbo.OccupationGroup where Value = 'Care economy')
BEGIN
	INSERT INTO [dbo].[OccupationGroup]
           ([Value])
	VALUES
           ('Care economy')
END

Update [dbo].[OccupationGroup]           
Set Value = 'Construction trades'
where Value = 'Trades – construction'

Update [dbo].[OccupationGroup]           
Set Value = 'Non-construction trades'
where Value = 'Trades – non-construction'

Update [dbo].[OccupationGroup]           
Set Value = 'STEM'
where Value = 'STEM occupations'

--Check results
Select * from OccupationGroup


