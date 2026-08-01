import * as XLSX from "xlsx";

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, {
          type: "binary",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = XLSX.utils.sheet_to_json(sheet);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;

    reader.readAsBinaryString(file);
  });
};