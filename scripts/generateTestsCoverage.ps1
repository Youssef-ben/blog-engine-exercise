[String] $SCRIPT_ROOT_PATH=$PWD
[String] $TEST_PROJECT_FOLDER="\Blog.Engine.Tests"
[String] $BACKEND_FOLDER=""
[String] $TEST_RESULT_FOLDER=""
[Boolean] $OpenReportInWindow=$true

[String] $CurrentFolder = $SCRIPT_ROOT_PATH.SubString($SCRIPT_ROOT_PATH.Length-7)
if($CurrentFolder -contains "scripts" ){
  $BACKEND_FOLDER=-join($SCRIPT_ROOT_PATH, "\..", "\src\backend", $TEST_PROJECT_FOLDER) 
}
else{
  $BACKEND_FOLDER=-join($SCRIPT_ROOT_PATH, "\src\backend", $TEST_PROJECT_FOLDER) 
}

$TEST_RESULT_FOLDER=-join($BACKEND_FOLDER, "\TestResults")

if ((Test-Path -path $TEST_RESULT_FOLDER)) {  
  Remove-Item -Recurse -Force $TEST_RESULT_FOLDER
}

Write-Host "[INF] Building and testing the projects"
dotnet test $BACKEND_FOLDER --collect:"XPlat Code Coverage"

Write-Host "[INF] Generating the project coverage report"
reportgenerator "-reports:**\*\TestResults\*\coverage.cobertura.xml" "-targetdir:$BACKEND_FOLDER/TestResults/.coverage" "-reporttypes:Html" "-classfilters:-**Blog.Engine.Repositories.Migrations**;-**Blog.Engine.Api.Configuration**"
 
if(!$args[0]){
  $OpenReportInWindow= [Boolean] $args[0]
}

if ($OpenReportInWindow){
  start chrome @("$BACKEND_FOLDER/TestResults/.coverage/index.html")
}