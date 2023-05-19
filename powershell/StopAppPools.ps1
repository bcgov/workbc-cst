$AppPoolName = $args[0]
$AppPoolState = Get-WebAppPoolState $AppPoolName | Select -ExpandProperty Value
Write-Output $AppPoolState
if ($AppPoolState -eq "Started") {
	Write-Output "App Pool is running"
	Stop-WebAppPool -Name $AppPoolName
	Write-Output "App Pool Stopped"
}else {
	Write-Output "App Pool is NOT running" }

Start-Sleep -s 120

$AppPoolName = $args[1]
$AppPoolState = Get-WebAppPoolState $AppPoolName | Select -ExpandProperty Value
Write-Output $AppPoolState
if ($AppPoolState -eq "Started") {
	Write-Output "App Pool is running"
	Stop-WebAppPool -Name $AppPoolName
	Write-Output "App Pool Stopped"
}else {
	Write-Output "App Pool is NOT running" }