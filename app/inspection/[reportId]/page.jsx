"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Remarks from "@/components/component/Remarks";
import { useRouter } from 'next/navigation'; 

export default function InspectionPage() {
  const router = useRouter();
  const { reportId } = useParams(); 

  console.log("Report ID:", reportId); // Debugging

  // State Management for Items and Dimension Rows
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dimensionRows, setDimensionRows] = useState([]);
  const [remarks, setRemarks] = useState([]);

  // Fetch Items and Generate Dimension Rows
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!reportId) {
          console.error("No report ID provided");
          return;
        }

        const response = await fetch(`/api/getItems?reportId=${reportId}`);
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          return;
        }

        setItems(data.items);
        generateDimensionRows(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchItems();
    }
  }, [reportId]);

  useEffect(() => {
    const formData = localStorage.getItem('formData');
    if (!formData) {
      router.replace('/GR-Form');  // Redirect to the home page or any other page if form data is not present
    }

    const savedDimensionRows = localStorage.getItem('dimensionRows');
    const savedRemarks = localStorage.getItem('remarks');

    if (savedDimensionRows) {
      setDimensionRows(JSON.parse(savedDimensionRows));
    }

    if (savedRemarks) {
      setRemarks(JSON.parse(savedRemarks));
    }
  }, []);

  // Generate Dimension Rows
  const generateDimensionRows = (items) => {
    let serialNumbers = {};
    const rows = [];

    items.forEach((item) => {
      const serialNumber =
        serialNumbers[item.part_no] ||
        (serialNumbers[item.part_no] = Object.keys(serialNumbers).length + 1);

      for (let i = 0; i < item.qty; i++) {
        rows.push({
          ...item,
          serialNumber,
          dimnToll1: "",
          measuredToll1: "",
          dimnToll2: "",
          measuredToll2: "",
          dimnToll3: "",
          measuredToll3: "",
        });
      }
    });

    setDimensionRows(rows);
  };

  // Handle Input Changes for Dimension Rows
  const handleDimensionInputChange = (index, field, value) => {
    const updatedRows = dimensionRows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setDimensionRows(updatedRows);
  };

  // Delete Dimension Row
  const deleteDimensionRow = (index) => {
    const updatedRows = dimensionRows.filter(
      (_, rowIndex) => rowIndex !== index
    );
    setDimensionRows(updatedRows);
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Filter out empty remarks
    const filteredRemarks = remarks.filter(remark => remark.observation.trim() !== "");

    // Prepare form data
    const formData = {
      reportId: reportId,
      dimensionRows,
      remarks: filteredRemarks // Use filtered remarks
    };

    console.log("Form Submitted:", formData);

    try {
      const response = await fetch("/api/saveDynamic", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Data saved successfully");

        // Clear the data from local storage
        localStorage.removeItem('formData');
        localStorage.removeItem('reportId');
        localStorage.removeItem('isCreateDisabled');
        localStorage.removeItem('dimensionRows');
        localStorage.removeItem('remarks');

        // Clear the input fields by resetting the state variables
        setItems([]);
        setDimensionRows([]);
        setRemarks([]);
        // Optionally, you can also reset the loading state
        setLoading(false);

        // Redirect to the GR-Form page without adding to browser history
        router.replace('/'); // Edited
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    router.back();
  };

  const handleCancel = () => {
    setItems([]);
    setDimensionRows([]);
    setRemarks([]);
    localStorage.removeItem('formData');  // Clear form data from local storage
    localStorage.removeItem('reportId');  // Clear reportId from local storage
    localStorage.removeItem('isCreateDisabled');  // Clear Create button state from local storage
    localStorage.removeItem('dimensionRows');  // Clear dimension rows from local storage
    localStorage.removeItem('remarks');  // Clear remarks from local storage
    // router.push('/GR-Form');  // Redirect to the home page or any other page
  };

  return (
    <>
      <section className="mt-10">
        {/* Dimension Check Table */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          DIMENSION CHECK: {reportId}
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Serial No</th>
              <th className="border px-2 py-1">Part No</th>
              <th className="border px-2 py-1">Dimn Toll 1 (mm)</th>
              <th className="border px-2 py-1">Measured Toll 1 (mm)</th>
              <th className="border px-2 py-1">Dimn Toll 2 (mm)</th>
              <th className="border px-2 py-1">Measured mm 2</th>
              <th className="border px-2 py-1">Dimn Toll 3 (mm)</th>
              <th className="border px-2 py-1">Measured Toll 3 (mm)</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {dimensionRows.map((row, index) => (
              <tr key={index} className="text-center">
                <td>{row.serialNumber}</td>
                <td>{row.part_no}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll 1"
                    className="w-40"
                    value={row.dimnToll1}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "dimnToll1",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured Toll 1"
                    className="w-40"
                    value={row.measuredToll1}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "measuredToll1",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll 2"
                    className="w-40"
                    value={row.dimnToll2}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "dimnToll2",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured Toll 2"
                    className="w-40"
                    value={row.measuredToll2}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "measuredToll2",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll 3"
                    className="w-40"
                    value={row.dimnToll3}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "dimnToll3",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured Toll 3"
                    className="w-40"
                    value={row.measuredToll3}
                    onChange={(e) =>
                      handleDimensionInputChange(
                        index,
                        "measuredToll3",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <button onClick={() => deleteDimensionRow(index)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Remarks Table */}
      <Remarks remarks={remarks} setRemarks={setRemarks} />

      {/* Submit Button */}
      <div className="text-center mt-10 mb-8">
        <button
          type="button"
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
        >
          Cancel
        </button>
      </div>
    </>
  );
}