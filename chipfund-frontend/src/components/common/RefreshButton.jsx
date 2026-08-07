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
>
  <RefreshCcw
    size={18}
    className={loading ? "animate-spin" : ""}
  />
  <span>{loading ? "Refreshing..." : "Refresh"}</span>
</Button>
  );
};

export default RefreshButton;