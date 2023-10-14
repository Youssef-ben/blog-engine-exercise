using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using JetBrains.Annotations;

namespace Blog.Engine.Models.Settings.Swagger;

[UsedImplicitly]
[ExcludeFromCodeCoverage]
public class SwaggerInformation
{
  [Required]
  public string Title { get; set; } = string.Empty;

  [Required]
  public string Description { get; set; } = string.Empty;

  [Required]
  public string License { get; set; } = string.Empty;

  [Required]
  public SwaggerContact? Contact { get; set; }
}
