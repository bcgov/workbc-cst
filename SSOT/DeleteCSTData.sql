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
DROP CONSTRAINT FK_NOC_FullOrPartTime;

ALTER TABLE NOC
DROP CONSTRAINT PK_NOC;

ALTER TABLE NOC
DROP CONSTRAINT FK_NOC_EducationLevel;

ALTER TABLE NOC
DROP CONSTRAINT FK_NOC_FullOrPartTime;

ALTER TABLE SubIndustry
DROP CONSTRAINT FK_SubIndustry_Industry;

ALTER TABLE JobOpening
DROP CONSTRAINT FK_JobOpening_Industry;

ALTER TABLE NOCOccupationGroup
DROP CONSTRAINT FK_NOCOccupationGroup_GeographicArea;

-- Delete the content from the relevant tables
delete from NOC
delete from CommonJobTitle
delete from EducationLevel
delete from FullOrPartTime
delete from Industry
delete from GeographicArea