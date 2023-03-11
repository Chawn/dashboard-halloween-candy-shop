import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Pagination = ({ itemPerPage, totalItem ,paginate, currentPage, lastPage}) => {

  if(totalItem < 50){
    itemPerPage = totalItem
  }
  const pageNumbers = [];

  for (let i = 1; i <= lastPage; i++) {
    if(i===1){
      pageNumbers.push(i);
      continue
    }

    if(i===lastPage){
      pageNumbers.push(i);
      continue
    }

    if(i > (currentPage-3) && i < (currentPage+3)){
      pageNumbers.push(i);
    }

    // if(i > (currentPage+3) && i < (currentPage+5)){
    //   pageNumbers.push('...');
    // }

    // if(i < (currentPage-3) && i > (currentPage-5)){
    //   pageNumbers.push('...');
    // }

  }
  

  return (
    <div className="flex items-center justify-between">
      <div className='text-base text-slate-500'>
        <span className='font-medium mr-4'>Page {currentPage}</span>
        <span className='font-medium'>[{ (currentPage-1)*itemPerPage + 1 }</span>
        {currentPage < 20 ? (
          <>
            {' '}
            - <span className='font-medium'>{ currentPage*itemPerPage }</span>{' '}
          </>
        ) : (
          <>
            {' '}
            - <span className='font-medium'>{totalItem}</span>{' '}
          </>
        )}{' '}
        of <span className='font-medium'>{totalItem}]</span> 
      </div>
      <div>
        <div className="bg-white flex flex-col md:flex-row ">
            <nav className="relative z-0 inline-flex rounded-none shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage-1)}
                className={
                  currentPage === 1 ?
                  'hidden'
                  : "relative inline-flex items-center px-4 py-1 rounded-none border border-gray-300 bg-white text-md font-medium text-gray-500 hover:bg-gray-50"
                }
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              {
              pageNumbers.length > 1 &&
                  pageNumbers.map(number => (
                    <button 
                      key={number} 
                      onClick={() => paginate(number)} 
                      className={
                        currentPage === number ?
                        "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-md font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-md font-medium"
                      }
                    >
                      {number}
                    </button>
                    ))
              }
              {
              pageNumbers.length > 1 &&
                <button
                  onClick={() => paginate(currentPage+1)}
                  className={
                    currentPage === lastPage ?
                    'hidden'
                    : "relative inline-flex items-center px-4 py-1 rounded-none border border-gray-300 bg-white text-md font-medium text-gray-500 hover:bg-gray-50"
                  }
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            </nav>
        </div>
      </div>
    </div>

  );
};

export default Pagination;