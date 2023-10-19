using Blog.Engine.Api.Controllers.V1;
using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.DataTransfer.Posts;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Response;
using Blog.Engine.Services.Posts;
using Blog.Engine.Tests.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Blog.Engine.Tests.UnitTests.Controllers;

public class PostsControllerTests
{
  private readonly PostsController _controller;
  private readonly Mock<IPostsService> _serviceMock;

  public PostsControllerTests()
  {
    _serviceMock = new Mock<IPostsService>();
    _controller = new PostsController(_serviceMock.Object);
  }

  [Fact]
  public async Task CreatePostAsync_GivenPostValues_WhenCreating_ThenPostIsCreated()
  {
    // Arrange
    var dto = ModelsHelpers.GetCreatePostDto(Guid.NewGuid());
    var expected = ModelsHelpers.GetPost(dto.CategoryId, dto.Title);

    _serviceMock
        .Setup(it => it.CreatePostAsync(It.IsAny<Post>()))
        .ReturnsAsync(expected);

    // Act
    var result = (CreatedResult)await _controller.CreatePostAsync(dto);

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status201Created);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<PostDto>>();
  }

  [Fact]
  public async Task UpdatePostAsync_GivenUpdatedPostValues_WhenUpdating_ThenPostIsUpdated()
  {
    // Arrange
    var dto = ModelsHelpers.GetUpdatePostDto(Guid.NewGuid());
    var expected = ModelsHelpers.GetPost(dto.CategoryId, dto.Title);

    _serviceMock
        .Setup(it => it.UpdatePostAsync(It.IsAny<Post>()))
        .ReturnsAsync(expected);

    // Act
    var result = (OkObjectResult)await _controller.UpdatePostAsync(dto);

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<PostDto>>();
  }

  [Fact]
  public async Task FetchPostAsync_GivenKnownPostId_WhenFetching_ThenPostIsReturned()
  {
    // Arrange
    var domain = ModelsHelpers.GetPost(Guid.NewGuid());

    _serviceMock
        .Setup(it => it.FindPostAsync(It.IsAny<string>()))
        .ReturnsAsync(domain);

    // Act
    var result = (OkObjectResult)await _controller.FetchPostAsync(domain.Id.ToString());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<PostDto>>();
  }

  [Fact]
  public async Task FetchPostAsync_GivenUnknownPostId_WhenFetching_ThenNotFoundIsReturned()
  {
    // Arrange
    var domain = ModelsHelpers.GetPost(Guid.NewGuid());

    _serviceMock
        .Setup(it => it.FindPostAsync(It.IsAny<string>()))
        .ReturnsAsync(() => default);

    // Act
    var result = (NotFoundObjectResult)await _controller.FetchPostAsync(domain.Id.ToString());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status404NotFound);
  }

  [Fact]
  public async Task FetchCategoriesAsync_GivenSearchQuery_WhenFetching_ThenPaginatedListOfCategoriesIsReturned()
  {
    // Arrange
    var postsList = new List<Post>
    {
      ModelsHelpers.GetPost(Guid.NewGuid()),
      ModelsHelpers.GetPost(Guid.NewGuid())
    };
    var paginatedList = new Pagination<Post>(postsList, postsList.Count, 1, 25);

    _serviceMock
        .Setup(it => it.SearchPostsAsync(It.IsAny<SearchQueryParameters>(), It.IsAny<bool>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (OkObjectResult)await _controller.SearchPostsAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<Pagination<PostDto>>>();
  }

  [Fact]
  public async Task FetchCategoriesAsync_GivenSearchQuery_WhenFetchingAndNoDataFound_ThenEmptyListIsReturned()
  {
    // Arrange
    var paginatedList = new Pagination<Post>(new List<Post>(), 0, 1, 25);

    _serviceMock
        .Setup(it => it.SearchPostsAsync(It.IsAny<SearchQueryParameters>(), It.IsAny<bool>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (NoContentResult)await _controller.SearchPostsAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status204NoContent);
  }


  [Fact]
  public async Task GetPostsAsync_GivenSearchQuery_WhenFetching_ThenPaginatedListOfCategoriesIsReturned()
  {
    // Arrange
    var postsList = new List<Post>
    {
      ModelsHelpers.GetPost(Guid.NewGuid()),
      ModelsHelpers.GetPost(Guid.NewGuid())
    };
    var paginatedList = new Pagination<Post>(postsList, postsList.Count, 1, 25);

    _serviceMock
        .Setup(it => it.SearchPostsAsync(It.IsAny<SearchQueryParameters>(), It.IsAny<bool>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (OkObjectResult)await _controller.GetPostsAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<Pagination<PostDto>>>();
  }

  [Fact]
  public async Task GetPostsAsync_GivenSearchQuery_WhenFetchingAndNoDataFound_ThenEmptyListIsReturned()
  {
    // Arrange
    var paginatedList = new Pagination<Post>(new List<Post>(), 0, 1, 25);

    _serviceMock
        .Setup(it => it.SearchPostsAsync(It.IsAny<SearchQueryParameters>(), It.IsAny<bool>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (NoContentResult)await _controller.GetPostsAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status204NoContent);
  }
}
