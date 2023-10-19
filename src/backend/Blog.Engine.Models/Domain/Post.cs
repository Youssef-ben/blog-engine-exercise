namespace Blog.Engine.Models.Domain;

public class Post
{
  public Guid Id { get; set; }

  public Guid CategoryId { get; set; }

  public string Title { get; set; } = string.Empty;

  public string Content { get; set; } = string.Empty;

  public DateOnly PublicationDate { get; set; }

  public Category? Category { get; set; }
}
