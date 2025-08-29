import { faker } from "@faker-js/faker";
import { type Agent } from "../../features/agents/data/agents";

// Turkish agent names (realistic customer service names)
const turkishAgentNames = {
  male: [
    "Ahmet",
    "Mehmet",
    "Ali",
    "Murat",
    "Emre",
    "Kemal",
    "Fatih",
    "Serkan",
    "Özkan",
    "Burak",
    "Erkan",
    "Cem",
    "Onur",
    "Barış",
    "Deniz",
    "Oğuz",
    "Kaan",
    "Arda",
    "Emir",
    "Yusuf",
    "Berkay",
    "Utku",
    "Tolga",
    "Görkem",
  ],
  female: [
    "Ayşe",
    "Fatma",
    "Zeynep",
    "Elif",
    "Selin",
    "Merve",
    "Burcu",
    "Gizem",
    "Cansu",
    "Esra",
    "Özlem",
    "Pınar",
    "Sibel",
    "Tuğba",
    "Aysun",
    "Ebru",
    "Didem",
    "Hazal",
    "Tuğçe",
    "Ceren",
    "Betül",
    "Duygu",
    "Gamze",
    "Sevgi",
  ],
};

// Department groups (matching the agents page structure)
const _departmentGroups = ["All Available", "Finansal", "Promosyonlar", "Deneme", "Diğer"];

// Generate realistic away time (for away agents)
function generateAwayTime(): string {
  const hour = faker.number.int({ min: 9, max: 18 });
  const minute = faker.number.int({ min: 0, max: 59 });
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

// Generate realistic avatar URL
function generateAvatar(name: string, isMale: boolean): string {
  // Use a combination of realistic avatar services
  const services = [
    `https://randomuser.me/api/portraits/${isMale ? "men" : "women"}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
    `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1700000000000 })}?w=100&h=100&fit=crop&crop=face`,
    `https://i.pravatar.cc/100?u=${name.replace(/\s+/g, "").toLowerCase()}`,
  ];

  return faker.helpers.arrayElement(services);
}

// Generate realistic chat count based on status and department
function generateChatCount(status: "online" | "away", group: string): number {
  if (status === "away") return 0;

  // Online agents have different chat loads based on department
  const baseChatCounts = {
    "All Available": { min: 0, max: 5 },
    Finansal: { min: 1, max: 8 },
    Promosyonlar: { min: 0, max: 6 },
    Deneme: { min: 0, max: 3 },
    Diğer: { min: 0, max: 4 },
  };

  const range = baseChatCounts[group as keyof typeof baseChatCounts] || { min: 0, max: 3 };
  return faker.number.int(range);
}

// Determine department based on name and randomization
function assignDepartment(name: string): string {
  // Some agents work in multiple departments (All Available)
  if (faker.datatype.boolean({ probability: 0.3 })) {
    return "All Available";
  }

  // Others are specialized
  const specializedDepartments = ["Finansal", "Promosyonlar", "Deneme", "Diğer"];
  return faker.helpers.arrayElement(specializedDepartments);
}

// Generate single agent
function generateAgent(id: number): Agent {
  const isMale = faker.datatype.boolean();
  const name = isMale
    ? faker.helpers.arrayElement(turkishAgentNames.male)
    : faker.helpers.arrayElement(turkishAgentNames.female);

  // 70% online, 30% away (realistic for work hours)
  const status: "online" | "away" = faker.datatype.boolean({ probability: 0.7 })
    ? "online"
    : "away";
  const group = assignDepartment(name);
  const chatCount = generateChatCount(status, group);
  const awayTime = status === "away" ? generateAwayTime() : undefined;

  return {
    id,
    name,
    status,
    group,
    chatCount: status === "online" ? chatCount : undefined,
    awayTime,
    avatar: generateAvatar(name, isMale),
    actionButtons: {
      kickOff: true,
      setAway: status === "online", // Can only set away if currently online
    },
  };
}

// Generate agents by department for realistic distribution
function generateAgentsByDepartment(): Agent[] {
  const agents: Agent[] = [];
  let currentId = 1;

  // Distribution by department
  const departmentDistribution = {
    "All Available": 4, // Senior agents who handle all
    Finansal: 6, // Financial department (busiest)
    Promosyonlar: 4, // Promotions
    Deneme: 3, // Demo/Trial support
    Diğer: 3, // Other inquiries
  };

  // Generate agents for each department
  Object.entries(departmentDistribution).forEach(([department, count]) => {
    for (let i = 0; i < count; i++) {
      const agent = generateAgent(currentId++);
      agent.group = department;
      agents.push(agent);
    }
  });

  // Shuffle to make it more realistic
  return faker.helpers.shuffle(agents);
}

// Generate multiple agents
export function generateAgents(count?: number): Agent[] {
  if (count) {
    // If specific count requested, generate that many
    const agents: Agent[] = [];
    for (let i = 1; i <= count; i++) {
      agents.push(generateAgent(i));
    }
    return agents;
  }

  // Default: generate by department distribution (more realistic)
  return generateAgentsByDepartment();
}

// Export for easy use
export default generateAgents;
