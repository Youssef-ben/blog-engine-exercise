using System.Data.Entity;
using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Models.DataTransfer;
using Microsoft.EntityFrameworkCore;

namespace Blog.Engine.Repositories.Store.Extensions;

[ExcludeFromCodeCoverage]
public static class ExpressionExtensions
{
  public static async Task<Pagination<TEntity>> ToPaginationAsync<TEntity>(this IQueryable<TEntity> source, int pageId,
      int recordsPerPage)
      where TEntity : class
  {
    var count = await EntityFrameworkQueryableExtensions.CountAsync(source);

    var records = await EntityFrameworkQueryableExtensions.ToListAsync(source
                      .Skip(recordsPerPage * (pageId - 1))
                      .Take(recordsPerPage));

    return new Pagination<TEntity>(records, count, pageId, recordsPerPage);
  }

  public static IQueryable<TEntity> GetQuery<TEntity>(this Microsoft.EntityFrameworkCore.DbSet<TEntity> self)
      where TEntity : class
  {
    return QueryableExtensions
        .AsNoTracking(self);
  }
}
