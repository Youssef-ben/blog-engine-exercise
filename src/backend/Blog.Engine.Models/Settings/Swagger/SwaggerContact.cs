using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using JetBrains.Annotations;

namespace Blog.Engine.Models.Settings.Swagger;

[UsedImplicitly]
[ExcludeFromCodeCoverage]
public class SwaggerContact
{
  [Required]
  public string Name { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = string.Empty;
}
