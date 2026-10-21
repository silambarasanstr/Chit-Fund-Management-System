import { useEffect, useState } from "react";
import { UserRoundCog, Users } from "lucide-react";
import * as authService from "../features/auth/authService";
import { getGroupsByMember } from "../services/groupMemberService";

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profilePending, setProfilePending] = useState(false);

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const fetchMyGroups = async () => {
    try {
      setLoading(true);

      const profile = await authService.getProfile();

      if (!profile.data?.member) {
        setProfilePending(true);
        return;
      }

      const memberId = profile.data.member._id;
      const response = await getGroupsByMember(memberId);

      setGroups(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading groups...</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Groups</h1>
        <p className="mt-1 text-sm text-gray-500">
          View the chit groups assigned to your account.
        </p>
      </div>

      {profilePending ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border shadow-sm rounded-xl">
          <UserRoundCog size={56} className="mb-5 text-orange-500" />

          <h2 className="text-2xl font-semibold text-orange-600">
            Member Profile Pending
          </h2>

          <p className="mt-3 text-gray-600">
            Your account has been registered successfully.
          </p>

          <p className="max-w-2xl mt-2 text-sm leading-6 text-center text-gray-500">
            Your member profile has not been created yet. Please wait for the
            administrator to verify your account, create your member profile,
            and assign you to a chit group.
          </p>
        </div>
      ) : groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border shadow-sm rounded-xl">
          <Users size={56} className="mb-5 text-blue-500" />

          <h2 className="text-2xl font-semibold text-blue-600">
            No Groups Assigned
          </h2>

          <p className="mt-3 text-gray-600">
            You are not assigned to any chit group yet.
          </p>

          <p className="mt-2 text-sm text-center text-gray-500">
            Please contact the administrator for further assistance.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border shadow-sm rounded-xl">
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

                  <td className="px-4 py-3 font-medium">
                    {item.chitGroup?.groupName}
                  </td>

                  <td className="px-4 py-3">
                    ₹{item.chitGroup?.chitAmount?.toLocaleString()}
                  </td>

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
