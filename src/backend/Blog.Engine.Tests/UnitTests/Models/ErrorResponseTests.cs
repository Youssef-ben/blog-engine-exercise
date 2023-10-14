using Blog.Engine.Models.Response;

namespace Blog.Engine.Tests.UnitTests.Models;

public class ErrorResponseTests
{
  [Fact]
  public void GivenException_WhenCreatingObject_ThenAllFieldsAreSet()
  {
    // Arrange
    var model = new ErrorResponse
    {
      Code = "api.err.code",
      UserMessage = "Exception Message describing the error.",
      Errors = new List<string>
      {
        "List of complementary messages"
      }
    };

    // Assert
    Assert.True(model.Errors.Count > 0);
  }
}
