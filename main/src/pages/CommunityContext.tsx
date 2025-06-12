import { createContext, useContext, useState, ReactNode } from "react";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  tags: string[];
  subscriptionType: "Admin-Paid" | "Individual-Paid";
  isFeatured?: boolean;
  members: { id: string; name: string; avatar: string; lastActive: string }[];
}

const initialCommunities: Community[] = [
  {
    id: "1",
    name: "Lagos Tech Circle",
    description: "For tech professionals and enthusiasts in Lagos",
    image: "https://images.unsplash.com/photo-1558403194-611308249627",
    memberCount: 534,
    tags: ["Technology", "Professional"],
    subscriptionType: "Admin-Paid",
    isFeatured: true,
    members: [
      { id: "m1", name: "John Doe", avatar: "/user1.png", lastActive: "2025-06-10" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", lastActive: "2025-06-05" },
    ],
  },
  {
    id: "2",
    name: "Church of Grace Fellowship",
    description: "A spiritual community focused on growth and service",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    memberCount: 328,
    tags: ["Religious", "Community"],
    subscriptionType: "Individual-Paid",
    members: [
      { id: "m3", name: "Emma Wilson", avatar: "/user3.png", lastActive: "2025-06-11" },
      { id: "m4", name: "Michael Brown", avatar: "/user4.png", lastActive: "2025-06-01" },
    ],
  },
  {
    id: "3",
    name: "University of Lagos Alumni",
    description: "Graduates from University of Lagos across all years",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    memberCount: 742,
    tags: ["Education", "Alumni"],
    subscriptionType: "Admin-Paid",
    isFeatured: true,
    members: [
      { id: "m5", name: "Alice Cooper", avatar: "/user5.png", lastActive: "2025-06-12" },
      { id: "m6", name: "Bob Dylan", avatar: "/user6.png", lastActive: "2025-05-30" },
    ],
  },
  {
    id: "4",
    name: "Lagos Young Professionals",
    description: "Network of ambitious professionals under 35",
    image: "https://images.unsplash.com/photo-1541746972996-4fc1d4ee96f0",
    memberCount: 621,
    tags: ["Professional", "Networking"],
    subscriptionType: "Individual-Paid",
    members: [
      { id: "m7", name: "Sarah Lee", avatar: "/user7.png", lastActive: "2025-06-09" },
      { id: "m8", name: "David Kim", avatar: "/user8.png", lastActive: "2025-06-02" },
    ],
  },
  {
    id: "5",
    name: "Lagos Book Club",
    description: "For avid readers who enjoy discussing literature",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    memberCount: 156,
    tags: ["Hobby", "Education"],
    subscriptionType: "Admin-Paid",
    members: [
      { id: "m9", name: "Lisa Wong", avatar: "/user9.png", lastActive: "2025-06-12" },
      { id: "m10", name: "Tom Chen", avatar: "/user10.png", lastActive: "2025-05-28" },
    ],
  },
  {
    id: "6",
    name: "Nigerian Medical Association",
    description: "For healthcare professionals across Nigeria",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    memberCount: 412,
    tags: ["Professional", "Medical"],
    subscriptionType: "Individual-Paid",
    isFeatured: true,
    members: [
      { id: "m11", name: "Grace Adebayo", avatar: "/user11.png", lastActive: "2025-06-11" },
      { id: "m12", name: "Victor Obi", avatar: "/user12.png", lastActive: "2025-06-03" },
    ],
  },
];

interface CommunityContextType {
  communities: Community[];
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);

  return (
    <CommunityContext.Provider value={{ communities, setCommunities }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunities must be used within a CommunityProvider");
  }
  return context;
};

