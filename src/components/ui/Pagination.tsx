import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const VenuePagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  return (
    <Stack className="my-10 items-center justify-center">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        sx={{
          "& .MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
            backgroundColor: "transparent",
            color: "#000000",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#FFC0AA",
            },
            "&.Mui-selected": {
              backgroundColor: "#FFC0AA",
              "&:hover": {
                backgroundColor: "#ffb09a",
              },
            },
            "&:focus": {
              border: "2px solid #000000",
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            fontWeight: "600",
          },
        }}
        shape="circular"
        size="large"
        siblingCount={0}
      />
    </Stack>
  );
};

export default VenuePagination;
