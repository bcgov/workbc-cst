for /f "tokens=1-4 delims=/ " %%i in ("%date%") do set datestring=%%i-%%j-%%k
"C:\Program Files (x86)\Microsoft SQL Server\150\DTS\Binn\dtexec" /F "%~dp0..\ImportSaoData.dtsx" /De c0NNect5 /Conf "DataImporter.dtsConfig" >> "DataImporter_%datestring%.log"
:pause