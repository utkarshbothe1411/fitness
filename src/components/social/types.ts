export type Friend = {
  id: string;
  name: string;
  avatar: string;
  fitnessLevel: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  shared: boolean;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  joined: boolean;
};