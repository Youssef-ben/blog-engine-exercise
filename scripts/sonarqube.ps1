[String] $MR_SONAR_URL="http://localhost:5901"
[String] $ROOT_FOLDER_PATH=$PWD
[String] $PWD_BACKEND=""
[String] $SONAR_KEY_FILE_NAME="sonar.key"
[String] $SONAR_KEY_FILE_PATH="" #-join($PWD, "\" ,$SONAR_KEY_FILE_NAME)

# Setup the backend and sonar file path
[String] $CurrentFolder = $ROOT_FOLDER_PATH.SubString($ROOT_FOLDER_PATH.Length-7)
if($CurrentFolder -contains "scripts" ){
  $PWD_BACKEND=-join($ROOT_FOLDER_PATH, "\..", "\src\backend") 
  $SONAR_KEY_FILE_PATH=-join($ROOT_FOLDER_PATH, "\..\" ,$SONAR_KEY_FILE_NAME)
}
else{
  $PWD_BACKEND=-join($ROOT_FOLDER_PATH, "\src\backend") 
  $SONAR_KEY_FILE_PATH=-join($ROOT_FOLDER_PATH, "\", $SONAR_KEY_FILE_NAME)
}

# Validate that the sonarqube login token exists.
if(![System.IO.File]::Exists($SONAR_KEY_FILE_PATH)) {
  throw (New-Object System.IO.FileNotFoundException("The file ($SONAR_KEY_FILE_NAME) is required but was not found at the location: ($SONAR_KEY_FILE_PATH)", $SONAR_KEY_FILE_NAME, $SONAR_KEY_FILE_PATH))
}

# Load sonarqube login token.
$SONAR_AUTH_KEY=Get-Content -Path $SONAR_KEY_FILE_PATH
if ([string]::IsNullOrEmpty($SONAR_AUTH_KEY)){
  throw (New-Object System.IO.FileNotFoundException("The sonarqube login token is required please set the value in the file: ($SONAR_KEY_FILE_PATH)", $SONAR_KEY_FILE_PATH))
}

function Invoke-Sonar {

  param (
      [string] $Name,
      [bool] $IsApi,
      [bool] $SkipTests,
      [string] $Exclusions = " ",
      [string] $CoverageExclusions = " "
  )
 
  Write-Host "============================================================="
  Write-Host "`t`t$Name"
  Write-Host "============================================================="

  ## Setup the variables
  $projectRootPath=$PWD_BACKEND
  $coverageFolder=-join($projectRootPath, "\.sonarqube\coverage")
  $coverageGeneratedFile=-join($coverageFolder, "\SonarQube.xml")
  $coverageFile=-join($coverageFolder, "\$Name.xml")
  $projectPath=-join($projectRootPath, "\", $Name)
  $projectTestPath=-join($projectPath, ".Tests")
  $projectTestResultPath=-join($projectTestPath, "\TestResults")

  # Set Coverage file if test are not skipped 
  if ($SkipTests -eq $true) {
    $coverageFile=" "
  }

  if($IsApi -eq $true) {
    $projectPath=-join($projectPath, ".Api") 
  }

  # CD the project directory
  Set-Location $projectRootPath
  
  # # Start the process
  dotnet sonarscanner begin `
    /n:$Name `
    /k:$Name `
    /d:sonar.host.url=$MR_SONAR_URL  `
    /d:sonar.login=$SONAR_AUTH_KEY `
    /d:sonar.coverageReportPaths=$CoverageFile `
    /d:sonar.exclusions=$Exclusions `
    /d:sonar.coverage.exclusions=$CoverageExclusions
    
  dotnet build $projectPath --no-incremental

  # Only skip tests if 
  if ($SkipTests -eq $false) {
    
    if ((Test-Path -path $projectTestResultPath)) {  
      Remove-Item -Recurse -Force $projectTestResultPath
    }
    
    dotnet test $projectTestPath --no-build --collect:"XPlat Code Coverage"
    reportgenerator "-reports:**\*\TestResults\*\coverage.cobertura.xml" "-targetdir:$coverageFolder" "-reporttypes:SonarQube"
    Move-Item -Path $coverageGeneratedFile -Destination $coverageFile -Force
  }
  
  # # Push to Sonar
  dotnet sonarscanner end /d:sonar.login=$SONAR_AUTH_KEY
  
  # Go back to the root folder.
  Set-Location $ROOT_FOLDER_PATH
  
  Write-Host "============================================================="
  Write-Host ""
}

## Account API
Invoke-Sonar `
  -Name:"Blog.Engine" `
  -IsApi:1 `
  -SkipTests:0 `
  -Exclusions:"**/**/appsettings.local.json,**/*/*.local.json,**/**/appsettings.testing.json,**/*InversionOfControl.cs,**/Program.cs" `
  -CoverageExclusions:"**/Migrations/**,**/appsettings.local.json,**/Blog.Engine.Api/Configuration/**"
