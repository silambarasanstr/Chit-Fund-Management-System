import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

const MemberViewModal = ({ isOpen, onClose, member }) => {
  if (!member) return null;

  const fields = [
    { label: "Member ID", value: member.memberId },
    { label: "Name", value: member.name },
    { label: "Email", value: member.email },
    { label: "Phone", value: member.phone },
    { label: "Address", value: member.address },
    { label: "Status", value: member.status },
    {
      label: "Created At",
      value: member.createdAt
        ? new Date(member.createdAt).toLocaleString()
        : "-",
    },
    {
      label: "Updated At",
      value: member.updatedAt
        ? new Date(member.updatedAt).toLocaleString()
        : "-",
    },
  ];

  return (
    <Modal title="Member Details" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-100"
          >
            <span className="text-sm font-medium text-gray-500">
              {field.label}
            </span>

            <span className="col-span-2 text-sm text-gray-900 break-words">
              {field.value || "-"}
            </span>
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberViewModal;
