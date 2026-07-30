import React from 'react'

const Pagination = ({currentPage, onPageChange}) => {
  return (
    <div className="mt-8 flex justify-center gap-2">
       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded border px-4 py-2 disabled:opacity-50">
         Previous
       </button>
       <button className="rounded border px-4 py-2">
         {currentPage}
       </button>
       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === 1} className="rounded border px-4 py-2 disabled:opacity-50">
         Next
       </button>
    </div>
  )
}

export default Pagination
