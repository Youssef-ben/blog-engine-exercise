using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Repositories.Store.Posts;

public interface IPostsRepository
{
  Task<Post?> FindPostAsync(string identifier);

  Task<Post> CreatePostAsync(Post entity);

  Post UpdatePost(Post entity);

  Task<Pagination<Post>> SearchPostsAsync(SearchQueryParameters searchParams);

  Task<Pagination<Post>> SearchPostsByCategoryAsync(Guid categoryId, SearchQueryParameters searchParams);

  Task ApplyChangesAsync();
}
