
-- Add the FK back to the tables
ALTER TABLE [dbo].[NOC]  WITH CHECK ADD  CONSTRAINT [FK_NOC_EducationLevel] FOREIGN KEY([EducationLevelId])
REFERENCES [dbo].[EducationLevel] ([Id])
GO