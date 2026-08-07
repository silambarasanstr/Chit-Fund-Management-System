import { Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import Button from "./Button";
import { readExcelFile } from "../../utils/importExcel";
import { bulkCreateMembers } from "../../services/memberService";

const ImportButton = ({ refresh }) => {
  const fileInputRef = useRef(null);

  const handleImport = async (e) => {
    console.log("handleImport called");

    const file = e.target.files[0];

    if (!file) return;

    try {
      const data = await readExcelFile(file);

      const formattedData = data.map((row) => ({
        memberId: row["Member ID"],
        name: row["Name"],
        phone: String(row["Phone"] || ""),
        email: row["Email"] || "",
        address: row["Address"] || "",
        status: row["Status"] || "Active",
        aadhaarNumber: row["Aadhaar Number"]?.trim() || undefined,
        panNumber: row["PAN Number"]?.trim() || undefined,
      }));

      const result = await bulkCreateMembers(formattedData);

      toast.success(`${result.imported} members imported successfully`);

      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Import failed");
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".xlsx,.xls,.json"
        onChange={handleImport}
      />

      <Button
        leftIcon={Upload}
        variant="outline"
        className={"bg-white"}
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Excel
      </Button>
    </>
  );
};

export default ImportButton;
