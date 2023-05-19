$pathPrefix = $args[0]
$pathSuffix = "\Web/careerSearchTool\.env.production"
$filepath = Join-Path $pathPrefix $pathSuffix
Write-Output $filepath
$publicUrl = "GATSBY_PUBLIC_URL=./"
$apiUrl = "GATSBY_API_URL=./api"
$carouselNoc = "CAROUSEL_IMAGES=2122,2175"
Add-Content $filepath $publicUrl 
Add-Content $filepath $apiUrl
Add-Content $filepath $carouselNoc