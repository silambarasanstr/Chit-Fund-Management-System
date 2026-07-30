import React, { useEffect } from "react";
import { getMembers } from "../services/memberService";

const Members = () => {
  const [members, setMembers] = React.useState([]);

  const fetchMembers = async () => {
    const res = await getMembers();
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your members here.
          </p>
        </div>
      </div>

      {/* <div className="grid gap-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="p-5 bg-white shadow rounded-xl"
          >
            <h2 className="text-lg font-semibold">{member.name}</h2>

            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>
                <strong>Member ID:</strong> {member.memberId}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Status:</strong> {member.status}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        d
        <div className="max-h-[450px] overflow-auto p-1 border">
          <table className="w-full min-w-[1400px] table-auto">
            <thead className="sticky top-0 z-10 border-b bg-gray-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Member ID
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Phone
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Address
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition border-b hover:bg-blue-50/40">
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  John Doe
                </td>
                <td className="px-4 py-3">MEM001</td>
                <td className="px-4 py-3">john.doe@example.com</td>
                <td className="px-4 py-3">123-456-7890</td>
                <td className="px-4 py-3">123 Main St, City, State 12345</td>
                <td className="px-4 py-3">Active</td>
              </tr>
              <tr className="transition hover:bg-blue-50/40">
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  John Doe
                </td>
                <td className="px-4 py-3">MEM001</td>
                <td className="px-4 py-3">john.doe@example.com</td>
                <td className="px-4 py-3">123-456-7890</td>
                <td className="px-4 py-3">123 Main St, City, State 12345</td>
                <td className="px-4 py-3">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
