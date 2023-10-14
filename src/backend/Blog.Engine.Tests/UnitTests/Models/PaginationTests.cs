using Blog.Engine.Models.DataTransfer;
using FluentAssertions;

namespace Blog.Engine.Tests.UnitTests.Models;

public class PaginationTests
{
  [Fact]
  public void GivenPaginationWithValidValues_WhenGettingResult_ThenResultIsCorrect()
  {
    // Arrange
    var listOfValues = new List<string>
    {
      "value 1",
      "value 2"
    };

    // Act
    var result = new Pagination<string>(listOfValues, listOfValues.Count, 1, 25);

    // Assert
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(2);
    result.PageNumber.Should().Be(1);
    result.RecordsPerPage.Should().Be(25);
    result.FirstPage.Should().Be(1);
    result.LastPage.Should().Be(0);
    result.NextPage.Should().Be(0);
    result.PreviousPage.Should().Be(1);
  }

  [Fact]
  public void GivenPaginationWithMoreValuesThanRecordsPerPage_WhenGettingResult_ThenResultIsCorrect()
  {
    // Arrange
    var listOfValues = new List<string>();
    for (var count = 0; count < 10; count++)
    {
      listOfValues.Add($"Value {count}");
    }

    // Act
    var result = new Pagination<string>(listOfValues, listOfValues.Count, 1, 5);

    // Assert
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(10);
    result.PageNumber.Should().Be(1);
    result.RecordsPerPage.Should().Be(5);
    result.FirstPage.Should().Be(1);
    result.LastPage.Should().Be(2);
    result.NextPage.Should().Be(2);
    result.PreviousPage.Should().Be(1);
  }

  [Fact]
  public void GivenPaginationWithEmptyRecords_WhenGettingResult_ThenResultIsCorrect()
  {
    // Arrange
    var listOfValues = new List<string>();
    for (var count = 0; count < 20; count++)
    {
      listOfValues.Add($"Value {count}");
    }

    // Act
    var result = new Pagination<string>(listOfValues, listOfValues.Count, 3, 5);

    // Assert
    result.Records.Should().NotBeNull();
    result.TotalRecords.Should().Be(20);
    result.PageNumber.Should().Be(3);
    result.RecordsPerPage.Should().Be(5);
    result.FirstPage.Should().Be(1);
    result.LastPage.Should().Be(4);
    result.NextPage.Should().Be(4);
    result.PreviousPage.Should().Be(2);
  }
}
