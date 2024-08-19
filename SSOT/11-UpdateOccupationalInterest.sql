--Resetting OccupationalInterest table's id column
DBCC CHECKIDENT ('dbo.[OccupationalInterest]', RESEED, 0);
--Insert new Education Levels as per the values provided.
INSERT INTO [dbo].[OccupationalInterest]
           ([Value])
VALUES
       ('Artistic'),
 	   ('Conventional'),
	   ('Enterprising'),
	   ('Investigative'),
	   ('Realistic'),
	   ('Social')
GO
