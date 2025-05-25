
export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
}

export interface JoinRequest {
  id: string;
  name: string;
  avatar: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  rules: string;
  memberCount: number;
  image: string;
  members: Member[];
  joinRequests: JoinRequest[];
  category?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  isPaid?: boolean;
  subscriptionAmount?: number;
  isActive?: boolean;
}

// Mock data for community
export const mockCommunity: Community = {
  id: "1",
  name: "Tech Enthusiasts",
  description: "A community for tech lovers to discuss the latest trends and innovations.",
  rules: "1. Be respectful\n2. No spam\n3. Stay on topic",
  memberCount: 1243,
  image: "/placeholder.svg",
  members: [
    { id: "m1", name: "John Doe", avatar: "/placeholder.svg", role: "admin" },
    { id: "m2", name: "Jane Smith", avatar: "/placeholder.svg", role: "member" },
    { id: "m3", name: "Alex Johnson", avatar: "/placeholder.svg", role: "member" }
  ],
  joinRequests: [
    { id: "r1", name: "Alice Cooper", avatar: "/placeholder.svg" },
    { id: "r2", name: "Bob Dylan", avatar: "/placeholder.svg" }
  ]
};
