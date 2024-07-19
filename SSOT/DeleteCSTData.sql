----Drop the foreign keys and primary keys on Id column in NOC table.
ALTER TABLE NOC
DROP CONSTRAINT FK_NOC_EducationLevel;

delete from EducationLevel

-- Add the FK back to the tables
ALTER TABLE [dbo].[NOC]  WITH CHECK ADD  CONSTRAINT [FK_NOC_EducationLevel] FOREIGN KEY([EducationLevelId])
REFERENCES [dbo].[EducationLevel] ([Id])
GO
