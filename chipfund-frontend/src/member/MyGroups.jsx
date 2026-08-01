import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as authService from "../features/auth/authService";
import { getGroupsByMember } from "../services/groupMemberService";

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGroups = async () => {
    try {
      setLoading(true);

      const profile = await authService.getProfile();

      console.log(profile);

      const memberId = profile.data.member._id; // Adjust if your response shape differs
      console.log("Member ID:", memberId);
      const groups = await getGroupsByMember(memberId);
      console.log("Groups:", groups);

      setGroups(groups.data || groups); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGroups();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading groups...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">My Groups</h1>

      {groups.length === 0 ? (
        <div className="p-10 text-center text-gray-500 bg-white border rounded-lg">
          No Groups Found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Group</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Member</th>
              </tr>
            </thead>

            <tbody>
              {groups.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">{item.chitGroup?.groupName}</td>

                  <td className="px-4 py-3">₹{item.chitGroup?.chitAmount}</td>

                  <td className="px-4 py-3">
                    {item.chitGroup?.duration} Months
                  </td>

                  <td className="px-4 py-3">{item.member?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
