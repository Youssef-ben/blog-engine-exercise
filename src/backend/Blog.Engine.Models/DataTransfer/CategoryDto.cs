using Blog.Engine.Models.Domain;

namespace Blog.Engine.Models.DataTransfer;

public class CategoryDto
{
  public Guid Id { get; set; }

  public string Title { get; set; } = string.Empty;

  public static CategoryDto Map(Category model)
  {
    return new CategoryDto
    {
      Id = model.Id,
      Title = model.Title
    };
  }

  public static Pagination<CategoryDto> Map(Pagination<Category> list)
  {
    var result = list.Records
        .Select(Map)
        .ToList();

    return new Pagination<CategoryDto>(result, list.TotalRecords, list.PageNumber, list.RecordsPerPage);
  }
}
