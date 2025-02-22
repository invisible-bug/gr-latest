
export default function ItemTable({ items, setItems }) {

  // Add a new row to the table
  const addRow = () => {
    setItems([
      ...items,
      {
        partNo: '',
        description: '',
        qty: '',
        itemSlNo: '',
        make: '',
        mpnSAP: '',
        mpnItemLabel: '',
        ds: false,
        coc: false,
        tmr: false,
        inv: false,
        boe: false,
        awb: false,
        po: false,
        beCoc: false,
      },
    ]);
  };

  // Delete a row from the table
  const deleteRow = (index) => {
    const updatedItems = items.filter((_, rowIndex) => rowIndex !== index);
    setItems(updatedItems);
  };

// Handle input changes in the rows
const handleInputChange = (index, field, value) => {
  const updatedItems = items.map((item, idx) => {
    if (idx === index) {
      if (field === 'mpnItemLabel') {
        // Only check validation when the MPN Item/Label field is updated and it's not empty
        return { ...item, [field]: value };
      }
      // For other fields, just update them freely
      return { ...item, [field]: value };
    }
    return item;
  });
  setItems(updatedItems);
};

// Handle blur event to validate MPN Item/Label
const handleBlur = (index) => {
  const item = items[index];
  if (item.mpnSAP && item.mpnItemLabel && item.mpnSAP !== item.mpnItemLabel) {
    // Show alert only if MPN SAP and MPN Item/Label do not match
    alert("MPN doesn't match");
  }
};

  return (
    <section className="p-1 mt-20">
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">ITEM DETAILS</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Sl No.</th>
              <th className="border px-2 py-1">Part No.</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">RC Qty</th>
              <th className="border px-2 py-1">Item Sl No.</th>
              <th className="border px-2 py-1">Make</th>
              <th className="border px-2 py-1">MPN as per SAP</th>
              <th className="border px-2 py-1">MPN on item/label</th>
              <th className="border px-2 py-1">DS</th>
              <th className="border px-2 py-1">COC</th>
              <th className="border px-2 py-1">TMR</th>
              <th className="border px-2 py-1">INV</th>
              <th className="border px-2 py-1">BOE</th>
              <th className="border px-2 py-1">AWB</th>
              <th className="border px-2 py-1">PO</th>
              <th className="border px-2 py-1">BE COC</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={index} className="bg-white font-[16px]">
                <td className="border items-center w-8 px-2 py-1 text-center">{index + 1}</td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.partNo}
                    onChange={(e) => handleInputChange(index, 'partNo', e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter Part No."
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter Description"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                    className="w-16 text-center p-1 border rounded"
                    placeholder="Enter Qty"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.itemSlNo}
                    onChange={(e) => handleInputChange(index, 'itemSlNo', e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter Item Sl No."
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.make}
                    onChange={(e) => handleInputChange(index, 'make', e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter Make"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.mpnSAP}
                    onChange={(e) => handleInputChange(index, 'mpnSAP', e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter MPN SAP"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.mpnItemLabel}
                    onChange={(e) => handleInputChange(index, 'mpnItemLabel', e.target.value)}
                    onBlur={() => handleBlur(index)}
                    className="w-full p-1 border rounded"
                    placeholder="Enter MPN Item/Label"
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.ds}
                    onChange={() => handleInputChange(index, 'ds', !row.ds)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.coc}
                    onChange={() => handleInputChange(index, 'coc', !row.coc)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.tmr}
                    onChange={() => handleInputChange(index, 'tmr', !row.tmr)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.inv}
                    onChange={() => handleInputChange(index, 'inv', !row.inv)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.boe}
                    onChange={() => handleInputChange(index, 'boe', !row.boe)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.awb}
                    onChange={() => handleInputChange(index, 'awb', !row.awb)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.po}
                    onChange={() => handleInputChange(index, 'po', !row.po)}
                  />
                </td>
                <td className="border text-center px-2 py-1">
                  <input
                    type="checkbox"
                    checked={row.beCoc}
                    onChange={() => handleInputChange(index, 'beCoc', !row.beCoc)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => deleteRow(index)}
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
            onClick={addRow}
            className="bg-blue-500 hover:bg-blue-600 text-white p-1 w-14 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}
