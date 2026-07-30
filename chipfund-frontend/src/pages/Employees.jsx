import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Mail, Building2, Columns3, Check } from "lucide-react";

export default function Employees() {
  // Extra static rows + columns added on purpose so you can see the
  // horizontal and vertical scrollbars kick in.
  const employees = [
    { id: 1, name: "John Doe", email: "john@gmail.com", department: "HR", salary: "$4,500", status: "Active", location: "Chennai", manager: "Priya Raman", joinDate: "12 Jan 2022", phone: "+91 98765 43210" },
    { id: 2, name: "Emma Smith", email: "emma@gmail.com", department: "IT", salary: "$6,000", status: "Inactive", location: "Bengaluru", manager: "Arjun Nair", joinDate: "03 Mar 2021", phone: "+91 98765 43211" },
    { id: 3, name: "Michael Lee", email: "michael@gmail.com", department: "Finance", salary: "$5,200", status: "Active", location: "Mumbai", manager: "Priya Raman", joinDate: "22 Jul 2020", phone: "+91 98765 43212" },
    { id: 4, name: "Sophia Brown", email: "sophia@gmail.com", department: "Marketing", salary: "$5,800", status: "Inactive", location: "Hyderabad", manager: "Karan Mehta", joinDate: "15 Sep 2023", phone: "+91 98765 43213" },
    { id: 5, name: "Arun Kumar", email: "arun@gmail.com", department: "IT", salary: "$5,500", status: "Active", location: "Chennai", manager: "Arjun Nair", joinDate: "01 Feb 2022", phone: "+91 98765 43214" },
    { id: 6, name: "Divya Menon", email: "divya@gmail.com", department: "HR", salary: "$4,800", status: "Active", location: "Coimbatore", manager: "Priya Raman", joinDate: "19 Nov 2021", phone: "+91 98765 43215" },
    { id: 7, name: "Rahul Verma", email: "rahul@gmail.com", department: "Finance", salary: "$5,900", status: "Inactive", location: "Delhi", manager: "Karan Mehta", joinDate: "07 May 2020", phone: "+91 98765 43216" },
    { id: 8, name: "Ananya Iyer", email: "ananya@gmail.com", department: "Marketing", salary: "$5,300", status: "Active", location: "Pune", manager: "Karan Mehta", joinDate: "28 Aug 2023", phone: "+91 98765 43217" },
    { id: 9, name: "Vikram Singh", email: "vikram@gmail.com", department: "IT", salary: "$6,200", status: "Active", location: "Bengaluru", manager: "Arjun Nair", joinDate: "10 Oct 2019", phone: "+91 98765 43218" },
    { id: 10, name: "Neha Kapoor", email: "neha@gmail.com", department: "Sales", salary: "$5,000", status: "Inactive", location: "Salem", manager: "Priya Raman", joinDate: "04 Apr 2022", phone: "+91 98765 43219" },
    { id: 11, name: "Karthik Raja", email: "karthik@gmail.com", department: "Operations", salary: "$4,700", status: "Active", location: "Madurai", manager: "Karan Mehta", joinDate: "16 Dec 2021", phone: "+91 98765 43220" },
    { id: 12, name: "Priyanka Das", email: "priyanka@gmail.com", department: "Sales", salary: "$5,600", status: "Active", location: "Kolkata", manager: "Arjun Nair", joinDate: "30 Jun 2020", phone: "+91 98765 43221" },
  ];

  const [showMenu, setShowMenu] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    employee: true,
    department: true,
    salary: true,
    status: true,
    location: true,
    manager: true,
    joinDate: true,
    phone: true,
    actions: true,
  });

  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex flex-col gap-3 px-4 py-3 border-b md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Employee List</h2>
          <p className="text-xs text-gray-500">Manage your employees.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Column Visibility */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Columns3 size={16} />
              Columns
            </button>

            {showMenu && (
              <div className="absolute right-0 z-20 p-2 mt-2 bg-white border rounded-lg shadow-lg w-52">
                <p className="px-2 mb-2 text-xs font-semibold text-gray-500 uppercase">
                  Show / Hide Columns
                </p>

                {[
                  ["employee", "Employee"],
                  ["department", "Department"],
                  ["salary", "Salary"],
                  ["status", "Status"],
                  ["location", "Location"],
                  ["manager", "Manager"],
                  ["joinDate", "Join Date"],
                  ["phone", "Phone"],
                  ["actions", "Actions"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => toggleColumn(key)}
                    className="flex items-center justify-between w-full px-2 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    <span>{label}</span>

                    {visibleColumns[key] && (
                      <Check size={15} className="text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            + Add Employee
          </button>
        </div>
      </div>

      {/* Table — with 8 columns + 12 rows there's more content than the
          box below, so overflow-auto shows both a horizontal and a
          vertical scrollbar automatically. */}
      <div className="max-h-[450px] overflow-auto">
        <table className="w-full min-w-[1400px] table-auto">
          <thead className="sticky top-0 z-10 border-b bg-gray-50">
            <tr>
              {visibleColumns.employee && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Employee
                </th>
              )}
              {visibleColumns.department && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Department
                </th>
              )}
              {visibleColumns.salary && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Salary
                </th>
              )}
              {visibleColumns.status && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Status
                </th>
              )}
              {visibleColumns.location && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Location
                </th>
              )}
              {visibleColumns.manager && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Manager
                </th>
              )}
              {visibleColumns.joinDate && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Join Date
                </th>
              )}
              {visibleColumns.phone && (
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Phone
                </th>
              )}
              {visibleColumns.actions && (
                <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="transition border-b hover:bg-blue-50/40"
              >
                {visibleColumns.employee && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center text-sm font-semibold text-blue-600 bg-blue-100 rounded-full h-9 w-9 shrink-0">
                        {employee.name.charAt(0)}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-800 whitespace-nowrap">
                          {employee.name}
                        </h4>

                        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                          <Mail size={12} />
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                )}

                {visibleColumns.department && (
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={14} className="text-gray-400" />
                      {employee.department}
                    </div>
                  </td>
                )}

                {visibleColumns.salary && (
                  <td className="px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {employee.salary}
                  </td>
                )}

                {visibleColumns.status && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                )}

                {visibleColumns.location && (
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.location}
                  </td>
                )}

                {visibleColumns.manager && (
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.manager}
                  </td>
                )}

                {visibleColumns.joinDate && (
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.joinDate}
                  </td>
                )}

                {visibleColumns.phone && (
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.phone}
                  </td>
                )}

                {visibleColumns.actions && (
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-md border border-blue-200 p-1.5 text-blue-600 transition hover:bg-blue-600 hover:text-white">
                        <Pencil size={14} />
                      </button>

                      <button className="rounded-md border border-red-200 p-1.5 text-red-600 transition hover:bg-red-600 hover:text-white">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}