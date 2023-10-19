using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Blog.Engine.Models.Response;

[ExcludeFromCodeCoverage]
public sealed class DateAndTimeOnlyJsonConverter : JsonConverter<DateOnly>
{
  public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    return DateOnly.FromDateTime(reader.GetDateTime());
  }

  public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
  {
    var isoDate = value.ToString("O");
    writer.WriteStringValue(isoDate);
  }
}
