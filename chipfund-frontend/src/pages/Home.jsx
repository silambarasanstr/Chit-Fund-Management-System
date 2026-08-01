import React, { useState } from "react";
import Button from "../components/common/Button";
import AddEmployeeModal from "../components/common/AddEmployeeModal";
import { toast } from "sonner";

const Home = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  return (
    <div >
      <div>
        <Button variant="secondary" onClick={() => setIsAddEmployeeModalOpen(true)}>
          Default
        </Button>
      </div>

      <div className="mt-4">
        <Button onClick={() => toast.success("Employee added successfully!")}>
          Add Employee
        </Button>
      </div>

      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />
    </div>
  );
};

export default Home;
