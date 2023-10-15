using System.Net;
using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Tests.IntegrationTests.Helpers;
using Blog.Engine.Tests.Models;
using FluentAssertions;
using Xunit.Priority;

namespace Blog.Engine.Tests.IntegrationTests.V1;

/// <summary>
///   To Reduce the amount of tests for this project i choose to use the
///   priority approach to organize the tests to run one after the other.
///   In real world application each test should be isolated.
/// </summary>
[TestCaseOrderer(PriorityOrderer.Name, PriorityOrderer.Assembly)]
public class CategoriesControllerTests : IClassFixture<WebApplicationFactoryFixture>
{
  private const string BASE_URL = "api/categories";
  private const string ADMIN_BASE_URL = $"{BASE_URL}/admin";
  private const string CATEGORY_TITLE = "Test Category";
  private static CategoryDto? _testCategory;
  private readonly HttpClient _client;

  public CategoriesControllerTests(WebApplicationFactoryFixture fixture)
  {
    _client = fixture.GetClient();
  }

  [Fact]
  [Priority(1)]
  public async Task GivenCategoryTitle_WhenCreating_ThenCategoryIsCreated()
  {
    // Arrange
    var createCategoryDto = ModelsHelpers.GetCreateCategoryDto(CATEGORY_TITLE);
    var bodyStringContent = IntegrationTestsHelpers.PreparePostContent(createCategoryDto);

    // Act
    var responseMessage = await _client.PostAsync(ADMIN_BASE_URL, bodyStringContent);

    // Assert
    var result = await responseMessage.GetSuccessResponseAsync<CategoryDto>();
    result.Should().NotBeNull();
    result?.Id.Should().NotBeEmpty();
    result?.Title.Should().NotBeNullOrEmpty()
        .And.BeEquivalentTo(CATEGORY_TITLE);
    _testCategory = result;
  }

  [Fact]
  [Priority(2)]
  public async Task GivenCategoryIdentifier_WhenFetchingTheCategory_ThenCategoryIsReturned()
  {
    // Act & Arrange
    var responseMessage = await _client.GetAsync($"{BASE_URL}/{CATEGORY_TITLE}");

    // Assert
    var result = await responseMessage.GetSuccessResponseAsync<CategoryDto>();
    result.Should().NotBeNull();
    result?.Id.Should().NotBeEmpty();
    result?.Title.Should().NotBeNullOrEmpty()
        .And.BeEquivalentTo(CATEGORY_TITLE);
  }

  [Fact]
  [Priority(3)]
  public async Task GivenUpdatedCategory_WhenUpdatingTheCategory_ThenCategoryIsUpdated()
  {
    // Arrange
    var model = new UpdateCategoryDto
    {
      Id = _testCategory?.Id ?? Guid.NewGuid(),
      Title = _testCategory?.Title is not null ? $"{_testCategory.Title} - Updated" : CATEGORY_TITLE
    };
    var bodyStringContent = IntegrationTestsHelpers.PreparePostContent(model);

    // Act
    var responseMessage = await _client.PutAsync(ADMIN_BASE_URL, bodyStringContent);

    // Assert
    var result = await responseMessage.GetSuccessResponseAsync<CategoryDto>();
    result.Should().NotBeNull();
    result?.Id.Should().NotBeEmpty();
    result?.Title.Should().NotBeNullOrEmpty()
        .And.Contain("Updated");
  }

  [Fact]
  [Priority(4)]
  public async Task GivenSearchKeyword_WhenSearchingTheCategory_ThenPaginatedOfCategoriesMatchingTheKeywordIsReturned()
  {
    // Arrange
    const string uri = $"{BASE_URL}?keyword=*U*&pageNumber=1&recordsPerPage=25";

    // Act
    var responseMessage = await _client.GetAsync(uri);

    // Assert
    responseMessage.EnsureSuccessStatusCode();
    responseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
  }
}
