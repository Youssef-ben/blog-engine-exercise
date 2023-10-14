using Blog.Engine.Api.Controllers.V1;
using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Response;
using Blog.Engine.Services.Categories;
using Blog.Engine.Services.Posts;
using Blog.Engine.Tests.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Blog.Engine.Tests.UnitTests.Controllers;

public class CategoriesControllersTests
{
  private readonly CategoriesController _controller;
  private readonly Mock<IPostsService> _postServiceMock;
  private readonly Mock<ICategoriesService> _serviceMock;

  public CategoriesControllersTests()
  {
    _serviceMock = new Mock<ICategoriesService>();
    _postServiceMock = new Mock<IPostsService>();
    _controller = new CategoriesController(_serviceMock.Object, _postServiceMock.Object);
  }

  [Fact]
  public async Task CreateCategoryAsync_GivenCategoryId_WhenCreatingCategory_ThenCategoryIsReturned()
  {
    // Arrange
    var dto = ModelsHelpers.GetCreateCategoryDto("Test Category");
    var expected = ModelsHelpers.GetCategory(dto.Title);

    _serviceMock
        .Setup(it => it.CreateCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(expected);

    // Act
    var result = (CreatedResult)await _controller.CreateCategoryAsync(dto);

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status201Created);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<CategoryDto>>();
  }

  [Fact]
  public async Task UpdateCategoryAsync_GivenUpdatedCategory_WhenUpdating_ThenCategoryIsUpdated()
  {
    // Arrange
    var dto = ModelsHelpers.GetUpdateCategoryDto(Guid.NewGuid(), "Test Category");
    var domain = ModelsHelpers.GetCategory(dto.Title);

    _serviceMock
        .Setup(it => it.UpdateCategoryAsync(It.IsAny<Category>()))
        .ReturnsAsync(domain);

    // Act
    var result = (OkObjectResult)await _controller.UpdateCategoryAsync(dto);

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<CategoryDto>>();
  }

  [Fact]
  public async Task FetchCategoryAsync_GivenKnownCategoryId_WhenFetching_ThenCategoryIsReturned()
  {
    // Arrange
    var domain = ModelsHelpers.GetCategory("Test Category");

    _serviceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(domain);

    // Act
    var result = (OkObjectResult)await _controller.FetchCategoryAsync(domain.Id.ToString());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<CategoryDto>>();
  }

  [Fact]
  public async Task FetchCategoryAsync_GivenUnknownCategoryId_WhenFetching_ThenNotFoundStatusIsReturned()
  {
    // Arrange
    var domain = ModelsHelpers.GetCategory("UnknownCategory");

    // Act
    var result = (NotFoundObjectResult)await _controller.FetchCategoryAsync(domain.Id.ToString());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status404NotFound);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ErrorResponse>();
  }

  [Fact]
  public async Task SearchCategoriesAsync_GivenSearchQuery_WhenFetching_ThenPaginatedListOfCategoriesIsReturned()
  {
    // Arrange
    var categoriesList = new List<Category>
    {
      ModelsHelpers.GetCategory("Test Category 1"),
      ModelsHelpers.GetCategory("Test Category 2")
    };
    var paginatedList = new Pagination<Category>(categoriesList, categoriesList.Count, 1, 25);

    _serviceMock
        .Setup(it => it.SearchCategoriesAsync(It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (OkObjectResult)await _controller.SearchCategoriesAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status200OK);
    result.Value
        .Should()
        .NotBeNull()
        .And.BeOfType<ApiResponse<Pagination<CategoryDto>>>();
  }

  [Fact]
  public async Task SearchCategoriesAsync_GivenSearchQuery_WhenFetchingAndNoDataFound_ThenNoContentStatusIsReturned()
  {
    // Arrange
    var paginatedList = new Pagination<Category>(new List<Category>(), 0, 1, 25);

    _serviceMock
        .Setup(it => it.SearchCategoriesAsync(It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (NoContentResult)await _controller.SearchCategoriesAsync(new SearchQueryParameters());

    // Assert
    result.StatusCode
        .Should()
        .Be(StatusCodes.Status204NoContent);
  }

  [Fact]
  public async Task SearchPostsByCategoryAsync_GivenCategoryId_WhenSearchingPosts_ThenPostsAreReturned()
  {
    // Arrange
    var category = ModelsHelpers.GetCategory("Test Category");
    _serviceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(category);

    var postsList = new List<Post>
    {
      ModelsHelpers.GetPost(Guid.NewGuid()),
      ModelsHelpers.GetPost(Guid.NewGuid())
    };
    var paginatedList = new Pagination<Post>(postsList, postsList.Count, 1, 25);

    _postServiceMock
        .Setup(it => it.SearchPostsByCategoryAsync(It.IsAny<Guid>(), It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(paginatedList);

    // Act
    var result = (OkObjectResult)await _controller.SearchCategoryPostsAsync(
                                     category.Id.ToString(),
                                     new SearchQueryParameters());

    // Assert
    result.StatusCode.Should().Be(StatusCodes.Status200OK);
  }

  [Fact]
  public async Task SearchPostsByCategoryAsync_GivenUnknownCategoryId_WhenSearchingPosts_ThenNotFoundIsReturned()
  {
    // Arrange
    _serviceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(() => default);

    // Act
    var result = (NotFoundObjectResult)await _controller.SearchCategoryPostsAsync(
                                           Guid.NewGuid().ToString(),
                                           new SearchQueryParameters());

    // Assert
    result.StatusCode.Should().Be(StatusCodes.Status404NotFound);
  }

  [Fact]
  public async Task SearchPostsByCategoryAsync_GivenCategoryThatHasNoPosts_WhenSearchingPosts_ThenNotContentIsReturned()
  {
    // Arrange
    var category = ModelsHelpers.GetCategory("Test Category");
    _serviceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(category);

    _postServiceMock
        .Setup(it => it.SearchPostsByCategoryAsync(It.IsAny<Guid>(), It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(new Pagination<Post>(new List<Post>(), 0, 1, 25));

    // Act
    var result = (NoContentResult)await _controller.SearchCategoryPostsAsync(
                                      Guid.NewGuid().ToString(),
                                      new SearchQueryParameters());

    // Assert
    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);
  }
}
