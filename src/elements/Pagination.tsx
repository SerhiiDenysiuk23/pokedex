import React from 'react';
import usePagination from "../hooks/usePagination";

interface Props {
  limit: number,
  count: number,

  setOffset(index: number): void
}

const Pagination: React.FC<Props> = ({count, limit, setOffset}) => {
  const {
    offset,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    limit: limit,
    count,
  })

  React.useEffect(() => {
    setOffset(offset);
  }, [offset]);


  const visiblePages: number[] = [];
  const maxVisiblePages = 7;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  if (totalPages <= maxVisiblePages) {
    visiblePages.push(...Array.from({ length: totalPages - 1 }, (_, i) => i + 1));
  } else if (page <= halfMaxVisiblePages) {
    visiblePages.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1), -1, totalPages);
  } else if (page > totalPages - halfMaxVisiblePages) {
    visiblePages.push(1, -1, ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => totalPages - maxVisiblePages + i + 1));
  } else {
    visiblePages.push(1, -1, ...Array.from({ length: maxVisiblePages - 4 }, (_, i) => page - halfMaxVisiblePages + i + 2), -1, totalPages);
  }

  return (
    <>
      {totalPages > 1 ? (
        <div className="pagination">
          <p className="text">
            {page}/{totalPages}
          </p>
          <button onClick={prevPage} className="page">
            &larr;
          </button>
          {visiblePages.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {
                (pageNumber < 0)
                  ? <span className="ellipsis">&hellip;</span>
                    : <button
                      onClick={() => setPage(pageNumber)}
                      className={`page ${page === pageNumber ? "active" : ""}`}
                    >
                      {pageNumber}
                    </button>

              }
            </React.Fragment>
          ))}
          <button onClick={nextPage} className="page">
            &rarr;
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;