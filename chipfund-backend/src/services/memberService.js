import Member from "../models/Member.js";
import User from "../models/User.js";

// Create Member
export const createMember = async (memberData) => {
  // Create Member
  const member = await Member.create(memberData);

  // Link User -> Member
  await User.findByIdAndUpdate(memberData.user, {
    member: member._id,
  });

  return member;
};

// Get All Members
export const getMembers = async () => {
  const members = await Member.find({
    isDeleted: { $ne: true },
  }).sort({ createdAt: -1 });
  // $ne stands for Not Equal.
  return members;
};

// Get Single Member
export const getMemberById = async (id) => {
  const member = await Member.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// Update Member
export const updateMember = async (id, data) => {
  const member = await Member.findOneAndUpdate(
    {
      _id: id,
      isDeleted: { $ne: true },
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// Delete Member
export const deleteMember = async (id, deletedBy) => {
  const member = await Member.findOneAndUpdate(
    {
      _id: id,
      isDeleted: { $ne: true },
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
        status: "Inactive",
      },
    },
    {
      new: true,
    },
  );

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

export const bulkDeleteMembers = async (ids, deletedBy) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("No member IDs provided");
  }

  const result = await Member.updateMany(
    {
      _id: { $in: ids },
      isDeleted: { $ne: true },
    },
    {
      $set: {
        isDeleted: true,
        status: "Inactive",
        deletedAt: new Date(),
        deletedBy,
      },
    },
  );

  return result;
};

export const bulkCreateMembers = async (members, createdBy) => {
  console.log("Created By:", createdBy);

  if (!Array.isArray(members) || members.length === 0) {
    throw new Error("No members provided");
  }

  const createdMembers = [];
  const failedMembers = [];

  for (const member of members) {
    try {
      // Required field validation
      if (!member.memberId || !member.name || !member.phone) {
        failedMembers.push({
          member,
          reason: "Required fields are missing",
        });
        continue;
      }

      // Duplicate Member ID
      const memberExists = await Member.findOne({
        memberId: member.memberId,
      });

      if (memberExists) {
        failedMembers.push({
          member,
          reason: "Member ID already exists",
        });
        continue;
      }

      // Duplicate Phone
      const phoneExists = await Member.findOne({
        phone: member.phone,
      });

      if (phoneExists) {
        failedMembers.push({
          member,
          reason: "Phone number already exists",
        });
        continue;
      }

      // Duplicate Aadhaar (only if provided)
      if (member.aadhaarNumber) {
        const aadhaarExists = await Member.findOne({
          aadhaarNumber: member.aadhaarNumber,
        });

        if (aadhaarExists) {
          failedMembers.push({
            member,
            reason: "Aadhaar number already exists",
          });
          continue;
        }
      }

      // Duplicate PAN (only if provided)
      if (member.panNumber) {
        const panExists = await Member.findOne({
          panNumber: member.panNumber,
        });

        if (panExists) {
          failedMembers.push({
            member,
            reason: "PAN number already exists",
          });
          continue;
        }
      }

      const memberData = {
        memberId: member.memberId,
        name: member.name,
        phone: member.phone,
        email: member.email || "",
        address: member.address || "",
        status: member.status || "Active",
        createdBy,
      };

      // Add optional fields only when they have values
      if (member.aadhaarNumber?.trim()) {
        memberData.aadhaarNumber = member.aadhaarNumber.trim();
      }

      if (member.panNumber?.trim()) {
        memberData.panNumber = member.panNumber.trim().toUpperCase();
      }

      const newMember = await Member.create(memberData);

      createdMembers.push(newMember);
    } catch (error) {
      failedMembers.push({
        member,
        reason: error.message,
      });
    }
  }

  return {
    total: members.length,
    imported: createdMembers.length,
    failed: failedMembers.length,
    createdMembers,
    failedMembers,
  };
};
