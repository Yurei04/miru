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
    <div className="w-full min-h-screen flex flex-col pt-32 items-center p-6 bg-gray-950 text-yellow-400">
      <h1 className="text-3xl font-bold mb-6">📋 Patient History</h1>
      <h3 className="text-lg font-semibold mb-2">👤 User: John Doe</h3>
      <h3 className="text-lg font-semibold mb-6">🆔 Id: 10-1285-124</h3>

      <div className="w-full max-w-2xl bg-gray-900 border border-yellow-500 shadow-lg rounded-xl p-4">
        {paginatedData.length === 0 ? (
          <div className="text-yellow-300 text-center">No patients found.</div>
        ) : (
          <ul className="divide-y divide-yellow-600/30">
            {paginatedData.map((patient) => (
              <li
                key={patient.id}
                className="p-4 hover:bg-gray-800 cursor-pointer rounded-lg transition"
                onClick={() => {
                  setSelectedPatient(patient);
                  setOpenDialog(true);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-sm text-yellow-300">
                    {patient.history.length} sessions
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-800 text-yellow-400 rounded hover:bg-yellow-500 hover:text-gray-900 transition disabled:opacity-40"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded transition ${
              currentPage === idx + 1
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900"
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-800 text-yellow-400 rounded hover:bg-yellow-500 hover:text-gray-900 transition disabled:opacity-40"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Patient History Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-900 border border-yellow-500 text-yellow-300 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-xl font-bold">
              Patient History
            </DialogTitle>
          </DialogHeader>

          {selectedPatient ? (
            <div className="mt-4 space-y-4">
              <div>
                <strong className="text-yellow-400">Patient Name:</strong>{" "}
                {selectedPatient.name}
              </div>
              <div>
                <strong className="text-yellow-400">History:</strong>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {selectedPatient.history.map((session, index) => (
                    <li key={index} className="text-sm">
                      <div>
                        <strong className="text-yellow-400">Type:</strong>{" "}
                        {session.detectionType}
                      </div>
                      <div>
                        <strong className="text-yellow-400">Start:</strong>{" "}
                        {new Date(session.startTime).toLocaleString()}
                      </div>
                      <div>
                        <strong className="text-yellow-400">End:</strong>{" "}
                        {new Date(session.endTime).toLocaleString()}
                      </div>
                      <div>
                        <strong className="text-yellow-400">Duration:</strong>{" "}
                        {session.duration}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>No patient selected</div>
          )}

          <DialogClose className="mt-6 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition">
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
