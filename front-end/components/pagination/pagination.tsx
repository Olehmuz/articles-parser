import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationState } from "@tanstack/react-table"
import { Dispatch, SetStateAction } from "react"

export function PaginationDemo({ pageIndex, pageSize, totalPage, setPagination }: { pageIndex: number, pageSize: number, totalPage: number, setPagination: Dispatch<SetStateAction<PaginationState>> }) {
  const currentPage = pageIndex + 1
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && 
          <>
          <PaginationItem onClick={() => setPagination({ pageIndex: pageIndex - 1, pageSize })}>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem onClick={() => setPagination({ pageIndex: pageIndex - 1, pageSize })}>
            <PaginationLink href="#">{currentPage - 1}</PaginationLink>
          </PaginationItem>
        </>
        }
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {
          currentPage < totalPage &&
          <>
            <PaginationItem onClick={() => setPagination({ pageIndex: pageIndex + 1, pageSize })}>
              <PaginationLink href="#">{currentPage + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => setPagination({ pageIndex: pageIndex + 1, pageSize })}>
              <PaginationNext href="#" />
            </PaginationItem>
          </>
        }

      </PaginationContent>
    </Pagination>
  )
}
