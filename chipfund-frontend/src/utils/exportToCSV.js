import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "Members") => {
  if (!data.length) return;

  const formattedData = data.map((member, index) => ({
    "S.No": index + 1,
    "Member ID": member.memberId,
    Name: member.name,
    Phone: member.phone,
    Email: member.email,
    Status: member.status,
    Address: member.address,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `${fileName}.xlsx`);
};