import { NextResponse } from "next/server";
import db from "@/server/db/dbConnection"; // Import the database connection
import {
  insertDimensionCheckDetails,
  insertRemarksDetails,
} from "@/server/models/inspectionReportModel";

export async function POST(request) {
  try {
    const body = await request.json();
    const { reportId, dimensionRows, remarks, inspectionDetails } = body;

    // Validate required fields
    if (!reportId || !dimensionRows || !remarks || !inspectionDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert Dimension Details
    await insertDimensionCheckDetails(reportId, dimensionRows);

    // Insert Remarks Details
    await insertRemarksDetails(reportId, remarks);

    // Insert Inspection Details
    const { inspectedBy, staffNumber, inspectionDate } = inspectionDetails;
    const inspectionQuery = `
      INSERT INTO inspection_details (report_id, inspected_by, staff_number, inspection_date)
      VALUES (?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
      db.query(
        inspectionQuery,
        [reportId, inspectedBy, staffNumber, inspectionDate],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Return success response
    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}