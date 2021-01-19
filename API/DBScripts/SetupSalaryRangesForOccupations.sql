update Occupations
set SalaryRangeId = 1
where Income < 40000

update Occupations
set SalaryRangeId = 2
where Income >= 40000
and Income < 60000

update Occupations
set SalaryRangeId = 3
where Income >= 60000
and Income < 80000

update Occupations
set SalaryRangeId = 4
where Income >= 80000
and Income < 100000

update Occupations
set SalaryRangeId = 5
where Income >= 100000

update Occupations 
set Income = 'N.A.'
where Income = 0


