"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";

const AlertTable = ({ data, headings }: { data: any; headings: string[] }) => {
  const itemsPerPage = 10; // Number of items to display per page (updated to 10)
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate total number of pages based on data length and items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const router = useRouter();

  // Calculate index of the first and last item to display on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice data array to get items for current page
  const currentPageData = data.slice(startIndex, endIndex);

  const handleEdit = (id: string) => {
    router.push(`/alerts/edit?id=${id}`);
  };

  // Render the table content
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-md shadow-md">
        <table className="w-full border-collapse table-auto">
          {/* Render table headings */}
          <thead>
            <tr className="text-gray-700 bg-gray-200">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-sm font-medium text-left"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {currentPageData.length > 0 ? (
            <tbody className="">
              {currentPageData.map((row: any, index: any) => (
                <tr
                  key={row.id}
                  className="transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  {/* Render row data */}
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {row.title}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-700 w-fit">
                    <div className="flex items-center px-2 py-1 space-x-2 bg-green-100 rounded-3xl w-fit">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h1 className="font-semibold text-green-600 lowercase">
                        {row.status}
                      </h1>
                    </div>
                  </td>

                  {/* <td className="px-4 py-2 text-sm text-gray-700">
                    {isNaN(new Date(row.createdAt).getTime()) ? (
                      <span>Invalid Date</span>
                    ) : (
                      <span>
                        {format(new Date(row.createdAt), "dd/MM/yy HH:mm")}
                      </span>
                    )}
                  </td> */}
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex ">
                      <button
                        key={`edit_${row.id}`}
                        className="flex items-center px-3 py-1 mr-2 space-x-2 text-blue-600 bg-blue-100 rounded-md hover:text-blue-800 w-fit hover:bg-blue-200 active:bg-blue-300"
                        onClick={() => handleEdit(row.id)}
                      >
                        <FiEdit size={16} />
                        <h1 className="font-medium">Edit</h1>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="w-full h-[30rem] flex items-center justify-center ">
              <tr className="w-full">
                <td>
                  <div className="w-full h-[30rem] ">
                    <h1>No data</h1>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {/* Render pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
          <div>
            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
              {data.length} entries
            </span>
          </div>
          <div>
            <nav className="flex items-center">
              <button
                className={`${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                } bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-2 rounded-l-md`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={`page_${index + 1}`}
                  className={`${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                  } bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-2`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-2 rounded-r-md`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertTable;
