--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\JB\workbc-cst\SSOT\ssot_nocs.json', SINGLE_CLOB) import
SELECT * Into #TempNocs
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [label] varchar(max),
	[noc_2016] varchar(10)
)

Select * from #TempNocs

ALTER TABLE NOCVideos
ADD Email varchar(255);

--Update NOCVideos table from temp table.
Update NOCVideos
SET NOCId =(
Select noc_2021
From #TempNocs
where STR(NOCId) in (noc_2016)
)

--Delete temp table
Drop table #TempNocs

--Check results
Select * from NOCVideos
