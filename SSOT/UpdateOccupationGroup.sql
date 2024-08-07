--Resetting OccupationGroup table's id column
DBCC CHECKIDENT ('dbo.[OccupationGroup]', RESEED, 0);
--Insert new Education Levels as per the values provided.
INSERT INTO [dbo].[OccupationGroup]
           ([Value])
VALUES
       ('All'),
 	   ('Care economy'),
	   ('Construction trades'),
	   ('High opportunity occupations'),
	   ('Management occupations'),
	   ('Non-construction trades'),
	   ('Non-management occupations'),
	   ('STEM')
GO

----Check results-----
Select * from dbo.[OccupationGroup]
