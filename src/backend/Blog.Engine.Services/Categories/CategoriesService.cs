using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;
using Blog.Engine.Models.Exceptions;
using Blog.Engine.Repositories.Store.Categories;

namespace Blog.Engine.Services.Categories;

public class CategoriesService : ICategoriesService
{
  private readonly ICategoriesRepository _repository;

  public CategoriesService(ICategoriesRepository repository)
  {
    _repository = repository;
  }

  public async Task<Category> CreateCategoryAsync(string title)
  {
    ArgumentException.ThrowIfNullOrEmpty(title.Trim());

    var exists = await _repository.FindCategoryAsync(title);
    if (exists is not null)
    {
      throw new ValidationException("api.err.validation.category.exists", "The specified category already exists!");
    }

    var entity = new Category
    {
      Id = Guid.NewGuid(),
      Title = title
    };
    entity = await _repository.CreateCategoryAsync(entity);
    await _repository.ApplyChangesAsync();

    return entity;
  }

  public async Task<Category> UpdateCategoryAsync(Category category)
  {
    ArgumentNullException.ThrowIfNull(category);

    var entity = await _repository.FindCategoryAsync(category.Id.ToString());
    if (entity is null)
    {
      throw new ValidationException(
          "api.err.validation.category.notFound",
          "The specified category doesn't exists!");
    }

    var exists = await _repository.FindCategoryAsync(category.Title);
    if (exists is not null && exists.Id != category.Id)
    {
      throw new ValidationException("api.err.validation.category.exists", "The specified category already exists!");
    }

    entity = _repository.UpdateCategory(category);
    await _repository.ApplyChangesAsync();

    return entity;
  }

  public async Task<Pagination<Category>> SearchCategoriesAsync(SearchQueryParameters searchParams)
  {
    return await _repository.SearchCategoriesAsync(searchParams);
  }

  public async Task<Category?> FindCategoryAsync(string identifier)
  {
    ArgumentException.ThrowIfNullOrEmpty(identifier.Trim());

    return await _repository.FindCategoryAsync(identifier);
  }
}
