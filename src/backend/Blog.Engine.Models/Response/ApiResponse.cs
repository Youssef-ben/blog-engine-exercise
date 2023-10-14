using System.Text.Json.Serialization;

namespace Blog.Engine.Models.Response;

public class ApiResponse<TClass> : ErrorResponse
    where TClass : class
{
  [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
  public TClass? Results { get; set; }

  private new ICollection<string>? Errors { get; set; } = default;
}
