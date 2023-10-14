using System.Text.Json.Serialization;

namespace Blog.Engine.Models.Response;

public class ErrorResponse
{
  public string Code { get; set; } = string.Empty;

  public string UserMessage { get; set; } = string.Empty;

  [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
  public ICollection<string>? Errors { get; set; }
}
