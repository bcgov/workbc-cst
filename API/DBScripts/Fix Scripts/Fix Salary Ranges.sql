

update Occupations set SalaryRangeId = null

delete from Salaries


insert Salaries (id, [value]) values (1,  '$11,000 - 33,000')
insert Salaries (id, [value]) values (2,  '$33,001 - 44,000')
insert Salaries (id, [value]) values (3,  '$44,001 - 53,000')
insert Salaries (id, [value]) values (4,  '$53,001 - 66,000')
insert Salaries (id, [value]) values (5,  '$66,001 - 95,000')
insert Salaries (id, [value]) values (6,  '$95,001 - 125,000')
insert Salaries (id, [value]) values (7,  '> $125,000')



update Occupations 
set Income = 'N.A.'
where Income = '0'




update Occupations
set SalaryRangeId = 1
where  Income <> 'N.A.'
and Income >= 11000
and Income < 33001

update Occupations
set SalaryRangeId = 2
where Income <> 'N.A.'
and Income >= 33001
and Income < 44001

update Occupations
set SalaryRangeId = 3
where Income <> 'N.A.'
and Income >= 44001
and Income < 53001

update Occupations
set SalaryRangeId = 4
where Income <> 'N.A.'
and Income >= 53001
and Income < 66001

update Occupations
set SalaryRangeId = 5
where Income <> 'N.A.'
and Income >= 66001
and Income < 95001

update Occupations
set SalaryRangeId = 6
where Income <> 'N.A.'
and Income >= 95001
and Income < 125001

update Occupations
set SalaryRangeId = 7
where Income <> 'N.A.'
and Income >= 125001

update Occupations
set SalaryRangeId = 1
where  Income = 'N.A.'










