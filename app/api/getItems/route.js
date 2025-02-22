import { NextResponse } from 'next/server';
import { getItemDetails } from '@/server/models/inspectionReportModel'; // Importing the model function to fetch items

// GET handler to fetch items for a specific inspection report
export async function GET(request) {
  try {
    const url = new URL(request.url); // Get the URL object
    const reportId = url.searchParams.get('reportId'); // Extract `reportId` from the URL query parameters
    
    // If no reportId is provided, return an error
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }

    console.log(`Fetching items for report ID: ${reportId}`);
    
    // Fetch the item details associated with the reportId
    const items = await getItemDetails(reportId);
    
    // Log the fetched items for debugging purposes
    console.log("Fetched items:", items);
    
    // If no items found for the given reportId
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items found for the specified report' }, { status: 404 });
    }

    // Return the items as a response
    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    // Log the error with more details
    console.error('Error fetching items:', err);
    return NextResponse.json({ error: 'Failed to fetch items', details: err.message }, { status: 500 });
  }
}
