using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Exceptions;
using Blog.Engine.Repositories.Store.Posts;
using Blog.Engine.Services.Categories;

namespace Blog.Engine.Services.Posts;

public class PostsService : IPostsService
{
  private readonly ICategoriesService _categoriesService;
  private readonly IPostsRepository _repository;

  public PostsService(IPostsRepository repository, ICategoriesService categoriesService)
  {
    _repository = repository;
    _categoriesService = categoriesService;
  }

  public async Task<Post> CreatePostAsync(Post model)
  {
    await PreSaveValidation(model);

    var postExists = await _repository.FindPostAsync(model.Title);
    if (postExists is not null)
    {
      throw new ValidationException(
          "api.err.validation.post.exists",
          "The specified post already exists!");
    }

    model.Id = Guid.NewGuid();
    model = await _repository.CreatePostAsync(model);
    await _repository.ApplyChangesAsync();

    return model;
  }

  public async Task<Post> UpdatePostAsync(Post model)
  {
    await PreSaveValidation(model, true);

    var postExists = await _repository.FindPostAsync(model.Title);
    if (postExists is not null && postExists.Id != model.Id)
    {
      throw new ValidationException(
          "api.err.validation.post.exists",
          "The specified post already exists!");
    }

    model = _repository.UpdatePost(model);
    await _repository.ApplyChangesAsync();

    return model;
  }

  public async Task<Post?> FindPostAsync(string identifier)
  {
    ArgumentException.ThrowIfNullOrEmpty(identifier.Trim());

    return await _repository.FindPostAsync(identifier);
  }

  public async Task<Pagination<Post>> SearchPostsAsync(SearchQueryParameters searchParams, bool getAll = false)
  {
    return await _repository.SearchPostsAsync(searchParams, getAll);
  }

  public async Task<Pagination<Post>> SearchPostsByCategoryAsync(Guid categoryId, SearchQueryParameters searchParams)
  {
    return await _repository.SearchPostsByCategoryAsync(categoryId, searchParams);
  }

  private async Task PreSaveValidation(Post model, bool isEdit = false)
  {
    var today = DateTime.Now;
    if (model.CategoryId == Guid.Empty
        || string.IsNullOrEmpty(model.Title)
        || string.IsNullOrEmpty(model.Content)
        || (!isEdit && model.PublicationDate < new DateOnly(today.Year, today.Month, today.Day)))
    {
      throw new ValidationException(
          "api.err.validation.post.fields.required",
          "All the field of the post are required, please make sure all the fields are set!");
    }

    var category = await _categoriesService.FindCategoryAsync(model.CategoryId.ToString());
    if (category is null)
    {
      throw new ValidationException(
          "app.err.validation.posts.categoryNotFound",
          "The given category for the post doesn't exist, please specify a valid category");
    }
  }
}
