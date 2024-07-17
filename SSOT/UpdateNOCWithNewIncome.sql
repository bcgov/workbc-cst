--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\JB\workbc-cst\SSOT\wages.json', SINGLE_CLOB) import
SELECT * Into #TempWages
FROM OPENJSON (@JSON)
WITH 
(
    noc varchar(100), 
    calculated_median_annual_salary varchar(100) 
)

---Update #TempWages with income as int
Update #TempWages SET calculated_median_annual_salary = CAST((ROUND(CAST (calculated_median_annual_salary AS NUMERIC(20,4)),0)) AS INT)
From #TempWages

--Update new income in NOC table from temp table
DECLARE @Counter INT , @MaxId INT, 
		@income NVARCHAR(20)
SELECT @Counter = min(Id) , @MaxId = max(Id) 
FROM NOC

WHILE(@Counter IS NOT NULL
      AND @Counter <= @MaxId)
BEGIN
   Update NOC SET MedianSalary = #TempWages.calculated_median_annual_salary
   FROM #TempWages WHERE NOC.NOCCode = #TempWages.noc
    
   SET @Counter  = @Counter  + 1        
END

--Drop temp table
Drop table #TempWages

--Check results
Select * from NOC
