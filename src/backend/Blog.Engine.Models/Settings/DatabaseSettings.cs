using System.Diagnostics.CodeAnalysis;

namespace Blog.Engine.Models.Settings;

[ExcludeFromCodeCoverage]
public class DatabaseSettings
{
  public string Server { get; init; } = string.Empty;

  public int Port { get; init; }

  public string Catalog { get; init; } = string.Empty;

  public string User { get; init; } = string.Empty;

  public string Password { get; init; } = string.Empty;

  public string Template { get; init; } = string.Empty;

  public string GetConnectionString()
  {
    return string.Format(Template, Server, Port, Catalog, User, Password);
  }
}
