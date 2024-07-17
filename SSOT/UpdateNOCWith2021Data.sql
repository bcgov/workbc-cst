--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\JB\workbc-cst\SSOT\ssot_nocs.json', SINGLE_CLOB) import
SELECT * Into #TempNocs
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [label] varchar(max)
)

--Resetting NOC table's id column
DBCC CHECKIDENT ('dbo.NOC', RESEED, 0);

Select * from #TempNocs
--Update NOC table from temp table
INSERT INTO NOC(NOCCode, Description) 
Select noc_2021, label from #TempNocs;

--Drop temp table
Drop table #TempNocs

--Check results
Select * from NOC
