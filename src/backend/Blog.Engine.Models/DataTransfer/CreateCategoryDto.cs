using System.ComponentModel.DataAnnotations;

namespace Blog.Engine.Models.DataTransfer;

public class CreateCategoryDto
{
  [Required]
  public string Title { get; set; } = string.Empty;
}
