using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Services.Posts;

public interface IPostsService
{
  Task<Post> CreatePostAsync(Post model);

  Task<Post> UpdatePostAsync(Post model);

  Task<Post?> FindPostAsync(string identifier);

  Task<Pagination<Post>> SearchPostsAsync(SearchQueryParameters searchParams, bool getAll = false);

  Task<Pagination<Post>> SearchPostsByCategoryAsync(Guid categoryId, SearchQueryParameters searchParams);
}
