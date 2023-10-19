using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Repositories.Context;
using Blog.Engine.Repositories.Store.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Blog.Engine.Repositories.Store.Posts;

public class PostsRepository : IPostsRepository
{
  private readonly BlogEngineDbContext _dbContext;
  private readonly DbSet<Post> _table;

  public PostsRepository(BlogEngineDbContext context)
  {
    _dbContext = context;
    _table = _dbContext.Set<Post>();
  }

  public Task<Post?> FindPostAsync(string identifier)
  {
    if (Guid.TryParse(identifier, out var id))
    {
      return _table
          .Where(post => post.Id == id)
          .AsNoTracking()
          .FirstOrDefaultAsync();
    }

    return _table
        .Where(post => post.Title.ToLower() == identifier.ToLower())
        .Include(e => e.Category)
        .AsNoTracking()
        .FirstOrDefaultAsync();
  }

  public async Task<Post> CreatePostAsync(Post entity)
  {
    return (await _table.AddAsync(entity)).Entity;
  }

  public Post UpdatePost(Post entity)
  {
    _dbContext.Entry(entity).State = EntityState.Modified;
    return entity;
  }

  public async Task ApplyChangesAsync()
  {
    await _dbContext.SaveChangesAsync();
    _dbContext.ChangeTracker.Clear();
  }

  public async Task<Pagination<Post>> SearchPostsAsync(SearchQueryParameters searchParams, bool getAll = false)
  {
    return await GetSearchPostsQueryAsync(searchParams, getAll)
               .Include(e => e.Category)
               .ToPaginationAsync(searchParams.PageNumber, searchParams.RecordsPerPage);
  }

  public async Task<Pagination<Post>> SearchPostsByCategoryAsync(
      Guid categoryId,
      SearchQueryParameters searchParams)
  {
    return await GetSearchPostsQueryAsync(searchParams)
               .Where(post => post.CategoryId == categoryId)
               .Include(e => e.Category)
               .ToPaginationAsync(searchParams.PageNumber, searchParams.RecordsPerPage);
  }

  private IQueryable<Post> GetSearchPostsQueryAsync(SearchQueryParameters searchParams, bool getAll = false)
  {
    IQueryable<Post> queryable = _table.GetQuery()
        .OrderByDescending(x => x.PublicationDate)
        .ThenBy(x => x.Title);

    if (!getAll)
    {
      queryable = queryable.Where(x => x.PublicationDate <= DateOnly.FromDateTime(DateTime.UtcNow));
    }


    if (!string.IsNullOrWhiteSpace(searchParams.Keyword))
    {
      queryable = queryable
          .Where(x => EF.Functions.Like(x.Title, searchParams.Keyword));
    }

    return queryable;
  }
}
