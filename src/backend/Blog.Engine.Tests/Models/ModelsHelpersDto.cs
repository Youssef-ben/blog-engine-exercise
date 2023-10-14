using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.DataTransfer.Posts;

namespace Blog.Engine.Tests.Models;

public static partial class ModelsHelpers
{
  public static CreateCategoryDto GetCreateCategoryDto(string title)
  {
    return new CreateCategoryDto
    {
      Title = title
    };
  }

  public static UpdateCategoryDto GetUpdateCategoryDto(Guid id, string title)
  {
    return new UpdateCategoryDto
    {
      Id = id,
      Title = title
    };
  }

  public static CreatePostDto GetCreatePostDto(
      Guid categoryId,
      string title = "Post Title",
      string content = "Post Content")
  {
    return new CreatePostDto
    {
      Title = title,
      CategoryId = categoryId,
      Content = content,
      PublicationData = DateOnly.FromDateTime(DateTime.UtcNow)
    };
  }

  public static UpdatePostDto GetUpdatePostDto(
      Guid categoryId,
      string title = "Post Title",
      string content = "Post Content")
  {
    return new UpdatePostDto
    {
      Id = Guid.NewGuid(),
      Title = title,
      CategoryId = categoryId,
      Content = content,
      PublicationData = DateOnly.FromDateTime(DateTime.UtcNow)
    };
  }
}
