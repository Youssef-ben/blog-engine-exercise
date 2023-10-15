using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Http.Json;
using System.Net.Mime;
using System.Text;
using System.Text.Json;
using Blog.Engine.Models.Response;
using Blog.Engine.Models.Settings;
using FluentAssertions;

namespace Blog.Engine.Tests.IntegrationTests.Helpers;

public static class IntegrationTestsHelpers
{
  public static StringContent PreparePostContent<TRequestDto>([NotNull] TRequestDto dto)
      where TRequestDto : class
  {
    var json = dto.SerializeObject();
    return new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);
  }

  public static async Task<TDto?> GetSuccessResponseAsync<TDto>(this HttpResponseMessage self)
      where TDto : class
  {
    self.EnsureSuccessStatusCode();
    var apiResponse =
        await self.Content.ReadFromJsonAsync<ApiResponse<TDto>>(JsonSerializerOptionsExtensions.GetJsonOptions());
    if (apiResponse is null)
    {
      Assert.Fail("Empty Response!");
    }

    return apiResponse.Results;
  }

  public static async Task<ErrorResponse> GetBadRequestAsync(this HttpResponseMessage self)
  {
    self.StatusCode.Should().Be(HttpStatusCode.BadRequest);

    var apiResponse = await self.Content.ReadFromJsonAsync<ErrorResponse>();
    if (apiResponse is null)
    {
      Assert.Fail("Empty Response!");
    }

    return apiResponse;
  }

  public static async Task<ErrorResponse> GetNotFoundAsync(this HttpResponseMessage self)
  {
    self.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var apiResponse = await self.Content.ReadFromJsonAsync<ErrorResponse>();
    if (apiResponse is null)
    {
      Assert.Fail("Empty Response!");
    }

    return apiResponse;
  }

  private static string SerializeObject<TObject>(this TObject self, bool writeIndented = true)
      where TObject : class
  {
    return JsonSerializer.Serialize(self, JsonSerializerOptionsExtensions.GetJsonOptions(writeIndented));
  }
}
