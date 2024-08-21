--Alter column datatype to nvarchar for Title so that french characters can be saved.
ALTER TABLE NOC ALTER COLUMN Description nvarchar(max) not null

DBCC CLEANTABLE (WorkBC_SAO_DEV, 'NOC', 100000)

ALTER TABLE NOC REBUILD
------------------------------------------------------------------------------
--Update Occupations table records for existing incorrect records.
Update NOC
Set Description = (N'Maîtres d''hôtel and hosts / hostesses'),
JobOverviewSummary = (N'Maîtres d''hôtel and hosts/hostesses greet patrons and escort them to tables, and supervise and coordinate the activities of food and beverage servers. They are employed in restaurants, hotel dining rooms, private clubs, cocktail lounges and similar establishments.')
where NOCCode=64300;

--Check results
Select * from NOC
where NOCCode=64300
