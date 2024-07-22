--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_occupational_interests.json', SINGLE_CLOB) import
SELECT * Into #TempGroups
FROM OPENJSON (@JSON)
WITH 
(
    [noc] varchar(10), 
    [options] varchar(255),
	[occupational_interest] varchar(255)
)

Alter table #TempGroups
Add NOCCodeId varchar(10);

Alter table #TempGroups
Add OptionId int; 

Alter table #TempGroups
Add OccIntId int; 

Update #TempGroups
Set NOCCodeId = n.Id
From #TempGroups t JOIN NOC n
ON t.noc = n.NOCCode

Update #TempGroups
Set OccIntId = i.Id
From #TempGroups t JOIN OccupationalInterest i
ON t.occupational_interest = i.Value

Update #TempGroups
Set OptionId = o.Id
From #TempGroups t JOIN OccupationInterestOption o
ON t.options = o.Value

--Resetting table's id column
DBCC CHECKIDENT ('dbo.NOCOccupationInterest', RESEED, 0);

--Insert data into NOCOccupationGroup table from temp table.
INSERT INTO NOCOccupationInterest(NOCId, OccupationInterestId, OccupationInterestOptionId) 
Select NOCCodeId, OccIntId, OptionId from #TempGroups;

--Delete temp table
Drop table #TempGroups

--Check results
Select * from NOCOccupationInterest