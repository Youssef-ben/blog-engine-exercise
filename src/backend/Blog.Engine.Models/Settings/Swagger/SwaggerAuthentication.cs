using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using JetBrains.Annotations;

namespace Blog.Engine.Models.Settings.Swagger;

[UsedImplicitly]
[ExcludeFromCodeCoverage]
public class SwaggerAuthentication
{
  [Required]
  public string Schema { get; set; } = string.Empty;

  [Required]
  public string Name { get; set; } = string.Empty;

  [Required]
  public string Description { get; set; } = string.Empty;
}
