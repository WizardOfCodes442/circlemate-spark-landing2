// src/data/communityData.ts
export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  tags: string[];
  subscriptionType: "Admin-Paid" | "Individual-Paid";
  isFeatured?: boolean;
  members: { id: string; name: string; avatar: string; lastActive: string; role?: string }[];
}

export const initialCommunities: Community[] = [
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
      { id: "m1", name: "John Doe", avatar: "/user1.png", lastActive: "2025-06-10", role: "member" },
      { id: "m2", name: "Jane Smith", avatar: "/user2.png", lastActive: "2025-06-05", role: "admin" },
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
      { id: "m3", name: "Emma Wilson", avatar: "/user3.png", lastActive: "2025-06-11", role: "member" },
      { id: "m4", name: "Michael Brown", avatar: "/user4.png", lastActive: "2025-06-01", role: "member" },
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
      { id: "m5", name: "Alice Cooper", avatar: "/user5.png", lastActive: "2025-06-12", role: "admin" },
      { id: "m6", name: "Bob Dylan", avatar: "/user6.png", lastActive: "2025-05-30", role: "member" },
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
      { id: "m7", name: "Sarah Lee", avatar: "/user7.png", lastActive: "2025-06-09", role: "member" },
      { id: "m8", name: "David Kim", avatar: "/user8.png", lastActive: "2025-06-02", role: "member" },
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
      { id: "m9", name: "Lisa Wong", avatar: "/user9.png", lastActive: "2025-06-12", role: "admin" },
      { id: "m10", name: "Tom Chen", avatar: "/user10.png", lastActive: "2025-05-28", role: "member" },
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
      { id: "m11", name: "Grace Adebayo", avatar: "/user11.png", lastActive: "2025-06-11", role: "member" },
      { id: "m12", name: "Victor Obi", avatar: "/user12.png", lastActive: "2025-06-03", role: "member" },
    ],
  },
];
