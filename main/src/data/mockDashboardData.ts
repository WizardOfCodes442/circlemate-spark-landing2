export const mockMatches2 = [
  {
    id: "m1",
    name: "David Brown",
    role: "Romance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio at magna tincidunt congue eu vel nisi. Sed euismod, nisl vel aliquam luctus, nunc nisl aliquam mauris.",
    zodiac: "Sagittarius",
    education: "High School",
    familyPlans: "Not sure",
    personalityType: "ENTJ",
    lifestyle: {
      pets: "Don't have, but love",
      drinking: "On special occasions",
      smoking: "Non-smoker",
      workout: "Sometimes",
      dietaryPreference: "Other",
      socialMedia: "Socially active",
      sleepingHabits: "Night owl",
    },
    interests: ["Music", "Travel", "Photography"],
    lookingFor: "Short-term fun",
    essentials: {
      distance: "8 miles away",
      employment: "Employed",
      education: "Polytechnic Ibadan",
      location: "Lagos, Nigeria",
      languages: "Hausa, Pidgin",
    },
  },
];

export const mockActivities = [
  { id: 1, user: "David Brown", action: "requested to connect with you", time: "2 hours ago", status: "pending" },
  { id: 2, user: "Jessica Williams", action: "scheduled a meetup with you", time: "1 day ago", date: "Tomorrow, 10:00 AM", location: "Coffee at The Brew House" },
  { id: 3, user: "Michael Johnson", action: "left feedback on your meetup", time: "2 days ago", feedback: "Great conversation, would meet again!", rating: 4 },
  { id: 4, user: "Sarah Thompson", action: "confirmed your connection request", time: "3 days ago" },
  { id: 5, user: "Emily Davis", action: "requested to connect with you", time: "4 hours ago", status: "pending" },
  { id: 6, user: "John Smith", action: "scheduled a meetup with you", time: "1 day ago", date: "Monday, 2:00 PM", location: "Tech Hub" },
];

export const fetchMatchesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockMatches2;
};

export const fetchActivitiesFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockActivities;
};