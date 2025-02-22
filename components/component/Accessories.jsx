export default function Accessories({ accessories, setAccessories }) {
  
  // Add a new row to the accessories table
  const addAccessoryRow = () => {
    setAccessories([
      ...accessories,
      {
        description: '',
        partNo: '',
        qty: '',
      },
    ]);
  };

  // Delete a row from the accessories table
  const deleteAccessoryRow = (index) => {
    const updatedAccessories = accessories.filter((_, rowIndex) => rowIndex !== index);
    setAccessories(updatedAccessories);
  };

  // Handle input changes in the accessories table rows
  const handleAccessoryInputChange = (index, field, value) => {
    const updatedAccessories = accessories.map((accessory, idx) => {
      if (idx === index) {
        return { ...accessory, [field]: value };
      }
      return accessory;
    });
    setAccessories(updatedAccessories);
  };

  return (
    <section className="w-1/2 mx-auto mt-8">
      <h2 className="text-xl font-semibold mt-14 mb-6 text-center">ACCESSORIES</h2>
       <table className="table-auto w-full max-w-4xl mx-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 w-16">Sl No.</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Part No.</th>
            <th className="border px-2 py-1">Rec Qty</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {accessories.map((row, index) => (
            <tr key={index} className="bg-white">
              <td className="border text-center px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleAccessoryInputChange(index, 'description', e.target.value)
                  }
                  className="w-full p-1 border rounded"
                  placeholder="Enter Description"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={row.partNo}
                  onChange={(e) =>
                    handleAccessoryInputChange(index, 'partNo', e.target.value)
                  }
                  className="w-full p-1 border rounded"
                  placeholder="Enter Part No."
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleAccessoryInputChange(index, 'qty', e.target.value)
                  }
                  className="w-16 text-center p-1 border rounded"
                  placeholder="Enter Qty"
                />
              </td>
              <td className="border text-center px-2 py-1">
                <button
                  onClick={() => deleteAccessoryRow(index)}
                  className="text-red-500 text-center w-10"
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          type="button"
          onClick={addAccessoryRow}
          className="bg-blue-500 hover:bg-blue-600 text-white p-1 w-14 rounded-md"
        >
          Add
        </button>
      </div>
    </section>
  );
}