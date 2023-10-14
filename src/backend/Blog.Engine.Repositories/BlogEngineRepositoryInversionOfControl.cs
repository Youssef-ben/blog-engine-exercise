using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Models.Settings;
using Blog.Engine.Repositories.Context;
using Blog.Engine.Repositories.Store.Categories;
using Blog.Engine.Repositories.Store.Posts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Blog.Engine.Repositories;

[ExcludeFromCodeCoverage]
public static class BlogEngineRepositoryInversionOfControl
{
  public static WebApplicationBuilder AddRepositoryServices(this WebApplicationBuilder self)
  {
    var settings = self.Configuration.GetSettingsFromConfiguration<DatabaseSettings>();

    self.Services.AddDbContext<BlogEngineDbContext>(options =>
    {
      options
          .UseNpgsql(settings.GetConnectionString())
          .UseSnakeCaseNamingConvention()
          .EnableSensitiveDataLogging();
    });

    self.Services
        .AddScoped<ICategoriesRepository, CategoriesRepository>()
        .AddScoped<IPostsRepository, PostsRepository>();

    return self;
  }

  public static WebApplication RunMigration(this WebApplication self)
  {
    self.Logger.LogInformation("Starting the database migration process!");
    using var scope = self.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<BlogEngineDbContext>();

    // If no database is applied then create a new database.
    var firstMigrationApplied = context.Database.GetAppliedMigrations().Any();
    if (!firstMigrationApplied)
    {
      self.Logger.LogInformation(
          "The database has been created but no migration were applied. Deleting the database and creating a new one!");

      context.Database.EnsureDeleted();
    }

    self.Logger.LogInformation("Running the migrations!");
    context.Database.Migrate();

    return self;
  }
}
