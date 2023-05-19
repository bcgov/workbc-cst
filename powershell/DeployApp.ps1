$appPath = $args[0]
Copy-Item downloads/web/* $appPath -Recurse -Force
$appPathApi = $appPath + "\API\"
Copy-Item downloads/api/* $appPathApi -Recurse -Force