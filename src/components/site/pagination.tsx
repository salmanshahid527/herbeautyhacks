interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const maxVisible = 5;
  const start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Prev
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          aria-current={page === pageNumber ? "page" : undefined}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            page === pageNumber
              ? "bg-zinc-900 text-white"
              : "border border-zinc-300 text-zinc-700 hover:border-zinc-400"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </nav>
  );
};
