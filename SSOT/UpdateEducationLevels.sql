--Resetting EducationLevel table's id column
DBCC CHECKIDENT ('dbo.[EducationLevel]', RESEED, -1);
--Insert new Education Levels as per the values provided.
INSERT INTO [dbo].[EducationLevel]
           ([Value])
VALUES
           ('Management'),
	   ('University Degree'),
	   ('College Diploma or Apprenticeship, 2 or more years'),
	   ('College Diploma or Apprenticeship, less than 2 years'),
	   ('High School Diploma'),
	   ('No Formal Education')
GO
