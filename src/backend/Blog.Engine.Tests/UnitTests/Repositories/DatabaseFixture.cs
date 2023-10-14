using Blog.Engine.Repositories.Context;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Blog.Engine.Tests.UnitTests.Repositories;

[UsedImplicitly]
public class DatabaseFixture : IDisposable
{
  public BlogEngineDbContext DbContext { get; } = GetInMemoryDatabase();

  public void Dispose()
  {
    Dispose(true);
    GC.SuppressFinalize(this);
  }

  protected virtual void Dispose(bool disposing)
  {
    if (!disposing)
    {
      return;
    }

    DbContext.Dispose();
  }

  private static BlogEngineDbContext GetInMemoryDatabase()
  {
    var builder = new DbContextOptionsBuilder<BlogEngineDbContext>();
    builder.UseInMemoryDatabase(Guid.NewGuid().ToString());

    var dbContextOptions = builder.Options;
    var dbContext = new BlogEngineDbContext(dbContextOptions);

    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();

    return dbContext;
  }
}
