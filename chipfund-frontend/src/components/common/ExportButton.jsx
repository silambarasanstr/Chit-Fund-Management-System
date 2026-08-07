import { Download } from "lucide-react";
import Button from "./Button";
import { exportToExcel } from "../../utils/exportToCSV";

const ExportButton = ({ data, fileName }) => {
  return (
    <Button
      leftIcon={Download}
      variant="outline"
      className={"bg-white"}
      onClick={() => exportToExcel(data, fileName)}
    >
      Export Excel
    </Button>
  );
};

export default ExportButton;
