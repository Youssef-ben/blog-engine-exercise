namespace Blog.Engine.Models.Domain;

public class Category
{
  public Guid Id { get; set; }

  public string Title { get; set; } = string.Empty;

  public ICollection<Post> Posts { get; set; } = new List<Post>();
}
