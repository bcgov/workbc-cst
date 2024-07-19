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

--Update OccupationalGroupId in NOCOccupationGroup table from temp table.
Update NOCOccupationGroup
Set OccupationalGroupId = t.OccGroupId
From #TempGroups t
JOIN NOCOccupationGroup n
ON t.NOCCodeId = n.NOCId

--Update GeographicAreaId in NOCOccupationGroup table from temp table.
Update NOCOccupationGroup
Set GeographicAreaId = t.OccRegId
From #TempGroups t
JOIN NOCOccupationGroup n
ON t.NOCCodeId = n.NOCId

--Delete temp table
Drop table #TempGroups

--Check results
Select * from NOCOccupationGroup
