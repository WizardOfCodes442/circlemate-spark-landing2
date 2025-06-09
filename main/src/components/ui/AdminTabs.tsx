import { Button } from "@/components/ui/button";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs = ({ activeTab, setActiveTab }: AdminTabsProps) => {
  const tabs = [
    "Platform Overview",
    "Communities",
    "Events",
    "Revenue",
    "Moderation",
    "Match Analytics",
    "Reports",
    "Leaderboard",
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-2 border-b">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "ghost"}
          className={`whitespace-nowrap ${activeTab === tab ? "border-b-2 border-teal-500" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default AdminTabs;