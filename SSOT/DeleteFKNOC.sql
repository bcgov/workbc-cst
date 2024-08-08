--Drop the foreign keys and primary keys on Id column in NOC table.
ALTER TABLE JobOpening
DROP CONSTRAINT FK_JobOpening_NOC;

ALTER TABLE CommonJobTitle
DROP CONSTRAINT FK_CommonJobTitle_NOC;

ALTER TABLE NOCVideos
DROP CONSTRAINT FK_NOCVideos_NOC;

ALTER TABLE NOCOccupationInterest
DROP CONSTRAINT FK_NOCOccupationInterest_NOC;

ALTER TABLE NOCOccupationGroup
DROP CONSTRAINT FK_NOCOccupationGroup_NOC;

ALTER TABLE NOC
DROP CONSTRAINT PK_NOC;

ALTER TABLE NOC
DROP CONSTRAINT FK_NOC_EducationLevel;

ALTER TABLE NOCOccupationInterest
DROP CONSTRAINT FK_NOCOccupationInterest_OccupationalInterest;

-- Delete the content from the relevant tables
delete from NOC
delete from CommonJobTitle
delete from EducationLevel
delete from NOCOccupationGroup
delete from OccupationGroup
delete from JobOpening
delete from OccupationalInterest
delete from NOCOccupationInterest
