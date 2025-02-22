const db = require("../db/dbConnection").default;

// Insert Inspection Report
const insertInspectionReport = (grNo, poNo, grDate, project, vendor) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO inspection_reports (gr_no, po_no, gr_date, project, vendor) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [grNo, poNo, grDate, project, vendor], (err, result) => {
      if (err) {
        console.error("Error inserting inspection report:", err);
        reject(err);
      } else {
        console.log("Inspection report inserted successfully:", result);
        resolve(result.insertId); // Return the inserted report ID for later use
      }
    });
  });
};

// Insert Item Details
const insertItemDetails = (inspectionReportId, items) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO item_details (report_id, part_no, description, qty, item_sl_no, make, mpn_sap, mpn_item_label, ds, coc, tmr, inv, boe, awb, po, be_coc) VALUES ?";

    const itemValues = items.map((item) => [
      inspectionReportId,
      item.partNo,
      item.description,
      item.qty,
      item.itemSlNo,
      item.make,
      item.mpnSAP,
      item.mpnItemLabel,
      item.ds,
      item.coc,
      item.tmr,
      item.inv,
      item.boe,
      item.awb,
      item.po,
      item.beCoc,
    ]);

    db.query(query, [itemValues], (err, result) => {
      if (err) {
        console.error("Error inserting item details:", err);
        reject(err);
      } else {
        console.log("Item details inserted successfully:", result);
        resolve(result);
      }
    });
  });
};

// Insert Accessories Details
const insertAccessoriesDetails = (reportId, accessories) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO accessories_details (report_id, sl_no, description, part_no, rec_qty) VALUES ?";

    const accessoryValues = accessories.map((accessory, index) => [
      reportId,
      index + 1,
      accessory.description,
      accessory.partNo,
      accessory.qty,
    ]);

    console.log("Accessory values to be inserted:", accessoryValues);

    db.query(query, [accessoryValues], (err, result) => {
      if (err) {
        console.error("Error inserting accessories details:", err);
        reject(err);
      } else {
        console.log("Accessories details inserted successfully:", result);
        resolve(result);
      }
    });
  });
};

// Get Item Details
const getItemDetails = (reportId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM item_details WHERE report_id = ?";
    db.query(query, [reportId], (err, results) => {
      if (err) {
        console.error("Error fetching item details:", err);
        reject(err);
      } else {
        console.log("Item details fetched successfully:", results);
        resolve(results);
      }
    });
  });
};

// Insert Dimension Check Details
const insertDimensionCheckDetails = (reportId, dimensionRows) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO inspection_dimension (
        report_id,
        sl_no,
        part_no,
        dimn_toll_1,
        measured_toll_1,
        dimn_toll_2,
        measured_toll_2,
        dimn_toll_3,
        measured_toll_3
      ) VALUES ?
    `;

    const dimensionValues = dimensionRows.map((row) => [
      reportId,
      row.serialNumber,
      row.part_no,
      row.dimnToll1 || null, // Default to null if undefined
      row.measuredToll1 || null,
      row.dimnToll2 || null,
      row.measuredToll2 || null,
      row.dimnToll3 || null,
      row.measuredToll3 || null,
    ]);

    console.log("Dimension values to be inserted:", dimensionValues);

    db.query(query, [dimensionValues], (err, result) => {
      if (err) {
        console.error("Error inserting dimension check details:", err);
        reject(err);
      } else {
        console.log("Dimension check details inserted successfully:", result);
        resolve(result);
      }
    });
  });
};

// Insert Remarks Details
const insertRemarksDetails = (reportId, remarks) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO inspection_remarks (report_id, remark_text, shelf_life) VALUES ?";

    const remarkValues = remarks.map((remark) => [
      reportId,
      remark.observation,
      remark.shelfLife,
    ]);

    console.log("Remark values to be inserted:", remarkValues);

    db.query(query, [remarkValues], (err, result) => {
      if (err) {
        console.error("Error inserting remarks details:", err);
        reject(err);
      } else {
        console.log("Remarks details inserted successfully:", result);
        resolve(result);
      }
    });
  });
};

// Module Exports
module.exports = {
  insertInspectionReport,
  insertItemDetails,
  insertAccessoriesDetails,
  getItemDetails,
  insertDimensionCheckDetails,
  insertRemarksDetails,
};
