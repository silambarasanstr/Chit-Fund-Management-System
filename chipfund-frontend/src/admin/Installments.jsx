import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../components/common/Button";
import InstallmentForm from "../components/installments/InstallmentForm";
import InstallmentList from "../components/installments/InstallmentList";
import PayInstallmentForm from "../components/installments/PayInstallmentForm";

import {
  getInstallments,
  deleteInstallment,
  payInstallment,
} from "../services/installmentService";

export default function Installments() {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const fetchInstallments = async () => {
    try {
      setLoading(true);

      const res = await getInstallments();

      setInstallments(res.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch installments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallments();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setIsOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInstallment(id);

      toast.success("Installment deleted successfully");

      fetchInstallments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete installment",
      );
    }
  };

  const handlePay = (installment) => {
    setSelectedInstallment(installment);
    setIsPayOpen(true);
  };

  const handleConfirmPayment = async () => {
  if (!selectedInstallment) return;

  try {
    await payInstallment(selectedInstallment._id);

    toast.success("Installment paid successfully");

    setIsPayOpen(false);
    setSelectedInstallment(null);

    await fetchInstallments();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Payment failed"
    );
  }
};

  const handleFormClose = () => {
    setIsOpen(false);
    setEditData(null);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Installments</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all installment payments.
          </p>
        </div>

        <Button onClick={handleAdd}>+ Add Installment</Button>
      </div>

      <InstallmentList
        installments={installments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPay={handlePay}
      />

      <InstallmentForm
        isOpen={isOpen}
        onClose={handleFormClose}
        editData={editData}
        onSuccess={fetchInstallments}
      />

      <PayInstallmentForm
        isOpen={isPayOpen}
        onClose={() => {
          setIsPayOpen(false);
          setSelectedInstallment(null);
        }}
        installment={selectedInstallment}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}
