import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const PaginationComponent = ({ className = null, pageObject, setPage }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [currentPage, setCurrentPage] = useState(
    pageObject?.number ? pageObject.number + 1 : 1
  );
  const maxPagesDisplay = 3;

  useEffect(() => {
    setCurrentPage(pageObject?.number ? pageObject.number + 1 : 1);
  }, [pageObject]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageObject?.totalPages) {
      setPage(newPage - 1);
    }
  };

  const getStartIndex = () => {
    if (currentPage <= 2) {
      return 1;
    } else if (currentPage > pageObject?.totalPages - 2) {
      return pageObject?.totalPages - 2;
    } else {
      return currentPage - 1;
    }
  };

  const pagesToDisplay = () => {
    const startIndex = getStartIndex();
    return Array.from(
      { length: Math.min(maxPagesDisplay, pageObject?.totalPages) },
      (_, index) => startIndex + index
    );
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {isDesktop && (
          <>
            {pagesToDisplay().map((pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  isActive={currentPage === pageIndex}
                  onClick={() => handlePageChange(pageIndex)}
                >
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pageObject?.totalPages > getStartIndex() + maxPagesDisplay && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageObject?.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
