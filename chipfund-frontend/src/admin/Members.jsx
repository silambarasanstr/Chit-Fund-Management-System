// 1. React
import React, { useEffect, useState } from "react";

// 2. Third-party Libraries
import { Users } from "lucide-react";
import { toast } from "sonner";

// 3. Services / API
import { getMembers } from "../services/memberService";

// 4. Common Components
import Button from "../components/common/Button";
import ExportButton from "../components/common/ExportButton";
import ImportButton from "../components/common/ImportButton";
import Pagination from "../components/common/Pagination";
import RefreshButton from "../components/common/RefreshButton";
import RowsPerPage from "../components/common/RowsPerPage";
import SearchBox from "../components/common/SearchBox";
import StatusFilter from "../components/common/StatusFilter";

// 5. Feature Components
import MemberForm from "../components/members/MemberForm";
import MemberList from "../components/members/MemberList";
import MemberViewModal from "../components/members/MemberViewModal";

const Members = () => {
  // State
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [viewingData, setViewingData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // API Functions
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await getMembers();
      setMembers(res?.data?.data || res?.data || []);
    } catch (error) {
      console.error("Fetch Members Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch members"
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  //  Derived Data
  const filteredMembers = members.filter((member) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      member.name?.toLowerCase().includes(keyword) ||
      member.memberId?.toLowerCase().includes(keyword) ||
      member.phone?.toLowerCase().includes(keyword) ||
      member.email?.toLowerCase().includes(keyword);

    const matchesStatus = status === "" || member.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  //  Effects
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  
  // Event Handlers
 
  const handleAdd = () => {
    setEditingData(null);
    setIsOpen(true);
  };
 
  const handleEdit = (member) => {
    setEditingData(member);
    setIsOpen(true);
  };
  
  const handleView = (member) => {
    setViewingData(member);
    setIsViewModalOpen(true);
  };
  const handleFormClose = () => {
    setIsOpen(false);
    setEditingData(null);
  };
 
  const handleViewClose = () => {
    setIsViewModalOpen(false);
    setViewingData(null);
  };
  
  const handleRefresh = async () => {
    await fetchMembers();
    toast.success("Members refreshed");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your members here.
          </p>
        </div>

        <div className="flex gap-3">
          <ImportButton refresh={fetchMembers} />

          <ExportButton data={filteredMembers} fileName="Members" />

          <Button variant="primary" onClick={handleAdd}>
            + Add Member
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="w-full lg:max-w-sm">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search member..."
          />
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <StatusFilter
            value={status}
            onChange={setStatus}
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
          />

          <RefreshButton loading={loading} onRefresh={handleRefresh} />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            <span className="text-sm text-gray-500">Total Members</span>
          </div>
          <p className="text-2xl font-bold">{members.length}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Showing</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {currentMembers.length}
          </h2>
        </div>
      </div>

      <MemberList
        members={currentMembers}
        onEdit={handleEdit}
        onView={handleView}
        refresh={fetchMembers}
        loading={loading}
      />

      <MemberForm
        isOpen={isOpen}
        onClose={handleFormClose}
        refresh={fetchMembers}
        editData={editingData}
      />

      <MemberViewModal
        isOpen={isViewModalOpen}
        onClose={handleViewClose}
        member={viewingData}
      />

      <div className="flex flex-col items-center justify-between md:flex-row">
        <RowsPerPage value={itemsPerPage} onChange={setItemsPerPage} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Members;
