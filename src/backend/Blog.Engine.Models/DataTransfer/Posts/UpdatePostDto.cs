using System.ComponentModel.DataAnnotations;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Models.DataTransfer.Posts;

public class UpdatePostDto
{
  [Required]
  public Guid Id { get; set; }

  [Required]
  public Guid CategoryId { get; set; }

  [Required]
  public string Title { get; set; } = string.Empty;

  [Required]
  public string Content { get; set; } = string.Empty;

  [Required]
  public DateOnly PublicationDate { get; set; }

  public Post ToDomain()
  {
    return new Post
    {
      Id = Id,
      CategoryId = CategoryId,
      Title = Title,
      Content = Content,
      PublicationDate = PublicationDate
    };
  }
}
