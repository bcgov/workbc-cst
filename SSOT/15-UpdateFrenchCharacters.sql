--Alter column datatype to nvarchar for Title so that french characters can be saved.
ALTER TABLE NOC ALTER COLUMN Description nvarchar(max) not null

DBCC CLEANTABLE (WorkBC_CareerSearchTool, 'NOC', 100000)

ALTER TABLE NOC REBUILD
------------------------------------------------------------------------------
--Update Occupations table records for existing incorrect records.
Update NOC
Set Description = (N'Maîtres d''hôtel and hosts / hostesses')
where NOCCode=64300;

--Check results
Select * from NOC
where NOCCode=64300