using Asp.Versioning;
using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.DataTransfer.Posts;
using Blog.Engine.Models.Response;
using Blog.Engine.Services.Posts;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Engine.Api.Controllers.V1;

/// <summary>
///   Controller to expose all the endpoint actions that can applied to the posts.
/// </summary>
[ControllerName("Posts")]
[Route("api/posts")]
public class PostsController : BaseController
{
  private readonly IPostsService _service;

  public PostsController(IPostsService service)
  {
    _service = service;
  }

  /// <summary>
  ///   Create a new post
  /// </summary>
  /// <remarks>
  ///   Note: The service validate that the category exist before inserting
  ///   and that the title of the post is unique otherwise it return a Bad request.
  /// </remarks>
  /// <param name="model">The post data.</param>
  /// <returns>The newly created post</returns>
  /// <response code="201">{Success} - The post is created.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpPost("admin")]
  [ProducesResponseType(typeof(ApiResponse<PostDto>), StatusCodes.Status201Created)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> CreatePostAsync([FromBody] CreatePostDto model)
  {
    var result = await _service.CreatePostAsync(model.ToDomain());

    return ReturnSuccess(PostDto.Map(result), true);
  }

  /// <summary>
  ///   Update the specified Post
  /// </summary>
  /// <remarks>
  ///   Note: The service validate that the category exist before updating
  ///   and that the title of the post is unique otherwise it return a Bad request.
  /// </remarks>
  /// <param name="model">The post data.</param>
  /// <returns>The updated post</returns>
  /// <response code="200">{Success} - The Post is updated.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpPut("admin")]
  [ProducesResponseType(typeof(ApiResponse<PostDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> UpdatePostAsync([FromBody] UpdatePostDto model)
  {
    var domain = model.ToDomain();

    domain = await _service.UpdatePostAsync(domain);

    return ReturnSuccess(PostDto.Map(domain));
  }

  /// <summary>
  ///   Fetches the list of available posts ordered by date and title
  /// </summary>
  /// <returns>The list of posts</returns>
  /// <response code="200">{Success} - The list of posts.</response>
  /// <response code="204">{No Content} - No data was found.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet("admin")]
  [ProducesResponseType(typeof(ApiResponse<Pagination<PostDto>>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status204NoContent)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> GetPostsAsync([FromQuery] SearchQueryParameters searchParams)
  {
    var postsList = await _service.SearchPostsAsync(searchParams, true);
    return postsList.TotalRecords == 0
               ? NoContent()
               : ReturnSuccess(PostDto.Map(postsList));
  }

  /// <summary>
  ///   Fetch the specified Post
  /// </summary>
  /// <param name="identifier">The Post Id or title.</param>
  /// <returns>The specified Post</returns>
  /// <response code="200">{Success} - The Post.</response>
  /// <response code="400">{Bad Request} - Values or parameters are invalid.</response>
  /// <response code="404">{Not Found} - The element you're looking for doesn't exists.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet("{identifier}")]
  [ProducesResponseType(typeof(ApiResponse<PostDto>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> FetchPostAsync([FromRoute] string identifier)
  {
    var domain = await _service.FindPostAsync(identifier);
    return domain is null
               ? ReturnNotFound()
               : ReturnSuccess(PostDto.Map(domain));
  }

  /// <summary>
  ///   Fetches the list of available posts ordered by date and title
  /// </summary>
  /// <returns>The list of posts</returns>
  /// <response code="200">{Success} - The list of posts.</response>
  /// <response code="204">{No Content} - No data was found.</response>
  /// <response code="500">{Server Error} - An Internal server error occurred.</response>
  [HttpGet]
  [ProducesResponseType(typeof(ApiResponse<Pagination<PostDto>>), StatusCodes.Status200OK)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status204NoContent)]
  [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> SearchPostsAsync([FromQuery] SearchQueryParameters searchParams)
  {
    var postsList = await _service.SearchPostsAsync(searchParams);
    return postsList.TotalRecords == 0
               ? NoContent()
               : ReturnSuccess(PostDto.Map(postsList));
  }
}
