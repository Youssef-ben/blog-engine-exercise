using Blog.Engine.Models.Domain;

namespace Blog.Engine.Tests.Models;

public static partial class ModelsHelpers
{
  public static Category GetCategory(string title, Guid? id = default)
  {
    return new Category
    {
      Id = id ?? Guid.NewGuid(),
      Title = title,
      Posts = new List<Post>()
    };
  }

  public static Post GetPost(Guid categoryId, string title, string? content = default)
  {
    return new Post
    {
      Id = Guid.NewGuid(),
      Title = title,
      Content = content ?? string.Empty,
      CategoryId = categoryId,
      PublicationData = DateOnly.FromDateTime(DateTime.UtcNow),
      Category = default
    };
  }
}
