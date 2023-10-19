using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Exceptions;
using Blog.Engine.Repositories.Store.Posts;
using Blog.Engine.Services.Categories;
using Blog.Engine.Services.Posts;
using Blog.Engine.Tests.Models;
using FluentAssertions;
using Moq;

namespace Blog.Engine.Tests.UnitTests.Services;

public class PostsServiceTests
{
  private readonly Mock<ICategoriesService> _categoriesServiceMock;
  private readonly Mock<IPostsRepository> _repositoryMock;
  private readonly IPostsService _service;

  public PostsServiceTests()
  {
    _categoriesServiceMock = new Mock<ICategoriesService>();
    _repositoryMock = new Mock<IPostsRepository>();
    _service = new PostsService(_repositoryMock.Object, _categoriesServiceMock.Object);
  }

  [Fact]
  public async Task CreatePostAsync_GivenValidPost_WhenCreating_ThenPostIsCreated()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(categoryModel);

    _repositoryMock
        .Setup(it => it.CreatePostAsync(It.IsAny<Post>()))
        .ReturnsAsync(model);

    // Act
    var result = await _service.CreatePostAsync(model);

    // Assert
    result.Should().NotBeNull();
    result.CategoryId.Should().Be(model.CategoryId);
  }

  [Fact]
  public async Task CreatePostAsync_GivenEmptyValuesOfPost_WhenCreating_ThenValidationExceptionIsThrown()
  {
    // Arrange
    var model = new Post();

    // Act && Assert
    await _service
        .Invoking(it => it.CreatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("All the field of the post are required, please make sure all the fields are set!");
  }

  [Fact]
  public async Task CreatePostAsync_GivenInvalidCategoryToPost_WhenCreating_ThenValidationExceptionIsThrown()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(() => default);

    // Act && Assert
    await _service
        .Invoking(it => it.CreatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The given category for the post doesn't exist, please specify a valid category");
  }

  [Fact]
  public async Task CreatePostAsync_GivenExistingPostTitle_WhenCreating_ThenValidationExceptionIsThrown()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(categoryModel);

    _repositoryMock
        .Setup(it => it.FindPostAsync(It.IsAny<string>()))
        .ReturnsAsync(model);

    // Act && Assert
    await _service
        .Invoking(it => it.CreatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The specified post already exists!");
  }

  [Fact]
  public async Task UpdatePostAsync_GivenPost_WhenUpdating_ThenPostIsUpdated()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(categoryModel);

    _repositoryMock
        .Setup(it => it.UpdatePost(It.IsAny<Post>()))
        .Returns(model);

    // Act
    var result = await _service.UpdatePostAsync(model);

    // Assert
    result.Should().NotBeNull();
    result.CategoryId.Should().Be(model.CategoryId);
  }

  [Fact]
  public async Task UpdatePostAsync_GivenEmptyPostValues_WhenUpdating_ThenValidationFailedExceptionIsThrown()
  {
    // Arrange
    var model = new Post();

    // Act && Assert
    await _service
        .Invoking(it => it.UpdatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("All the field of the post are required, please make sure all the fields are set!");
  }

  [Fact]
  public async Task UpdatePostAsync_GivenUnknownCategoryToPost_WhenUpdating_ThenValidationFailedExceptionIsThrown()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(() => default);

    // Act && Assert
    await _service
        .Invoking(it => it.UpdatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The given category for the post doesn't exist, please specify a valid category");
  }

  [Fact]
  public async Task UpdatePostAsync_GivenPostValueThatAlreadyExists_WhenUpdating_ThenValidationFailedExceptionIsThrown()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Category 1");
    var model = ModelsHelpers.GetPost(categoryModel.Id);

    _categoriesServiceMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(categoryModel);

    _repositoryMock
        .Setup(it => it.FindPostAsync(It.IsAny<string>()))
        .ReturnsAsync(new Post
        {
          Id = Guid.NewGuid(),
          Title = model.Title,
          Content = model.Content,
          PublicationDate = model.PublicationDate,
          CategoryId = model.CategoryId
        });

    // Act && Assert
    await _service
        .Invoking(it => it.UpdatePostAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The specified post already exists!");
  }

  [Fact]
  public async Task FindPostAsync_GivenTitle_WhenFindingPost_ThenPostIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetPost(Guid.NewGuid());

    _repositoryMock
        .Setup(it => it.FindPostAsync(It.IsAny<string>()))
        .ReturnsAsync(model);

    // Act
    var result = await _service.FindPostAsync(model.Title);

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task FindPostAsync_GivenEmptyTitle_WhenFindingPost_ThenArgumentNulleExceptionIsThrown()
  {
    // Act && Assert
    await _service.Invoking(it => it.FindPostAsync(string.Empty))
        .Should()
        .ThrowAsync<ArgumentException>();
  }

  [Fact]
  public async Task SearchPostsAsync_GivenSearchParams_WhenSearching_ThenPaginatedListIsReturned()
  {
    // Arrange
    var postsList = new List<Post>
    {
      ModelsHelpers.GetPost(Guid.NewGuid()),
      ModelsHelpers.GetPost(Guid.NewGuid())
    };

    _repositoryMock
        .Setup(it => it.SearchPostsAsync(It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(new Pagination<Post>(postsList, postsList.Count, 1, 25));

    // Act
    var result = await _service.SearchPostsAsync(new SearchQueryParameters());

    // Assert
    result.Should().NotBeNull();
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(2);
  }

  [Fact]
  public async Task SearchPostsByCategoryAsync_GivenSearchParams_WhenSearching_ThenPaginatedListIsReturned()
  {
    // Arrange
    var categoryId = Guid.NewGuid();
    var postsList = new List<Post>
    {
      ModelsHelpers.GetPost(categoryId),
      ModelsHelpers.GetPost(Guid.NewGuid())
    };

    var searchResult = postsList.Where(post => post.CategoryId == categoryId).ToList();

    _repositoryMock
        .Setup(it => it.SearchPostsByCategoryAsync(It.IsAny<Guid>(), It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(new Pagination<Post>(searchResult, searchResult.Count, 1, 25));

    // Act
    var result = await _service.SearchPostsByCategoryAsync(categoryId, new SearchQueryParameters());

    // Assert
    result.Should().NotBeNull();
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(1);
  }
}
