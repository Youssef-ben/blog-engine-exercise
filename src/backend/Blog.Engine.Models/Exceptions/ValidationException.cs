using System.Diagnostics.CodeAnalysis;

namespace Blog.Engine.Models.Exceptions;

[ExcludeFromCodeCoverage]
public class ValidationException : BaseException
{
  public ValidationException(string code, string message)
      : base(message)
  {
    ErrorResponse.Code = code;
    ErrorResponse.UserMessage = message;
  }
}
