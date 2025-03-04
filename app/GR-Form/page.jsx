"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ItemTable from "@/components/component/ItemTable";
import Accessories from "@/components/component/Accessories";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isCreateDisabled, setIsCreateDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [grNo, setGrNo] = useState("");
  const [grDate, setGrDate] = useState("");
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState("");
  const [project, setProject] = useState("");
  const [vendor, setVendor] = useState("");

  const [items, setItems] = useState([{ partNo: "", description: "", qty: "" }]);
  const [accessories, setAccessories] = useState([{ description: "", partNo: "", qty: "" }]);

  const router = useRouter();

  const isFormComplete = grNo && poNo && grDate && project && vendor && items.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "gr_no":
        setGrNo(value || "");
        break;
      case "gr_date":
        setGrDate(value || "");
        break;
      case "po_no":
        setPoNo(value || "");
        break;
      case "po_date":
        setPoDate(value || "");
        break;
      case "project":
        setProject(value || "");
        break;
      case "vendor":
        setVendor(value || "");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    localStorage.removeItem("reportId"); // Ensure no old reportId is stored

    const formData = { grNo, grDate, poNo, poDate, project, vendor, items, accessories };

    try {
      const response = await fetch("/api/saveForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const newReportId = data.reportId;

        alert("Data saved successfully!");
        localStorage.setItem("formData", JSON.stringify(formData));
        localStorage.setItem("reportId", newReportId);
        localStorage.setItem("isCreateDisabled", "true");
        localStorage.setItem("isNextDisabled", "false");

        setIsCreateDisabled(true);
        setIsNextDisabled(false);
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  const handleCancel = () => {
    setGrNo("");
    setGrDate("");
    setPoNo("");
    setPoDate("");
    setProject("");
    setVendor("");
    setItems([{ partNo: "", description: "", qty: "" }]);
    setAccessories([{ description: "", partNo: "", qty: "" }]);

    localStorage.clear();
    setIsCreateDisabled(false);
    setIsNextDisabled(true);
  };

  const handleNext = () => {
    const latestReportId = localStorage.getItem("reportId");
    const isFormSubmitted = localStorage.getItem("isCreateDisabled");

    if (!latestReportId || isFormSubmitted !== "true") {
      alert("Please save the form data first by clicking the Create button.");
      return;
    }

    router.push(`/inspection/${latestReportId}`); // Navigate dynamically
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
  
      setGrNo(formData.grNo ?? "");  // Ensure it's always a string
      setGrDate(formData.grDate ?? "");
      setPoNo(formData.poNo ?? "");
      setPoDate(formData.poDate ?? "");
      setProject(formData.project ?? "");
      setVendor(formData.vendor ?? "");
  
      // Ensure items and accessories are always arrays
      setItems(Array.isArray(formData.items) ? formData.items.map(item => ({
        partNo: item.partNo ?? "",
        description: item.description ?? "",
        qty: item.qty ?? ""
      })) : [{ partNo: "", description: "", qty: "" }]);
  
      setAccessories(Array.isArray(formData.accessories) ? formData.accessories.map(acc => ({
        description: acc.description ?? "",
        partNo: acc.partNo ?? "",
        qty: acc.qty ?? ""
      })) : [{ description: "", partNo: "", qty: "" }]);
    }
  
    // Restore button states
    setIsCreateDisabled(localStorage.getItem("isCreateDisabled") === "true");
    setIsNextDisabled(localStorage.getItem("isNextDisabled") === "true");
  }, []);
  

  return (
    <div className="mx-auto mt-5 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">MATERIAL INSPECTION REPORT</h1>
      <form className="space-y-6">
        <div className="flex flex-wrap justify-evenly gap-6">
          {[
            ["GR No.", "gr_no", grNo],
            ["GR Date", "gr_date", grDate, "date"],
            ["PO No.", "po_no", poNo],
            ["PO Date", "po_date", poDate, "date"],
            ["Project", "project", project],
            ["Vendor", "vendor", vendor],
          ].map(([label, name, value, type = "text"]) => (
            <div key={name}>
              <label className="block text-lg font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className="form-input block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
        </div>
      </form>

      <ItemTable items={items} setItems={setItems} />
      <Accessories accessories={accessories} setAccessories={setAccessories} />

      <div className="flex justify-center gap-8 mt-20 mb-10">
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleSubmit} disabled={!isFormComplete || isCreateDisabled}>
          Create
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
}