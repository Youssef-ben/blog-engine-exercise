namespace Blog.Engine.Models.DataTransfer;

public class Pagination<TEntity>
    where TEntity : class
{
  public Pagination(ICollection<TEntity> records, int count, int pageNumber, int recordsPerPage)
  {
    Records = records;

    PageNumber = pageNumber;
    RecordsPerPage = recordsPerPage;

    FirstPage = 1;
    var total = count / recordsPerPage;
    LastPage = (int)Math.Ceiling((double)total);

    TotalRecords = count;

    var updatedPageId = PageNumber + 1;
    NextPage = updatedPageId > LastPage ? LastPage : updatedPageId;

    updatedPageId = PageNumber - 1;
    PreviousPage = updatedPageId < FirstPage ? FirstPage : updatedPageId;
  }

  public int PageNumber { get; }

  public int FirstPage { get; }

  public int LastPage { get; }

  public int RecordsPerPage { get; }

  public int NextPage { get; }

  public int PreviousPage { get; }

  public int TotalRecords { get; }

  public ICollection<TEntity> Records { get; }
}
