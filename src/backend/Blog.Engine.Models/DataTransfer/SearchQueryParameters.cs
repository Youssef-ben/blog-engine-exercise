namespace Blog.Engine.Models.DataTransfer;

public class SearchQueryParameters
{
  public const int PAGE_NUMBER = 1;
  public const int RECORDS_PER_PAGE = 25;
  public const int MAX_RECORDS_PER_PAGE = 100;

  private readonly string _keyword = string.Empty;
  private readonly int _pageNumber = PAGE_NUMBER;
  private readonly int _recordsPerPage = RECORDS_PER_PAGE;

  public string Keyword
  {
    get => _keyword;
    init => _keyword = SanitizeKeyword(value);
  }

  public int PageNumber
  {
    get => _pageNumber;
    init => _pageNumber = value < 1 ? PAGE_NUMBER : value;
  }

  public int RecordsPerPage
  {
    get => _recordsPerPage;
    init => _recordsPerPage = value is < 1 or > MAX_RECORDS_PER_PAGE
                                  ? RECORDS_PER_PAGE
                                  : value;
  }

  private static string SanitizeKeyword(string keyword)
  {
    return string.IsNullOrWhiteSpace(keyword)
               ? string.Empty
               : $"%{keyword.Trim().Replace('*', '%')}%".ToUpper();
  }
}
