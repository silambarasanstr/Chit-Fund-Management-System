import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Shield, Calendar } from "lucide-react";
import { getProfile } from "../features/auth/authService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load profile.
      </div>
    );
  }

  const member = profile.member || {};

  return (
    <div className="max-w-5xl p-6 mx-auto">
      {/* Header Card */}
      <div className="overflow-hidden bg-white border shadow rounded-xl">
        <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="px-8 pb-8">
          <div className="flex items-end gap-5 -mt-12">
            <div className="flex items-center justify-center w-24 h-24 bg-white border-4 border-white rounded-full shadow">
              <User size={40} className="text-gray-500" />
            </div>

            <div className="pb-2">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="grid gap-5 mt-6 md:grid-cols-2">
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={profile.email}
            />

            <InfoCard
              icon={<Phone size={18} />}
              label="Phone"
              value={profile.phone || "-"}
            />

            <InfoCard
              icon={<Shield size={18} />}
              label="Role"
              value={profile.role}
            />

            <InfoCard
              icon={<User size={18} />}
              label="Member ID"
              value={member.memberId || "-"}
            />

            <InfoCard
              icon={<MapPin size={18} />}
              label="Address"
              value={member.address || "-"}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              label="Status"
              value={member.status || "-"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 border rounded-lg">
    <div className="text-blue-600">{icon}</div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium break-words">{value || "-"}</p>
    </div>
  </div>
);

export default Profile;
