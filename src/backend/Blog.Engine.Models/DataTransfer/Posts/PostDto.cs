using Blog.Engine.Models.Domain;

namespace Blog.Engine.Models.DataTransfer.Posts;

public class PostDto
{
  public Guid Id { get; set; }

  public Guid CategoryId { get; set; }

  public string Title { get; set; } = string.Empty;

  public string Content { get; set; } = string.Empty;

  public DateOnly PublicationDate { get; set; }

  public static PostDto Map(Post model)
  {
    return new PostDto
    {
      Id = model.Id,
      Title = model.Title,
      Content = model.Content,
      CategoryId = model.CategoryId,
      PublicationDate = model.PublicationDate
    };
  }

  public static Pagination<PostDto> Map(Pagination<Post> list)
  {
    var result = list.Records
        .Select(Map)
        .ToList();

    return new Pagination<PostDto>(result, list.TotalRecords, list.PageNumber, list.RecordsPerPage);
  }
}
