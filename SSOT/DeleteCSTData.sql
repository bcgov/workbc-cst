----Drop the foreign keys and primary keys on Id column in NOC table.
ALTER TABLE NOC
DROP CONSTRAINT FK_NOC_EducationLevel;

delete from EducationLevel
