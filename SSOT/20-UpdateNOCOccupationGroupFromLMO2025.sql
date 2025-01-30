--Drop the foreign keys and primary keys on Id column in NOCOccupationGroup table.
ALTER TABLE NOCOccupationGroup
DROP CONSTRAINT FK_NOCOccupationGroup_NOC;

--Delete the existing data in NOCOccupationGroup table.
delete from NOCOccupationGroup

--Insert the new LMO data in NOCOccupationGroup table.
--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_career_search_groups.json', SINGLE_CLOB) import
SELECT * Into #TempGroups
FROM OPENJSON (@JSON)
WITH 
(
    [noc] varchar(10), 
    [occupational_category] varchar(255),
    [region] varchar(255)
)

Update #TempGroups
SET region = 'All'
where region = 'British Columbia'

Alter table #TempGroups
Add NOCCodeId varchar(10);

Alter table #TempGroups
Add OccGroupId int; 

Alter table #TempGroups
Add OccRegId int; 

Update #TempGroups
Set NOCCodeId = n.Id
From #TempGroups t JOIN NOC n
ON t.noc = n.NOCCode

Update #TempGroups
Set OccGroupId = g.Id
From #TempGroups t JOIN OccupationGroup g
ON t.occupational_category = g.Value

Update #TempGroups
Set OccRegId = g.Id
From #TempGroups t JOIN GeographicArea g
ON t.region = g.Value

--Resetting table's id column
DBCC CHECKIDENT ('dbo.NOCOccupationGroup', RESEED, 0);

--Insert data into NOCOccupationGroup table from temp table.
INSERT INTO NOCOccupationGroup(NOCId, OccupationalGroupId, GeographicAreaId) 
Select NOCCodeId, OccGroupId, OccRegId from #TempGroups;

--Delete temp table
Drop table #TempGroups

--Add the constraint back
ALTER TABLE [dbo].[NOCOccupationGroup]  WITH CHECK ADD CONSTRAINT [FK_NOCOccupationGroup_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

--Check results
Select * from NOCOccupationGroup
