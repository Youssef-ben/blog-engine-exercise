using Blog.Engine.Models.Response;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Blog.Engine.Api.Configuration;

/// <summary>
///   Validate the state of the DTOs and throws an error with the exact field or message.
/// </summary>
[UsedImplicitly]
public class ModelStateValidationFilter : IActionFilter
{
  /// <inheritdoc />
  public void OnActionExecuting(ActionExecutingContext context)
  {
    if (context.ModelState.IsValid)
    {
      // Note: Don't set the result of the filter need to continue in the pipeline if all is good.
      return;
    }


    var validationErrors = context.ModelState.Keys
        .SelectMany(key => context.ModelState[key]!.Errors
            .Select(x => x.ErrorMessage))
        .ToList();

    var response = new ErrorResponse
    {
      Code = "api.err.validation.failed",
      UserMessage = "Invalid Model state, please fix the issues and try again!",
      Errors = validationErrors
    };

    // setting the result shortcuts the pipeline, so the action is never executed
    context.Result = new BadRequestObjectResult(response);
  }

  /// <inheritdoc />
  public void OnActionExecuted(ActionExecutedContext context)
  {
    // Method not supported, nothing to do here.
  }
}
