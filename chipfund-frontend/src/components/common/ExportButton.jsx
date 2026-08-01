import Button from "./Button";
import { exportToExcel } from "../../utils/exportToCSV";

const ExportButton = ({ data, fileName }) => {
  return (
    <Button
      variant="success"
      onClick={() => exportToExcel(data, fileName)}
    >
      Export Excel
    </Button>
  );
};

export default ExportButton;