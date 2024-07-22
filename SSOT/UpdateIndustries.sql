--Update Industry table to sync up with ssot_industries.json
Update [dbo].[Industry] 
Set Value = REPLACE(Value, 'And', 'and');

--Check results
Select * from Industry



