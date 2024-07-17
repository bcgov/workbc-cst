--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_industries.json', SINGLE_CLOB) import
SELECT * Into #TempIndustries
FROM OPENJSON (@JSON)
WITH 
(
    [name] varchar(255)
)

--Resetting NOC table's id column
DBCC CHECKIDENT ('dbo.Industry', RESEED, 0);

--Update NOC table from temp table
INSERT INTO Industry(Value, SortOrder) 
Select name, 0
From #TempIndustries;

--Drop temp table
Drop table #TempIndustries

--Check results
Select * from Industry
