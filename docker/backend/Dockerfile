## Base Image
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS base
WORKDIR /app
EXPOSE 80

## Building container
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /src
COPY ./src/backend/ .
RUN dotnet restore
RUN dotnet build -c Release -o /app/build

## Publishing container
FROM build AS publish 
RUN dotnet publish "Blog.Engine.Api/Blog.Engine.Api.csproj" -c Release -o /app/publish -r linux-x64 --self-contained false 

## App Container
FROM base AS api
WORKDIR /app
COPY --from=publish /app/publish . 
ENTRYPOINT ["dotnet", "Blog.Engine.Api.dll"]
