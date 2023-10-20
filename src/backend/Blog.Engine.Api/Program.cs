using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Blog.Engine.Api.Configuration;
using Blog.Engine.Models.Settings;
using Blog.Engine.Models.Settings.Swagger;
using Blog.Engine.Repositories;
using Blog.Engine.Services;
using Microsoft.AspNetCore.Mvc;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

//============================ Services ============================= //
builder.Services
    .AddControllers()
    .AddJsonOptions(JsonSerializerOptionsExtensions.JsonOptions);

builder.Services
    .AddMvcCore(options => { options.Filters.Add<ModelStateValidationFilter>(); })
    .AddApiExplorer();

builder.Services
    .Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; })
    .AddResponseCompression()
    .AddEndpointsApiExplorer()
    .AddCors(x =>
    {
      x.AddPolicy("allow-all", options =>
      {
        options
            .AllowAnyHeader()
            .WithMethods("*")
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .WithOrigins("*");
      });
    });

var dllPath = Assembly.GetExecutingAssembly().Location;
var currentDirectory = Path.GetDirectoryName(dllPath);

// Default settings
builder.Configuration
    .SetBasePath(currentDirectory)
    .AddJsonFile("appsettings.json", false, true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName.ToLower()}.json", true, true);

builder.Host
    .UseSerilog((hostingContext, loggerConfiguration) =>
    {
      loggerConfiguration
          .ReadFrom
          .Configuration(hostingContext.Configuration);
    });


// Register the settings from the AppSetting file
builder
    .RegisterSetting<SwaggerSettings>()
    .AddSwaggerServices()
    .AddRepositoryServices()
    .AddBlogEngineServices();

var app = builder.Build();
//======================================================================== //

//============================ HTTP request pipeline ===================== //
if (!app.Environment.IsProduction())
{
  app.UseSwaggerService();
}

app.RunMigration();

app
    .UseCustomExceptionHandler()
    .UseCors("allow-all")
    .UseResponseCompression()
    .UseRouting()
    .UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.Run();

//======================================================================== //


[ExcludeFromCodeCoverage]
public partial class Program
{
  // Nothing to do, this is to exclude the file from code coverage only.
  public static Program CreateInstance()
  {
    return new Program();
  }
}
