import Member from "../models/Member.js";

// ===============================
// Create Member
// ===============================
export const createMember = async (memberData) => {
  const { memberId, phone, aadhaarNumber } = memberData;

  // Check Member ID
  const existingMemberId = await Member.findOne({ memberId });
  if (existingMemberId) {
    throw new Error("Member ID already exists");
  }

  // Check Phone
  const existingPhone = await Member.findOne({ phone });
  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Check Aadhaar (if provided)
  if (aadhaarNumber) {
    const existingAadhaar = await Member.findOne({ aadhaarNumber });

    if (existingAadhaar) {
      throw new Error("Aadhaar already exists");
    }
  }

  const member = await Member.create(memberData);

  return member;
};

// ===============================
// Get All Members
// ===============================
export const getMembers = async () => {
  return await Member.find().sort({ createdAt: -1 });
};

// ===============================
// Get Single Member
// ===============================
export const getMemberById = async (id) => {
  const member = await Member.findById(id);

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// ===============================
// Update Member
// ===============================
export const updateMember = async (id, data) => {
  const member = await Member.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// ===============================
// Delete Member
// ===============================
export const deleteMember = async (id) => {
  const member = await Member.findByIdAndDelete(id);

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};