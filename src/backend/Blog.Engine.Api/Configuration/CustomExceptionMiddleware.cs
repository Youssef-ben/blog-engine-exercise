using System.Diagnostics.CodeAnalysis;
using System.Net.Mime;
using System.Text.Json;
using Blog.Engine.Models.Exceptions;
using Blog.Engine.Models.Response;
using Blog.Engine.Models.Settings;
using Microsoft.AspNetCore.Diagnostics;

namespace Blog.Engine.Api.Configuration;

[ExcludeFromCodeCoverage]
public static class CustomExceptionMiddleware
{
  internal static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder self)
  {
    self.UseExceptionHandler(appError =>
    {
      appError.Run(async context =>
      {
        var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
        if (contextFeature is null)
        {
          return;
        }

        ErrorResponse error;
        if (contextFeature.Error is BaseException value)
        {
          context.Response.StatusCode = StatusCodes.Status400BadRequest;
          error = value.ErrorResponse;
        }
        else
        {
          context.Response.StatusCode = StatusCodes.Status500InternalServerError;
          error = new ErrorResponse
          {
            Code = "api.err.unexpected",
            UserMessage = "Oops, An unexpected error occurred while trying to handle your request!"
          };
        }

        var jsonResponse = JsonSerializer.Serialize(error, JsonSerializerOptionsExtensions.GetJsonOptions());
        context.Response.ContentType = MediaTypeNames.Application.Json;
        await context.Response.WriteAsync(jsonResponse);
        await context.Response.CompleteAsync();
      });
    });

    return self;
  }
}
