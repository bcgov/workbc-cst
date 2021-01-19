ECHO off
ECHO Checking %1 

c:\windows\system32\inetsrv\appcmd.exe list apppools %1 /text:state > temp.txt
SET /p VAR=<temp.txt
REM ECHO %VAR%
IF %VAR%==Stopped (
	ECHO %1 STOPPED
	C:\Windows\system32\inetsrv\appcmd.exe start appPool %1	
) else (
	ECHO %1 ALREADY STARTED)

ECHO on
