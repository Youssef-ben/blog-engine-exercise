using Asp.Versioning;
using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Response;
using Blog.Engine.Services.Categories;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Engine.Api.Controllers.V1;

/// <summary>
///   Controller to expose all the endpoint actions that can applied to the categories.
/// </summary>
[ControllerName("Categories")]
[Route("api/categories")]
public class CategoriesController : BaseController
{
  private readonly ICategoriesService _service;

  public CategoriesController(ICategoriesService service)
  {
    _service = service;
  }

  /// <summary>
  ///   Create a new Category
  /// </summary>
  /// <remarks>
  ///   Note: The service validate that the category doesn't exist before inserting
  ///   otherwise it return a Bad request.
  /// </remarks>
  /// <param name="model">The Category data.</param>
  /// <returns>The newly created category</returns>
  /// <response code="201">{Success} - The Category is created.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpPost("admin")]
  [ProducesResponseType(typeof(ApiResponse<CategoryDto>), StatusCodes.Status201Created)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> CreateCategoryAsync([FromBody] CreateCategoryDto model)
  {
    var result = await _service.CreateCategoryAsync(model.Title);

    return ReturnSuccess(CategoryDto.Map(result), true);
  }

  /// <summary>
  ///   Update the specified Category
  /// </summary>
  /// <remarks>
  ///   Note: The service validate that the new category value doesn't exist before updating
  ///   otherwise it return a Bad request.
  /// </remarks>
  /// <param name="model">The Category data.</param>
  /// <returns>The newly created category</returns>
  /// <response code="200">{Success} - The Category is created.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpPut("admin")]
  [ProducesResponseType(typeof(ApiResponse<CategoryDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> UpdateCategoryAsync([FromBody] UpdateCategoryDto model)
  {
    var domain = model.ToDomain();

    domain = await _service.UpdateCategoryAsync(domain);

    return ReturnSuccess(CategoryDto.Map(domain));
  }

  /// <summary>
  ///   Fetch the specified Category
  /// </summary>
  /// <param name="identifier">The Category Id or title.</param>
  /// <returns>The specified category</returns>
  /// <response code="200">{Success} - The Category.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="404">{Not Found} - The element you're looking for doesn't exists.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet("{identifier}")]
  [ProducesResponseType(typeof(ApiResponse<CategoryDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> FetchCategoryAsync([FromRoute] string identifier)
  {
    var domain = await _service.FindCategoryAsync(identifier);
    return domain is null
               ? ReturnNotFound()
               : ReturnSuccess(CategoryDto.Map(domain));
  }

  /// <summary>
  ///   Fetches the list of available categories ordered by date
  /// </summary>
  /// <returns>The list of categories</returns>
  /// <response code="200">{Success} - The list of categories.</response>
  /// <response code="204">{No Content} - No data was found.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet]
  [ProducesResponseType(typeof(ApiResponse<Pagination<CategoryDto>>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status204NoContent)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> FetchCategoriesAsync([FromQuery] SearchQueryParameters searchParams)
  {
    var categoriesList = await _service.SearchCategoriesAsync(searchParams);
    return categoriesList.TotalRecords == 0
               ? NoContent()
               : ReturnSuccess(CategoryDto.Map(categoriesList));
  }

  /// <summary>
  ///   Fetch the all the Category posts if any is found.
  /// </summary>
  /// <param name="identifier">The Category Id or title.</param>
  /// <returns>The list of the category posts</returns>
  /// <response code="200">{Success} - The list of the category posts.</response>
  /// <response code="204">{No Content} - No data was found.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="404">{Not Found} - The element you're looking for doesn't exists.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet("{identifier}/posts")]
  [ProducesResponseType(typeof(ApiResponse<CategoryDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status204NoContent)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> FetchCategoryPostsAsync([FromRoute] string identifier)
  {
    var domain = await _service.FindCategoryAsync(identifier);
    if (domain is null)
    {
      return ReturnNotFound();
    }

    // TODO: Fetch the paginated posts
    return ReturnSuccess(CategoryDto.Map(domain));
  }
}
