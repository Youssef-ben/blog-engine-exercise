
[String] $SCRIPT_ROOT_PATH=$PWD
[String] $DOCKER_FOLDER_PATH=""
[String] $ENV_NAME=$args[0]

[String] $CurrentFolder = $SCRIPT_ROOT_PATH.SubString($SCRIPT_ROOT_PATH.Length-7)
if($CurrentFolder -contains "scripts" ){
  $DOCKER_FOLDER_PATH=-join($SCRIPT_ROOT_PATH, "\..", "\docker") 
}
else{
  $DOCKER_FOLDER_PATH=-join($SCRIPT_ROOT_PATH, "\docker") 
}

Write-Host $DOCKER_FOLDER_PATH $ENV_NAME

# Validate that the env files exists.
[String] $BASE_ENV_FILE_PATH=-join($DOCKER_FOLDER_PATH, '\.env')
if(![System.IO.File]::Exists($BASE_ENV_FILE_PATH)) { 
  throw (New-Object System.IO.FileNotFoundException("The file (.env) is required but was not found at the location: ($BASE_ENV_FILE_PATH)", $BASE_ENV_FILE_PATH))
}

function Get-Environment-Variables {
  param (
    [string] $File
  )
  Write-Host "[INF] Loading environement variables for the file ($File)!"
  if(![System.IO.File]::Exists($File)) {
    Write-Host "[WRN] The file ($File) doesn't exists, skipping the loading action!"
    return
  }

  get-content $File | ForEach-Object { 
    if(!($_.StartsWith("#")) -And !([string]::IsNullOrEmpty($_)) ) {
        
      $name, $value = $_.split('=') 
      set-content env:\$name $value
    }
  }
}

# Load the (.env) environement variables in memory.
Get-Environment-Variables `
  -File:$BASE_ENV_FILE_PATH

# Load the (.env.$ENV_NAME) environement variables in memory.
if(!([string]::IsNullOrEmpty($ENV_NAME))) {
  $ExtrasEnvFile=-join($DOCKER_FOLDER_PATH, '\.env.', $ENV_NAME)
  Get-Environment-Variables `
    -File:$ExtrasEnvFile
}

if ([string]::IsNullOrEmpty($Env:PGADMIN_PASSWORD) -Or [string]::IsNullOrEmpty($Env:SONARQUBE_DB_PASSWORD) -Or [string]::IsNullOrEmpty($Env:BLOG_ENGINE_DB_PASSWORD) ) {
  throw (New-Object System.IO.FileNotFoundException("The value for the environement variable (PGADMIN_PASSWORD | SONARQUBE_DB_PASSWORD | BLOG_ENGINE_DB_PASSWORD) is Required"))
}
 
Set-Location -Path $DOCKER_FOLDER_PATH

docker compose up --build --force-recreate -d

Set-Location -Path $SCRIPT_ROOT_PATH