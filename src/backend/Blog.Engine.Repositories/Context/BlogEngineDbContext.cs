using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blog.Engine.Repositories.Context;

[ExcludeFromCodeCoverage]
public class BlogEngineDbContext : DbContext
{
  public BlogEngineDbContext(DbContextOptions<BlogEngineDbContext> options)
      : base(options)
  {
  }

  public DbSet<Post> Posts { get; set; }

  public DbSet<Category> Categories { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder
        .Entity<Post>()
        .Property(x => x.Content)
        .HasColumnType("text");

    modelBuilder
        .Entity<Post>()
        .HasOne(x => x.Category)
        .WithMany(x => x.Posts)
        .HasForeignKey(ne => ne.CategoryId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("fk_post__category");

    modelBuilder
        .Entity<Category>()
        .HasIndex(x => x.Title)
        .IsUnique();
  }
}
