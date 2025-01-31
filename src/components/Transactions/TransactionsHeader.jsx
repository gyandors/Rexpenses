import { useState, useRef, useEffect } from "react";
import { FaFileExport, FaPlus, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function TransactionsHeader({
  title,
  type,
  setShowAddModal,
  transactions,
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target)
      ) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = () => {
    const data = transactions.map((transaction) => ({
      Date: new Date(transaction.date).toLocaleDateString(),
      Title: transaction.title,
      Category: transaction.category,
      Amount: Number(transaction.amount).toFixed(2),
      Note: transaction.notes || "-",
    }));

    // Create and download PDF
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Date", "Title", "Category", "Amount", "Note"]],
      body: data.map(Object.values),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [51, 51, 51] },
    });
    doc.save(`${type}_${new Date().toISOString().split("T")[0]}.pdf`);
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    const data = transactions.map((transaction) => ({
      Date: new Date(transaction.date).toLocaleDateString(),
      Title: transaction.title,
      Category: transaction.category,
      Amount: transaction.amount,
      Note: transaction.notes || "",
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Generate Excel file
    XLSX.writeFile(
      workbook,
      `${type}_${new Date().toISOString().split("T")[0]}.xlsx`
    );
    setShowExportMenu(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 my-6">
      <h1 className="text-xl md:text-2xl font-bold dark:text-white">{title}</h1>
      <div className="flex space-x-3">
        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center px-4 py-2 text-sm md:text-base text-white rounded-lg transition-colors ${
            type === "income"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          <FaPlus className="mr-2" />
          Add {type}
        </button>

        <div className="relative" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center px-4 py-2 text-sm md:text-base text-gray-700 bg-white dark:bg-slate-800 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <FaFileExport className="mr-2" />
            Export
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={handleExportPDF}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FaFilePdf className="mr-2" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FaFileExcel className="mr-2" />
                  Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
