using Blog.Engine.Models.DataTransfer;

namespace Blog.Engine.Tests.Models;

public static partial class ModelsHelpers
{
  public static CategoryDto GetCreateCategoryDto(Guid id, string title)
  {
    return new CategoryDto
    {
      Id = id,
      Title = title
    };
  }

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
}
