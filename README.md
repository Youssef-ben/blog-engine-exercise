# Blog Engine exercise

Blog Engine exercise aim to test the ability to create a system based on requirements

## Architecture

```txt
<root>/
  ├── /src
  |    ├── docker/
  |    |    ├── backend/
  |    |    |   ├── docker-compose.backend.yml
  |    |    |   └── Dockerfile
  |    |    |
  |    |    ├── frontend/
  |    |    |   ├── docker-compose.frontend.yml
  |    |    |   └── Dockerfile
  |    |    |
  |    |    ├── .env
  |    |    └── docker-compose.yml
  |    |
  |    ├── Backend/
  |    |    ├── Blog.Engine.Api
  |    |    ├── Blog.Engine.Models
  |    |    ├── Blog.Engine.Services
  |    |    ├── Blog.Engine.Repositories
  |    |    └── Blog.Engine.Tests
  |    |
  |    ├── Frontend/web/
  |    |    ├── .storybook/
  |    |    └── src/
  |    |        ├── Controller/
  |    |        ├── Views/
  |    |        └── Models/
  |    |
  |    └── ReadMe.md
```

### Tools

| Tech            | Desc                                   |
| --------------- | -------------------------------------- |
| Docker          | Containers Deployment (Docker-Compose) |
| Rider           | Backend IDE                            |
| VisualCode      | Frontend IDE                           |
| PgAdmin4        | Database GUI                           |
| SonarQube       | Code Analyzer                          |
| ReportGenerator | Generate Code coverage for backend     |

### System Users

As an MVP the system will support two types of users that can interact with its content:

| User Type      | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Admin          | `/admin` via the `Login` button where the user can create, edit and view posts and categories             |
| Anonymous User | `/` via the `Logout` button where the user can view all available posts/Categories and filter by category |

### Backend

Seen as the exercise is a simple one, I took the decision to use the classic approach for the Controllers combined with the Layered architecture.

#### Tools and Framework

| Tool/Framework | Description                         |
| -------------- | ----------------------------------- |
| CSharp         | Language                            |
| .Net 7+        | Framework                           |
| Web API        | Server                              |
| Ef Core        | ORM                                 |
| PostgreSQL     | Database                            |
| Swagger        | Endpoints Documentation             |
| XUnit          | Testing framework combined with Moq |

#### Folder structure

```txt
<root>/src/backend
  ├── Blog.Engine.Api
  ├── Blog.Engine.Models
  ├── Blog.Engine.Services
  ├── Blog.Engine.Repositories
  └── Blog.Engine.Tests
```

| Project      | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| Api          | Offers the endpoints that can be used to manage the system          |
| Models       | Contains the Domain models and the Data transfer objects            |
| Services     | Contains the logic and business rules to handle our system          |
| Repositories | Contains all the logic to insert and query the system database      |
| Tests        | Test project that makes sure that our system is working as expected |

### Frontend

#### Tools and Framework

The frontend project will be developed using the following technologies

| Tool/Framework  | Usage                                                               |
| --------------- | ------------------------------------------------------------------- |
| ReactJS         | The library for user interfaces using TypeScript                    |
| React Bootstrap | As the UI Library                                                   |
| Vite            | Build tool for development                                          |
| StoryBook       | Showcase and testing of different components and pages in isolation |

#### Folder structure

```txt
<root>/src/frontend/web/
  ├── .storybook/
  └── src/
      ├── Controller
      ├── Views
      └── Models
```

| Project    | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| .storybook | Configuration needed to show the pages and components              |
| Controller | All the pages, contexts and providers will be stored as this level |
| Views      | All the components will be stored at this level                    |
| Models     | All the Rest API models will be stored at this level               |

## Getting started

This section present all the required steps to do for running the project locally.

### Setup the projects

The following are the steps needed to setup the project locally:

#### 1. Backend

##### Setting the configuration

- Create an environment file `<root>/docker/.env.[development]` and override the following variables and any ones that you want:

```dotenv
ENVIRONEMENT=[development]
PGADMIN_PASSWORD=[pgadmin_password]
SONARQUBE_DB_PASSWORD=[sonarqube_db_password]
BLOG_ENGINE_DB_PASSWORD=[blog_engine_db_password]
```

- Make sure that you have the file `<root>/src/backend/Blog.Engine.Api/appsettings.[development].json` then update or add the following configuration:

_(Note: if you choose another name than `development` don't forget to update the `docker-compose.backend.yml` volume section and the `ASPNETCORE_ENVIRONMENT` in the API project `Blog.Engin.Api/Properties/launchSettings.json`)_

```json
{
  ....
  "Database": {
    "Server": "host.docker.internal",
    "Port": [BLOG_ENGINE_DB_PORT],
    "Password": "[BLOG_ENGINE_DB_PASSWORD]",
    "Template": "Host={0};Port={1};Database={2};Username={3};Password={4};Timeout=15"
  },
  ....
}
```

- Install Dotnet required tools

Only use if the tools are not installed

```bash
# Optional - Install only If you're going to use SonarQube
dotnet tool install --global dotnet-sonarscanner

# Required - Helps generating the tests coverage.
dotnet tool install --global dotnet-coverage

# Required - Helps generating the tests reports.
dotnet tool update dotnet-reportgenerator-globaltool -g
```

##### Testing the backend project

In order to make sure that the project is working as expected and nothing is broken run one of the following commands to test and generate the tests report.
_(Note: A browser window will open pointing to the coverage report)_

- On a `PowerShell` window, make sure you're on the root folder of the project and run this command:
  - `./scripts/generateTestsCoverage.ps1 $true`

In case you don't have `PowerShell` for non windows users.

- Make sure you're in the `<root>` folder.
- Run `dotnet test ./src/backend --collect:"XPlat Code Coverage"` to test project
- Run `reportgenerator "-reports:**\*\TestResults\*\coverage.cobertura.xml" "-targetdir:./src/backend/TestResults/.coverage" "-reporttypes:Html" "-classfilters:-**Blog.Engine.Repositories.Migrations**;-**Blog.Engine.Api.Configuration**"` to generate the report
- Run `start chrome $PWD/src/backend/TestResults/.coverage/index.html` to open the report.

#### 2. Frontend

The configuration required to run the frontend project locally are the following:

- Install the dependencies using `yarn` in the `./src/frontend/web`
- Making sure that the `VITE_BASE_URL` variable is pointing to the right API `url` and `port`.
  _Note: In the docker file of the webapp the url will be automatically generated._

### Start the containers

This section show the steps required to run the docker containers:

- Development mode:

Run the following commands to start the required infrastructure containers when your want to run the project locally to add new features:

- PowerShell: _(run from the root folder of the project)_

```PowerShell
.\scripts\startProjectDockerContainers.ps1 -Environment development -StartAll $False
```

- Bash: _(run from the root folder of the project)_

```bash
# Enter the ./docker folder
cd ./docker

# Start the infrastructure containers
docker compose up --force-recreate -d pgadmin sonarqube sonarqube-database blog-engine-database

## Return to root folder
cd ..
```

- Production mode:

The following command with re-create and start the infrastructure containers, build the api and webapp images, and create then start them and open the webapp in a browser.

- PowerShell: _(run from the root folder of the project)_

```Powershell
.\scripts\startProjectDockerContainers.ps1 -Environment development -StartAll $True -OpenWebbApp $True
```

- Bash: _(run from the root folder of the project)_

```bash
# Enter the ./docker folder
cd ./docker

# Start the infrastructure containers
docker compose up --force-recreate -d pgadmin sonarqube sonarqube-database blog-engine-database

# Build and start the api and webapp containers
docker compose up --build --force-recreate -d api webapp

# Open the webapp in the chrome browser
start chrome http://localhost:[BLOG_ENGINE_APP_PORT]

## Return to root folder
cd ..
```

### Setup SonarQube - Code Analyzer

**NOTE: This section is optional only run if your adding new features.**

See global sonarQube [Documentation](https://docs.sonarqube.org/latest/requirements/prerequisites-and-overview/)

#### Setting up sonarqube for the project

In order to start using SonarQube locally for the project, first make sure that the SonarQube server is up and running.

##### 1. Setting up the sonar key

- Go to `http://localhost:[SONARQUBE_SERVER_PORT]`
- Enter the Credentials _(default: admin:admin)_
- Go to `http://localhost:[SONARQUBE_SERVER_PORT]/account/security`
- In the `Tokens -> Generate Tokens` Add a name and select the type `Global Analysis Token`
- Generate and copy the before you leave token.
- Go to the `<root>` folder of the project
- Create a file `sonar.key`
- Open and past the token you copied from sonar.

2. Increase max map count

Open or create the `%USERPROFILE%\.wslconfig` file and add the following

```bash
[wsl2]
kernelCommandLine = "sysctl.vm.max_map_count=262144"
```

##### 3. Analyze project using SonarQube

- Make sure that the SonarQube server is up and running
- Run the script `.\scripts\sonarqube.ps1`
- Go to the following link where you should see the stat of the projects `http://localhost:[SONARQUBE_SERVER_PORT]/projects`
