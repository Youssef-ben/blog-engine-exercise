using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Repositories.Store.Categories;
using Blog.Engine.Tests.Models;
using FluentAssertions;

namespace Blog.Engine.Tests.UnitTests.Repositories.Store;

public class CategoriesRepositoryTests : IClassFixture<DatabaseFixture>
{
  private const string CATEGORY_TITLE = "Test Category";

  private readonly ICategoriesRepository _repository;

  public CategoriesRepositoryTests(DatabaseFixture fixture)
  {
    _repository = new CategoriesRepository(fixture.DbContext);
  }

  [Fact]
  public async Task GivenCategory_WhenCreating_ThenCategoryIsCreated()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);

    // Act
    var result = await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    // Assert
    result.Should().NotBeNull();
    var categoryInDb = await _repository.FindCategoryAsync(model.Id.ToString());
    categoryInDb.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenCategory_WhenUpdating_ThenCategoryIsUpdated()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);
    model = await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    const string expectedTitle = $"{CATEGORY_TITLE} - Updated";
    model.Title = expectedTitle;

    // Act
    var result = _repository.UpdateCategory(model);
    await _repository.ApplyChangesAsync();

    // Assert
    result.Should().NotBeNull();

    var categoryInDb = await _repository.FindCategoryAsync(model.Id.ToString());
    categoryInDb.Should().NotBeNull();
    categoryInDb?.Title.Should().BeSameAs(expectedTitle);
  }

  [Fact]
  public async Task GivenCategoryTitle_WhenFetching_ThenCategoryIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);
    model = await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var result = await _repository.FindCategoryAsync(model.Title);

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenCategoryId_WhenFetching_ThenCategoryIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);
    model = await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var result = await _repository.FindCategoryAsync(model.Id.ToString());

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenDefaultSearchQuery_WhenSearching_ThenPaginatedListOfCategoriesIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);
    await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    model = ModelsHelpers.GetCategory($"{CATEGORY_TITLE} - 2");
    await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var searchParams = new SearchQueryParameters
    {
      Keyword = string.Empty,
      PageNumber = 1,
      RecordsPerPage = 25
    };
    var result = await _repository.SearchCategoriesAsync(searchParams);

    // Assert
    result.Should().NotBeNull();
    result.TotalRecords.Should().BeGreaterThanOrEqualTo(2);
  }

  [Fact]
  public async Task GivenSearchQuery_WhenSearching_ThenPaginatedListOfCategoriesIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetCategory(CATEGORY_TITLE);
    await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    model = ModelsHelpers.GetCategory($"{CATEGORY_TITLE} - 2");
    await _repository.CreateCategoryAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var searchParams = new SearchQueryParameters
    {
      Keyword = "%2%",
      PageNumber = 0,
      RecordsPerPage = 300
    };
    var result = await _repository.SearchCategoriesAsync(searchParams);

    // Assert
    result.Should().NotBeNull();
    result.TotalRecords.Should().BeGreaterThanOrEqualTo(1);
  }
}
