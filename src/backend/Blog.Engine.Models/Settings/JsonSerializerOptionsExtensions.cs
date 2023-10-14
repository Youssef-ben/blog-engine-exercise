using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Engine.Models.Settings;

[ExcludeFromCodeCoverage]
public static class JsonSerializerOptionsExtensions
{
  public static readonly Action<JsonOptions> JsonOptions = opt =>
  {
    var config = GetJsonOptions();
    opt.JsonSerializerOptions.WriteIndented = config.WriteIndented;
    opt.JsonSerializerOptions.AllowTrailingCommas = config.AllowTrailingCommas;
    opt.JsonSerializerOptions.ReferenceHandler = config.ReferenceHandler;
    opt.JsonSerializerOptions.PropertyNamingPolicy = config.PropertyNamingPolicy;
    opt.JsonSerializerOptions.DefaultIgnoreCondition = config.DefaultIgnoreCondition;
  };

  public static JsonSerializerOptions GetJsonOptions(bool writeIndentation = true)
  {
    var option = new JsonSerializerOptions
    {
      WriteIndented = writeIndentation,
      AllowTrailingCommas = false,
      ReferenceHandler = ReferenceHandler.IgnoreCycles,
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
      DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    return option;
  }
}
