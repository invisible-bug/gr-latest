import React, { useState, useEffect } from "react";

export default function Remarks({ remarks, setRemarks, onInspectionDetailsChange }) {
  // States for Date of MFG, Date of Expiry, and Shelf Life
  const [mfgDate, setMfgDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shelfLife, setShelfLife] = useState(0);

  // States for Inspection Details
  const [inspectedBy, setInspectedBy] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");

  // Add a new row
  const addRemarkRow = () => {
    setRemarks([...remarks, { observation: "", shelfLife }]);
  };

  // Delete a row
  const deleteRemarkRow = (index) => {
    const updatedRemarks = remarks.filter((_, rowIndex) => rowIndex !== index);
    setRemarks(updatedRemarks);
  };

  // Handle input changes for observations and shelf life
  const handleRemarkInputChange = (index, value, field) => {
    const updatedRemarks = remarks.map((remark, idx) => {
      if (idx === index) {
        return { ...remark, [field]: value };
      }
      return remark;
    });
    setRemarks(updatedRemarks);
  };

  // Calculate shelf life when MFG or Expiry date changes
  useEffect(() => {
    if (mfgDate && expiryDate) {
      const mfg = new Date(mfgDate);
      const expiry = new Date(expiryDate);
      const diffTime = Math.abs(expiry - mfg);
      const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
      setShelfLife(diffMonths);

      // Update the shelf life in the remarks
      const updatedRemarks = remarks.map((remark) => ({
        ...remark,
        shelfLife: diffMonths,
      }));
      setRemarks(updatedRemarks);
    }
  }, [mfgDate, expiryDate, setRemarks]);

  // Set default remarks row when the component mounts
  useEffect(() => {
    if (remarks.length === 0) {
      setRemarks([{ observation: "", shelfLife }]);
    }
  }, [setRemarks, remarks, shelfLife]);

  // Notify parent component of inspection details changes
  useEffect(() => {
    onInspectionDetailsChange({ inspectedBy, staffNumber, inspectionDate });
  }, [inspectedBy, staffNumber, inspectionDate]);

  return (
    <section className="w-1/2 mx-auto mt-12">
      {/* Existing Remarks Table */}
      <h2 className="text-xl font-semibold mb-6 text-center">Remarks</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 w-20">Sl No.</th>
            <th className="border px-2 py-1">Observation</th>
            <th className="border px-2 py-1">Delete</th>
          </tr>
        </thead>
        <tbody>
          {remarks.map((row, index) => (
            <tr key={index} className="bg-white">
              <td className="border text-center px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={row.observation}
                  onChange={(e) =>
                    handleRemarkInputChange(index, e.target.value, "observation")
                  }
                  className="w-full p-1 border rounded"
                  placeholder="Enter Observation"
                />
              </td>
              <td className="border text-center px-2 py-1">
                <button
                  onClick={() => deleteRemarkRow(index)}
                  className="text-red-500 w-10"
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={addRemarkRow}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Add Row
        </button>
      </div>

      {/* Section for Date of MFG, Date of Expiry, and Shelf Life */}
      <section className="mt-14">
        <h3 className="text-xl font-semibold mb-5 text-center">Product Details</h3>
        <div className="flex justify-evenly">
          <div className="">
            <label htmlFor="mfgDate" className="block text-md font-semibold mb-2">
              Date of Manufacturing
            </label>
            <input
              type="date"
              id="mfgDate"
              value={mfgDate}
              onChange={(e) => setMfgDate(e.target.value)}
              className="w-36 text-center p-2 border rounded-md"
            />
          </div>

          <div className="">
            <label htmlFor="expiryDate" className="block text-md font-semibold mb-2">
              Date of Expiry
            </label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-36 text-center p-2 border rounded-md"
            />
          </div>

          <div className="text-center">
            <label htmlFor="shelfLife" className="block text-md font-semibold mb-2">
              Shelf Life (in months)
            </label>
            <input
              type="number"
              id="shelfLife"
              value={shelfLife}
              readOnly
              className="w-20 text-center p-2 border rounded-md bg-gray-200"
              placeholder="Shelf life in months"
            />
          </div>
        </div>
      </section>

      {/* Section for Inspection Details */}
      <section className="mt-14">
        <h3 className="text-xl font-semibold mb-5 text-center">Inspection Details</h3>
        <div className="flex justify-evenly">
          <div className="">
            <label htmlFor="inspectedBy" className="block text-md font-semibold mb-2">
              Inspected By:
            </label>
            <input
              type="text"
              id="inspectedBy"
              value={inspectedBy}
              onChange={(e) => setInspectedBy(e.target.value)}
              className="w-36 p-2 border rounded-md"
            />
          </div>

          <div className="">
            <label htmlFor="staffNumber" className="block text-md font-semibold mb-2">
              Staff Number:
            </label>
            <input
              type="text"
              id="staffNumber"
              value={staffNumber}
              onChange={(e) => setStaffNumber(e.target.value)}
              className="w-36 p-2 border rounded-md"
            />
          </div>

          <div className="text-center">
            <label htmlFor="inspectionDate" className="block text-md font-semibold mb-2">
              Date:
            </label>
            <input
              type="date"
              id="inspectionDate"
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.target.value)}
              className="w-36 text-center p-2 border rounded-md"
            />
          </div>
        </div>
      </section>
    </section>
  );
}