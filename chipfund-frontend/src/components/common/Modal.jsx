import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-xl",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={`w-full ${width} max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">{title}</h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
