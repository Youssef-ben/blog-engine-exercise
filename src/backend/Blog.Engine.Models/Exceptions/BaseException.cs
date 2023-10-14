using System.Diagnostics.CodeAnalysis;
using Blog.Engine.Models.Response;

namespace Blog.Engine.Models.Exceptions;

[ExcludeFromCodeCoverage]
public abstract class BaseException : Exception
{
  public readonly ErrorResponse ErrorResponse = new();

  protected BaseException()
  {
  }

  protected BaseException(string message)
      : base(message)
  {
  }

  protected BaseException(string message, Exception innerException)
      : base(message, innerException)
  {
  }
}
