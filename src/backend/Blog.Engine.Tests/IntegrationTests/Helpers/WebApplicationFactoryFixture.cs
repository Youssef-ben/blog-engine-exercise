using Blog.Engine.Repositories.Context;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;

namespace Blog.Engine.Tests.IntegrationTests.Helpers;

[UsedImplicitly]
public class WebApplicationFactoryFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
  private readonly PostgreSqlContainer _dbContainer = new PostgreSqlBuilder()
      .WithImage("postgres:latest")
      .WithName(Guid.NewGuid().ToString())
      .WithDatabase("blog-engine")
      .WithUsername("root")
      .WithPassword("L0cal!P@1_59&7-53")
      .WithCleanUp(true)
      .WithAutoRemove(true)
      .Build();

  public Task InitializeAsync()
  {
    return _dbContainer.StartAsync();
  }

  public new Task DisposeAsync()
  {
    return _dbContainer.StopAsync();
  }

  protected override void ConfigureWebHost(IWebHostBuilder builder)
  {
    // Arrange
    const string env = "Testing";
    builder.UseEnvironment(env);
    Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", env);

    // Override
    builder.ConfigureTestServices(services =>
    {
      // Remove any DbContext configuration
      var dbContextOptions = services
          .SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<BlogEngineDbContext>));
      if (dbContextOptions is not null)
      {
        services.Remove(dbContextOptions);
      }

      // Setup the DbContext
      services.AddDbContext<BlogEngineDbContext>(options =>
      {
        options.UseNpgsql(_dbContainer.GetConnectionString())
            .UseSnakeCaseNamingConvention();
      });
    });

    base.ConfigureWebHost(builder);
  }

  public HttpClient GetClient()
  {
    return CreateClient(new WebApplicationFactoryClientOptions
    {
      AllowAutoRedirect = false
    });
  }
}
