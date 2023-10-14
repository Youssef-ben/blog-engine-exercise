using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Services.Categories;
using Blog.Engine.Services.Posts;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Engine.Services;

[ExcludeFromCodeCoverage]
public static class BlogEngineServicesInversionOfControl
{
  public static WebApplicationBuilder AddBlogEngineServices(this WebApplicationBuilder self)
  {
    self.Services
        .AddScoped<ICategoriesService, CategoriesService>()
        .AddScoped<IPostsService, PostsService>();

    return self;
  }
}
