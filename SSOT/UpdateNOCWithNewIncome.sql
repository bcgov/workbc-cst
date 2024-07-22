--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_career_search_openings.json', SINGLE_CLOB) import
SELECT * Into #TempSalary
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [calculated_median_annual_salary] varchar(255),
	[part_full_time] varchar(255)
)

--Add a column to parse the FullOrPartTimeId int value from the varchar data.
ALTER TABLE #TempSalary ADD part_full_time_id int

Update #TempSalary
  Set part_full_time_id = case
  when #TempSalary.part_full_time = 'Higher chance of part-time' then 11
  when #TempSalary.part_full_time = 'Higher chance of full-time' then 12
  else null
  End

---Update #TempSalary with income as int
Update #TempSalary SET calculated_median_annual_salary = CAST((ROUND(CAST (calculated_median_annual_salary AS NUMERIC(20,4)),0)) AS INT)
From #TempSalary

--Update new income and FullOrPartTimeId in NOC table from temp table
Update NOC SET MedianSalary = #TempSalary.calculated_median_annual_salary, FullOrPartTimeId =#TempSalary.part_full_time_id
FROM #TempSalary WHERE NOC.NOCCode = #TempSalary.noc_2021 

--Drop temp table
Drop table #TempSalary

--Check results
Select * from NOC
