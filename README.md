# Blog Engine exercise

Blog Engine exercise aim to test the ability to create a system based on requirements

## Architecture

```txt
<root>/
  ├── /src
  |    ├── Backend/
  |    |    ├── Blog.Engine.Api
  |    |    ├── Blog.Engine.Models
  |    |    ├── Blog.Engine.Services
  |    |    ├── Blog.Engine.Repositories
  |    |    └── Blog.Engine.Tests
  |    |
  |    ├── Frontend/
  |    |    ├── .storybook/
  |    |    └── src/
  |    |        ├── Controller
  |    |        ├── Views
  |    |        └── Models
  |    |
  |    ├── ReadMe.md
  |    └── docker
```

### Tools

| Tech            | Desc                                   |
| --------------- | -------------------------------------- |
| Docker          | Containers Deployment (Docker-Compose) |
| Rider           | Backend IDE                            |
| VisualCode      | Frontend IDE                           |
| PgAdmin4        | Database GUI                           |
| Analyzer        | SonarQube                              |
| ReportGenerator | Generate Code coverage for backend     |
| Istanbul        | Generate Code coverage for frontend    |

### System Users

As an MVP the system will support two types of users that can interact with its content:

| User Type      | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| Admin          | Can create, edit, view and delete posts and categories         |
| Anonymous User | Can view all available posts/Categories and filter by category |

### Backend

Seen as the exercise is a simple one, I took the decision to use the classic approach for the Controllers combined with the Layered Architecture.

#### Tools and Framework

| Tool/Framework | Description                  |
| -------------- | ---------------------------- |
| CSharp         | Language                     |
| .Net 7+        | Framework                    |
| Web API        | Server                       |
| Ef Core        | ORM                          |
| PostgreSQL     | Database                     |
| Swagger        | Endpoints Documentation      |
| HealthCheck    | HealthCheck                  |
| Rate Limiting  | To prevent Denial of service |

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

This section present all the required steps to do for running the project locally or remote.

### Running the project using Docker

The following are the steps needed to run the project locally:

1. Setting the configuration

- Create an environment file `<root>/docker/.env.development` and override the variables that you want.
- Make sure that you updated/created the `appsettings.<env>.json` file to match the docker urls.

2. Testing the backend project

In order to make sure that the project is working as expected and nothing is broken run the following command in a powershell: _(Note: A browser window will open pointing to the Coverage Report)_

- `./scripts/generateTestsCoverage.ps1`

3. Start the infrastructure containers

From the `root` folder of the project run the following command in a powershell, it will build the api and start the infrastructure containers.
_Note: The api my need to be restarted in order to work the first time you setup your environment_

- `.\scripts\startDockerInfra.ps1`

### Setup SonarQube

See global sonarQube [Documentation](https://docs.sonarqube.org/latest/requirements/prerequisites-and-overview/)

#### Setting up sonarqube for the project

In order to start using SonarQube locally for the project, first make sure that the SonarQube server is up and running.

- Go to `http://localhost:[SONARQUBE_SERVER_PORT]`
- Enter the Credentials _(default: admin:admin)_
- Go to `http://localhost:[SONARQUBE_SERVER_PORT]/account/security`
- In the `Tokens -> Generate Tokens` Add a name and select the type `Global Analysis Token`
- Generate and copy the before you leave token.
- Go to the `<root>` folder of the project
- Create a file `sonar.key`
- Open and past the token you copied from sonar.

#### DotNet Core

1. Install required tools

Only use if the tools are not installed

```bash
dotnet tool install --global dotnet-sonarscanner
dotnet tool install --global dotnet-coverage
dotnet tool update dotnet-reportgenerator-globaltool -g
```

2. Increase max map count

Open or create the `%USERPROFILE%\.wslconfig` file and add the following

```bash
[wsl2]
kernelCommandLine = "sysctl.vm.max_map_count=262144"
```

2. Analyze project using SonarQube

- Make sure that the SonarQube server is up and running
- Run the script `.\scripts\sonarqube.ps1`
- Go to the following link where you should see the stat of the projects `http://localhost:[SONARQUBE_SERVER_PORT]/projects`
