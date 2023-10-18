using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Repositories.Context;
using Blog.Engine.Repositories.Store.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Blog.Engine.Repositories.Store.Categories;

// ADD
// UPDATE
// DELETE
// SEARCH
public class CategoriesRepository : ICategoriesRepository
{
  private readonly BlogEngineDbContext _dbContext;
  private readonly DbSet<Category> _table;

  public CategoriesRepository(BlogEngineDbContext context)
  {
    _dbContext = context;
    _table = _dbContext.Set<Category>();
  }

  public async Task<Category> CreateCategoryAsync(Category entity)
  {
    return (await _table.AddAsync(entity)).Entity;
  }

  public async Task<Pagination<Category>> SearchCategoriesAsync(SearchQueryParameters searchParams)
  {
    IQueryable<Category> queryable = _table.GetQuery()
        .OrderBy(x => x.Title);

    if (!string.IsNullOrWhiteSpace(searchParams.Keyword))
    {
      queryable = queryable
          .Where(x => EF.Functions.Like(x.Title, searchParams.Keyword));
    }

    return await queryable.ToPaginationAsync(searchParams.PageNumber, searchParams.RecordsPerPage);
  }

  public Category UpdateCategory(Category entity)
  {
    _dbContext.Entry(entity).State = EntityState.Modified;
    return entity;
  }

  public async Task<Category?> FindCategoryAsync(string identifier)
  {
    if (Guid.TryParse(identifier, out var id))
    {
      return await _table
                 .AsNoTracking()
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync();
    }

    return await _table
               .AsNoTracking()
               .Where(x => x.Title.ToLower() == identifier.ToLower())
               .FirstOrDefaultAsync();
  }

  public async Task ApplyChangesAsync()
  {
    await _dbContext.SaveChangesAsync();
    _dbContext.ChangeTracker.Clear();
  }
}
