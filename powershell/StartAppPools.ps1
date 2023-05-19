$appCmd = "C:\Windows\system32\inetsrv\appcmd.exe"
$appcmd_args = "start", "appPool", $args[0]
& $appCmd $appcmd_args
Start-Sleep -s 120
$appcmd_args = "start", "appPool", $args[1]
& $appCmd $appcmd_args
