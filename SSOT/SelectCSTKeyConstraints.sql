SELECT SA.TABLE_NAME,
       SA.COLUMN_NAME,
       SA.DATA_TYPE,
       SA.CHARACTER_MAXIMUM_LENGTH AS Column_Width,
       PK.type AS PRIMARY_KEY,
       FK.type AS Foriegn_KEY,
       SAU.CONSTRAINT_NAME,
       SO.[Name] + '_' + SAU.COLUMN_NAME Referenced_Table_Column
FROM INFORMATION_SCHEMA.COLUMNS AS SA
LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS SAU
    ON SAU.COLUMN_NAME = SA.COLUMN_NAME
LEFT JOIN sys.foreign_keys AS FK
    ON FK.[NAME] = SAU.CONSTRAINT_NAME
LEFT JOIN sys.key_constraints AS PK
    ON PK.[NAME] = SAU.CONSTRAINT_NAME
LEFT JOIN sys.objects AS SO
    ON SO.object_id = FK.referenced_object_id OR
       SO.object_id = PK.parent_object_id
