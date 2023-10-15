using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Models.Settings;
using Blog.Engine.Models.Settings.Swagger;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Blog.Engine.Api.Configuration;

[ExcludeFromCodeCoverage]
internal static class SwaggerConfiguration
{
  internal static WebApplicationBuilder AddSwaggerServices(this WebApplicationBuilder self,
      bool requireSecurity = false)
  {
    var settings = self.Configuration.GetSettingsFromConfiguration<SwaggerSettings>();
    if (!settings.Enabled)
    {
      return self;
    }

    self.Services.AddSwaggerGen(options =>
    {
      // Fetch the xml comments to add them to swagger
      var xmlCommentsFilePath = Path.Combine(AppContext.BaseDirectory, "swagger_docs.xml");
      options.IncludeXmlComments(xmlCommentsFilePath);

      // Order Controllers and routes by controller then path then methods
      options
          .OrderActionsBy(apiDesc =>
              $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.RelativePath}_{apiDesc.HttpMethod}");

      options.SwaggerDoc("v1", new OpenApiInfo
      {
        Version = "v1",
        Title = settings.Information?.Title,
        Description = settings.Information?.Description,
        Contact = new OpenApiContact
        {
          Name = settings.Information?.Contact?.Name,
          Email = settings.Information?.Contact?.Email
        },
        License = new OpenApiLicense
        {
          Name = settings.Information?.License
        }
      });

      // Add Security Description
      if (requireSecurity)
      {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Scheme = "Bearer",
          BearerFormat = "JWT",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Description = "Please insert a valid JWT with Bearer into the field: [bearer {jwt-value}]"
        });
      }
    });

    return self;
  }

  internal static IApplicationBuilder UseSwaggerService(this IApplicationBuilder app)
  {
    var settings = app.ApplicationServices.GetService<IOptions<SwaggerSettings>>()?.Value;
    if (settings is null || !settings.Enabled)
    {
      return app;
    }

    return app
        .UseSwagger()
        .UseSwaggerUI(options =>
        {
          options.RoutePrefix = settings.Path;
          options.DocExpansion(DocExpansion.List);
          options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        });
  }
}
