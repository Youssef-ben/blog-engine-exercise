using Blog.Engine.Models.DataTransfer;
using Blog.Engine.Models.Domain;

namespace Blog.Engine.Services.Categories;

public interface ICategoriesService
{
  Task<Category> CreateCategoryAsync(string title);

  Task<Category> UpdateCategoryAsync(Category category);

  Task<Category?> FindCategoryAsync(string identifier);

  Task<Pagination<Category>> SearchCategoriesAsync(SearchQueryParameters searchParams);
}
