using System.ComponentModel.DataAnnotations;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Models.DataTransfer;

public class UpdateCategoryDto
{
  [Required]
  public Guid Id { get; set; }

  [Required]
  public string Title { get; set; } = string.Empty;

  public Category ToDomain()
  {
    return new Category
    {
      Id = Id,
      Title = Title
    };
  }
}
