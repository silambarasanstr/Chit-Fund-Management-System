import { RefreshCcw } from "lucide-react";
import Button from "../../components/common/Button";

const RefreshButton = ({
  onRefresh,
  loading = false,
  className = "",
  title = "Refresh",
}) => {
  return (
    <Button
      onClick={onRefresh}
      disabled={loading}
      title={title}
      className={`
       gap-2
      `}
    >
      <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />

      {loading ? "Refreshing..." : "Refresh"}
    </Button>
  );
};

export default RefreshButton;
