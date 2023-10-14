using System.Diagnostics.CodeAnalysis;
using JetBrains.Annotations;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Blog.Engine.Models.Settings.Swagger;

/// <summary>
///   Source : https://github.com/Microsoft/aspnet-api-versioning/wiki/Swashbuckle-Integration
///   Represents the Swagger/Swashbuckle operation filter used to provide default values.
/// </summary>
/// <remarks>
///   This <see cref="IOperationFilter" /> is only required due to bugs in the <see cref="SwaggerGenerator" />.
///   Once they are fixed and published, this class can be removed.
/// </remarks>
[UsedImplicitly]
[ExcludeFromCodeCoverage]
public class SwaggerDefaultValues : IOperationFilter
{
  public void Apply(OpenApiOperation operation, OperationFilterContext context)
  {
    if (operation.Parameters == null)
    {
      return;
    }

    foreach (var parameter in operation.Parameters)
    {
      var description = context.ApiDescription
          .ParameterDescriptions
          .First(p => p.Name == parameter.Name);

      var routeInfo = description.RouteInfo;

      parameter.Description ??= description.ModelMetadata?.Description;

      if (routeInfo is null)
      {
        continue;
      }

      parameter.Required |= !routeInfo.IsOptional;
    }
  }
}
