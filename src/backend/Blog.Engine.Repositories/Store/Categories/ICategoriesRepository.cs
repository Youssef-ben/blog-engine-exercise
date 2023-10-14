using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Repositories.Store.Categories;

public interface ICategoriesRepository
{
  Task<Category?> FindCategoryAsync(string identifier);

  Task<Category> CreateCategoryAsync(Category entity);

  Category UpdateCategory(Category entity);

  Task<Pagination<Category>> SearchCategoriesAsync(SearchQueryParameters searchParams);

  Task ApplyChangesAsync();
}
