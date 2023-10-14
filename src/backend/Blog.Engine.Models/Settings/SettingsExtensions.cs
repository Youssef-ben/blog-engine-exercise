using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Engine.Models.Settings;

[ExcludeFromCodeCoverage]
public static class SettingsExtensions
{
  public static WebApplicationBuilder RegisterSetting<TSettings>(this WebApplicationBuilder self)
      where TSettings : class, new()
  {
    // Configure the config section.
    var iConfig = self.Configuration.GetSection(GetSectionFromClass<TSettings>());
    self.Services.Configure<TSettings>(iConfig);

    return self;
  }

  public static TSettings GetSettingsFromConfiguration<TSettings>(this IConfiguration self)
      where TSettings : class, new()
  {
    var section = GetSectionFromClass<TSettings>();
    var instance = new TSettings();
    self.Bind(section, instance);
    return instance;
  }

  private static string GetSectionFromClass<TSettingsClass>()
  {
    return typeof(TSettingsClass).Name.Replace("Settings", string.Empty);
  }
}
