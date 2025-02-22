import { NextResponse } from "next/server";
import { insertDimensionCheckDetails, insertRemarksDetails } from "@/server/models/inspectionReportModel";

export async function POST(request) {
  try {
    const body = await request.json();
    const { reportId, dimensionRows, remarks } = body;

    if (!reportId || !dimensionRows || !remarks) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert Dimension Details
    await insertDimensionCheckDetails(reportId, dimensionRows);

    // Insert Remarks Details
    await insertRemarksDetails(reportId, remarks);

    return NextResponse.json({ message: "Data saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
