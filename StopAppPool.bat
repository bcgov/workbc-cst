ECHO off
ECHO Checking %1 

c:\windows\system32\inetsrv\appcmd.exe list apppools %1 /text:state > temp.txt
SET /p VAR=<temp.txt
REM ECHO %VAR%
IF %VAR%==Started (
	ECHO %1 STARTED
	C:\Windows\system32\inetsrv\appcmd.exe stop appPool %1	
) else (
	ECHO %1 ALREADY STOPPED)

ECHO on


