import { useEffect, useState } from "react";
import { toast } from "sonner";

import Button from "../components/common/Button";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentList from "../components/payments/PaymentList";

import { getPayments, deletePayment } from "../services/paymentService";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await getPayments();

      setPayments(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditData(null);
    setIsOpen(true);
  };

  const handleEdit = (payment) => {
    setEditData(payment);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?",
    );

    if (!confirmDelete) return;

    try {
      await deletePayment(id);

      toast.success("Payment deleted successfully");

      fetchPayments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payments</h1>

          <p className="mt-1 text-sm text-slate-500">Manage payment records.</p>
        </div>

        <Button onClick={handleAdd}>+ Add Payment</Button>
      </div>

      {/* Payment Table */}
      <PaymentList
        payments={payments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Modal */}
      <PaymentForm
        isOpen={isOpen}
        editData={editData}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        onSuccess={fetchPayments}
      />
    </div>
  );
}
