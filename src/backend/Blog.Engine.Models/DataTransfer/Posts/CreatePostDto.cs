using System.ComponentModel.DataAnnotations;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Models.DataTransfer.Posts;

public class CreatePostDto
{
  [Required]
  public Guid CategoryId { get; set; }

  [Required]
  public string Title { get; set; } = string.Empty;

  [Required]
  public string Content { get; set; } = string.Empty;

  [Required]
  public DateOnly PublicationData { get; set; }

  public Post ToDomain()
  {
    return new Post
    {
      CategoryId = CategoryId,
      Title = Title,
      Content = Content,
      PublicationData = PublicationData
    };
  }
}
