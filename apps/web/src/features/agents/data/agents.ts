export interface Agent {
  id: number;
  name: string;
  status: "online" | "away";
  group: string;
  chatCount?: number;
  awayTime?: string;
  avatar: string;
  actionButtons?: {
    kickOff?: boolean;
    setAway?: boolean;
  };
}

export const mockAgents: Agent[] = [
  {
    id: 1,
    name: "Hazal",
    status: "online",
    group: "Müsait",
    chatCount: 1,
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: true,
    },
  },
  {
    id: 2,
    name: "Tuğçe",
    status: "online",
    group: "Müsait",
    chatCount: 2,
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: true,
    },
  },
  {
    id: 3,
    name: "Asil",
    status: "away",
    group: "Müsait",
    awayTime: "10:11",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
  {
    id: 4,
    name: "Emrah",
    status: "away",
    group: "Müsait",
    awayTime: "13:29",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
  {
    id: 5,
    name: "Yarkı",
    status: "away",
    group: "Müsait",
    awayTime: "11:21",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
  {
    id: 6,
    name: "Mehmet",
    status: "online",
    group: "Yatırım Danışmanlığı",
    chatCount: 3,
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: true,
    },
  },
  {
    id: 7,
    name: "Ayşe",
    status: "away",
    group: "Yatırım Danışmanlığı",
    awayTime: "14:15",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
  {
    id: 8,
    name: "Ali",
    status: "online",
    group: "Piyasa Analizi",
    chatCount: 1,
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: true,
    },
  },
  {
    id: 9,
    name: "Fatma",
    status: "away",
    group: "Piyasa Analizi",
    awayTime: "12:30",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
  {
    id: 10,
    name: "Can",
    status: "online",
    group: "Portföy Yönetimi",
    chatCount: 0,
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: true,
    },
  },
  {
    id: 11,
    name: "Zeynep",
    status: "away",
    group: "Teknik Destek",
    awayTime: "15:45",
    avatar: "/api/placeholder/32/32",
    actionButtons: {
      kickOff: true,
      setAway: false,
    },
  },
];

export const agentGroups = [
  "Müsait",
  "Yatırım Danışmanlığı",
  "Piyasa Analizi",
  "Portföy Yönetimi",
  "Teknik Destek",
];
