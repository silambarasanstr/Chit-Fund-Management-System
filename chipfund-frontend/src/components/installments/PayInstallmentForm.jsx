import Modal from "../common/Modal";
import Button from "../common/Button";

export default function PayInstallmentForm({
  isOpen,
  onClose,
  installment,
  onConfirm,
}) {
  if (!installment) return null;

  return (
    <Modal
      title="Pay Installment"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">

          <div>
            <p className="text-gray-500">Group</p>
            <p className="font-medium">
              {installment.group?.groupName}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Member</p>
            <p className="font-medium">
              {installment.member?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Installment No</p>
            <p className="font-medium">
              {installment.installmentNo}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Due Amount</p>
            <p className="font-medium text-red-600">
              ₹{installment.dueAmount}
            </p>
          </div>

        </div>

        <div className="p-4 text-sm border border-yellow-200 rounded bg-yellow-50">
          Are you sure you want to mark this installment as <b>Paid</b>?
        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            onClick={onConfirm}
          >
            Pay Now
          </Button>

        </div>
      </div>
    </Modal>
  );
}