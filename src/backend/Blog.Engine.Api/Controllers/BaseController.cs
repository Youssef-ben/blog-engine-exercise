using System.Net.Mime;
using Blog.Engine.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Engine.Api.Controllers;

/// <inheritdoc />
[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Consumes(MediaTypeNames.Application.Json)]
public class BaseController : ControllerBase
{
  protected IActionResult ReturnSuccess<TEntity>(TEntity? entity = default, bool returnCreated = false)
      where TEntity : class
  {
    var response = new ApiResponse<TEntity>
    {
      Results = entity,
      Code = "api.success",
      UserMessage = "SUCCESS"
    };
    return !returnCreated ? Ok(response) : Created(string.Empty, response);
  }

  protected IActionResult ReturnNotFound()
  {
    var response = new ErrorResponse
    {
      Code = "api.err.notFound",
      UserMessage = "Not Found - The element you're looking for was not found"
    };
    return NotFound(response);
  }
}
