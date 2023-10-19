using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Repositories.Store.Categories;
using Blog.Engine.Repositories.Store.Posts;
using Blog.Engine.Tests.Models;
using FluentAssertions;

namespace Blog.Engine.Tests.UnitTests.Repositories.Store;

public class PostsRepositoryTests : IClassFixture<DatabaseFixture>
{
  private readonly ICategoriesRepository _categoriesRepository;
  private readonly IPostsRepository _repository;

  public PostsRepositoryTests(DatabaseFixture fixture)
  {
    _categoriesRepository = new CategoriesRepository(fixture.DbContext);
    _repository = new PostsRepository(fixture.DbContext);
  }

  [Fact]
  public async Task GivenPost_WhenCreating_ThenPostIsCreated()
  {
    // Arrange
    var model = ModelsHelpers.GetPost(Guid.NewGuid());

    // Act
    var result = await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    // Assert
    result.Should().NotBeNull();
    var postInDb = await _repository.FindPostAsync(model.Id.ToString());
    postInDb.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenPostTitle_WhenFetching_ThenPostIsReturned()
  {
    // Arrange
    var categoryModel = ModelsHelpers.GetCategory("Test");
    var model = ModelsHelpers.GetPost(Guid.NewGuid());
    model.CategoryId = categoryModel.Id;
    model.Category = categoryModel;

    model = await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var result = await _repository.FindPostAsync(model.Title);

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenPostId_WhenFetching_ThenPostIsReturned()
  {
    // Arrange
    var model = ModelsHelpers.GetPost(Guid.NewGuid());
    model = await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var result = await _repository.FindPostAsync(model.Id.ToString());

    // Assert
    result.Should().NotBeNull();
  }

  [Fact]
  public async Task GivenPost_WhenUpdating_ThenPostIsUpdated()
  {
    // Arrange
    const string title = "Post Title 1";
    var model = ModelsHelpers.GetPost(Guid.NewGuid(), title);
    model = await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    const string expectedTitle = $"{title} - Updated";
    model.Title = expectedTitle;

    // Act
    var result = _repository.UpdatePost(model);
    await _repository.ApplyChangesAsync();

    // Assert
    result.Should().NotBeNull();

    var PostInDb = await _repository.FindPostAsync(model.Id.ToString());
    PostInDb.Should().NotBeNull();
    PostInDb?.Title.Should().BeSameAs(expectedTitle);
  }

  [Fact]
  public async Task GivenSearchQuery_WhenSearching_ThenPaginatedListOfPostsIsReturned()
  {
    // Arrange
    var categoryId = Guid.NewGuid();
    var model = ModelsHelpers.GetPost(categoryId);
    await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    model = ModelsHelpers.GetPost(categoryId, "Second Post");
    await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var searchParams = new SearchQueryParameters
    {
      Keyword = "%p%",
      PageNumber = 0,
      RecordsPerPage = 300
    };
    var result = await _repository.SearchPostsAsync(searchParams);

    // Assert
    result.Should().NotBeNull();
    result.TotalRecords.Should().BeGreaterThanOrEqualTo(1);
  }

  [Fact]
  public async Task GivenSearchPostsByCategoryQuery_WhenSearching_ThenPaginatedListOfPostsIsReturned()
  {
    // Arrange
    var categoryId = Guid.NewGuid();
    var model = ModelsHelpers.GetPost(categoryId);
    await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    model = ModelsHelpers.GetPost(categoryId, "Second Post");
    await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    // Act
    var searchParams = new SearchQueryParameters
    {
      Keyword = "%p%",
      PageNumber = 0,
      RecordsPerPage = 300
    };
    var result = await _repository.SearchPostsByCategoryAsync(categoryId, searchParams);

    // Assert
    result.Should().NotBeNull();
    result.TotalRecords.Should().BeGreaterThanOrEqualTo(1);
  }
}
