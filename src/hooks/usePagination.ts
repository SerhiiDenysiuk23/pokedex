import { useState } from "react";

interface UsePaginationProps {
  limit: number,
  count: number,
}

interface UsePaginationReturn {
  page: number;
  totalPages: number;
  offset: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

type UsePagination = (props: UsePaginationProps) => (UsePaginationReturn);

const usePagination: UsePagination = ({ limit, count }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / limit);
  const offset = (page - 1) * limit

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        return state === pageCount
          ? state
          : state + 1
      } else {
        return state === 1
          ? state
          : state - 1
      }
    })
  }
  const setPageSAFE = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount)
    } else if (num < 1) {
      setPage(1)
    } else {
      setPage(num)
    }
  }
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    offset,
    page,
  };
};
export default usePagination;