using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using JetBrains.Annotations;

namespace Blog.Engine.Models.Settings.Swagger;

[UsedImplicitly]
[ExcludeFromCodeCoverage]
public class SwaggerSettings
{
  [Required]
  public bool Enabled { get; set; }

  public bool AllowDocs { get; set; }

  public string Path { get; set; } = string.Empty;

  public SwaggerAuthentication? Authentication { get; set; }

  public SwaggerInformation? Information { get; set; }
}
