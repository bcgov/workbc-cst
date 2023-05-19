$appPath = $args[0]

if (Test-Path -Path $appPath) {
	Write-Output "PATH EXISTS"
	Get-ChildItem $appPath -exclude API,SharedResources,BusinessConfiguration,SharedImages,ImageCarouselNOCs.txt,BackgroundImages,ProfileImages,*background.png,*profile.png -recurse | Remove-Item -Force -Recurse
	Write-Output "Folder Cleared"
}else {
	Write-Output "PATH DOES NOT EXIST" }