using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Exceptions;
using Blog.Engine.Repositories.Store.Categories;
using Blog.Engine.Services.Categories;
using Blog.Engine.Tests.Models;
using FluentAssertions;
using Moq;

namespace Blog.Engine.Tests.UnitTests.Services;

public class CategoriesServicesTests
{
  private readonly Mock<ICategoriesRepository> _repositoryMock;
  private readonly ICategoriesService _service;

  public CategoriesServicesTests()
  {
    _repositoryMock = new Mock<ICategoriesRepository>();
    _service = new CategoriesService(_repositoryMock.Object);
  }

  [Fact]
  public async Task CreateCategoryAsync_GivenCategoryTitle_WhenCreatingCategory_ThenCategoryIsCreated()
  {
    // Arrange
    const string title = "Test Category";
    var model = ModelsHelpers.GetCategory(title);

    _repositoryMock
        .Setup(it => it.CreateCategoryAsync(It.IsAny<Category>()))
        .ReturnsAsync(model);

    // Act
    var result = await _service.CreateCategoryAsync(title);

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task CreateCategoryAsync_GivenEmptyCategoryTitle_WhenCreatingCategory_ThenArgumentExceptionIsThrown()
  {
    // Arrange && Act && Assert
    await _service.Invoking(
            it => it.CreateCategoryAsync(string.Empty))
        .Should()
        .ThrowAsync<ArgumentException>();
  }

  [Fact]
  public async Task
      CreateCategoryAsync_GivenExistingCategoryTitle_WhenCreatingCategory_ThenValidationExceptionIsThrown()
  {
    // Arrange
    const string title = "Test Category";
    var model = ModelsHelpers.GetCategory(title);

    _repositoryMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(model);

    // Act && Assert
    await _service.Invoking(
            it => it.CreateCategoryAsync(title))
        .Should()
        .ThrowAsync<ValidationException>();
  }

  [Fact]
  public async Task UpdateCategoryAsync_GivenUpdatedCategory_WhenUpdatingCategory_ThenCategoryIsUpdated()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory("Updated");

    _repositoryMock
        .SetupSequence(it => it.FindCategoryAsync(It.IsAny<string>()))!
        .ReturnsAsync<Category>(model)
        .ReturnsAsync(() => null!);

    _repositoryMock
        .Setup(it => it.UpdateCategory(It.IsAny<Category>()))
        .Returns(model);

    // Act
    var result = await _service.UpdateCategoryAsync(model);

    // Assert
    result.Should().NotBeNull();
    result.Id.Should().Be(model.Id);
    result.Title.Should().BeSameAs(model.Title);
  }

  [Fact]
  public async Task
      UpdateCategoryAsync_GivenUnknownUpdatedCategory_WhenUpdatingCategory_ThenValidationExceptionIsThrown()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory("Updated");

    _repositoryMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(() => null!);

    // Act
    await _service
        .Invoking(it => it.UpdateCategoryAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The specified category doesn't exists!");
  }

  [Fact]
  public async Task UpdateCategoryAsync_GivenExistingCategory_WhenUpdatingCategory_ThenValidationExceptionIsThrown()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory("Updated");

    _repositoryMock
        .SetupSequence(it => it.FindCategoryAsync(It.IsAny<string>()))!
        .ReturnsAsync<Category>(model)
        .ReturnsAsync(new Category
        {
          Id = Guid.NewGuid(),
          Title = model.Title
        });

    // Act
    await _service
        .Invoking(it => it.UpdateCategoryAsync(model))
        .Should()
        .ThrowAsync<ValidationException>()
        .WithMessage("The specified category already exists!");
  }

  [Fact]
  public async Task SearchCategoriesAsync_GivenSearchParams_WhenSearchingCategories_ThenPaginatedListIsReturned()
  {
    // Arrange
    var categoriesList = new List<Category>
    {
      ModelsHelpers.GetCategory("Test Category 1"),
      ModelsHelpers.GetCategory("Test Category 2")
    };

    _repositoryMock
        .Setup(it => it.SearchCategoriesAsync(It.IsAny<SearchQueryParameters>()))
        .ReturnsAsync(new Pagination<Category>(categoriesList, categoriesList.Count, 1, 25));

    // Act
    var result = await _service.SearchCategoriesAsync(new SearchQueryParameters());

    // Assert
    result.Should().NotBeNull();
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(2);
  }

  [Fact]
  public async Task FindCategoryAsync_GivenTitle_WhenFindingCategory_ThenListIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory("Test Category 1");

    _repositoryMock
        .Setup(it => it.FindCategoryAsync(It.IsAny<string>()))
        .ReturnsAsync(model);

    // Act
    var result = await _service.FindCategoryAsync(model.Title);

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task FindCategoryAsync_GivenEmptyTitle_WhenFindingCategory_ThenListIsReturned()
  {
    // Act && Assert
    await _service.Invoking(it => it.FindCategoryAsync(string.Empty))
        .Should()
        .ThrowAsync<ArgumentException>();
  }
}
