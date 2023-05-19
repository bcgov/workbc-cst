$appPath = $args[0]
$filePath = $args[1]
$siteUrl = $args[2]
$dbServer = $args[3]
$database = $args[4]
$dbUser = $args[5]
$dbPwd = $args[6]
$pathToJson = $appPath + "\API\appsettings.json"


$content = Get-Content $pathToJson | ConvertFrom-Json
$content.ConnectionStrings.Database = "Server=$dbServer;Database=$database;User Id=$dbUser;Password=$dbPwd"

$content.ImageCarouselNOCConfigLocalPath = $filePath + "\BusinessConfiguration\ImageCarouselNOCs.txt"
#$content.SharedImagesProfilesLocalPath= $filePath + "\ProfileImages"
#$content.SharedImagesBackgroundsLocalPath= $filePath + "\BackgroundImages"
$content.SharedImagesProfilesBaseURL= $siteUrl + "/careersearchtool/profileimages/"
$content.SharedImagesBackgroundsBaseURL= $siteUrl + "/careersearchtool/backgroundimages/"
$content | ConvertTo-Json -depth 32| set-content $pathToJson
