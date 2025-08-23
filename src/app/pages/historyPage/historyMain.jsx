"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 7;

export default function HistoryPage() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/data/userHistory.json")
      .then((res) => res.json())
      .then((result) => setUserData(result))
      .catch((error) =>
        console.error("Failed to load user history:", error)
      );
  }, []);

  const totalPages = Math.ceil(userData.length / ITEMS_PER_PAGE);
  const paginatedData = userData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Detection History</h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        {paginatedData.length === 0 ? (
          <div className="text-gray-500 text-center">No history found.</div>
        ) : (
          <ul className="divide-y">
            {paginatedData.map((item) => (
              <li
                key={item.sessionId}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedItem(item);
                  setOpenDialog(true);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.detectionType}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.startTime).toLocaleDateString()} •{" "}
                    {new Date(item.startTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Length: {item.duration}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1 ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogContent>
                {selectedItem ? (
                <div className="mt-4 space-y-2">
                    <div>
                        <strong>Detector:</strong> {selectedItem.detectionType}
                    </div>
                    <div>
                        <strong>Start Time:</strong>{" "}
                        {new Date(selectedItem.startTime).toLocaleString()}
                    </div>
                    <div>
                        <strong>End Time:</strong>{" "}
                        {new Date(selectedItem.endTime).toLocaleString()}
                    </div>
                    <div>
                        <strong>Duration:</strong> {selectedItem.duration}
                    </div>
                    <div>
                        <strong>Responses:</strong>{" "}
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(selectedItem.responses, null, 2)}
                        </pre>
                    </div>
                </div>
                ) : (
                <div>No session selected</div>
                )}
            </DialogContent>
            </DialogHeader>
            <DialogClose className="mt-4 px-4 py-2 bg-yellow-400 rounded text-white hover:bg-yellow-300">
            Close
            </DialogClose>
        </DialogContent>
        </Dialog>

    </div>
  );
}
