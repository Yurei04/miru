"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 5;

export default function MiruDocPage() {
  const [patientData, setPatientData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetch("/data/patientsData.json")
      .then((res) => res.json())
      .then((result) => setPatientData(result))
      .catch((error) =>
        console.error("Failed to load patient history:", error)
      );
  }, []);

  const totalPages = Math.ceil(patientData.length / ITEMS_PER_PAGE);
  const paginatedData = patientData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Patient History</h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        {paginatedData.length === 0 ? (
          <div className="text-gray-500 text-center">No patients found.</div>
        ) : (
          <ul className="divide-y">
            {paginatedData.map((patient) => (
              <li
                key={patient.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedPatient(patient);
                  setOpenDialog(true);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-sm text-gray-500">
                    {patient.history.length} sessions
                  </span>
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
              currentPage === idx + 1
                ? "bg-yellow-400 text-white"
                : "bg-gray-200"
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
            <DialogTitle>Patient History</DialogTitle>
          </DialogHeader>

          {selectedPatient ? (
            <div className="mt-4 space-y-4">
              <div>
                <strong>Patient Name:</strong> {selectedPatient.name}
              </div>
              <div>
                <strong>History:</strong>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {selectedPatient.history.map((session, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <div>
                        <strong>Type:</strong> {session.detectionType}
                      </div>
                      <div>
                        <strong>Start:</strong>{" "}
                        {new Date(session.startTime).toLocaleString()}
                      </div>
                      <div>
                        <strong>End:</strong>{" "}
                        {new Date(session.endTime).toLocaleString()}
                      </div>
                      <div>
                        <strong>Duration:</strong> {session.duration}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>No patient selected</div>
          )}

          <DialogClose className="mt-4 px-4 py-2 bg-yellow-400 rounded text-white hover:bg-yellow-300">
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
