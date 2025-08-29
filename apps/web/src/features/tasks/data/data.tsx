import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from "@tabler/icons-react";

export const labels = [
  {
    value: "frontend",
    label: "Frontend",
  },
  {
    value: "backend",
    label: "Backend",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "testing",
    label: "Testing",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "devops",
    label: "DevOps",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: IconExclamationCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: IconCircle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: IconStopwatch,
  },
  {
    value: "done",
    label: "Done",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: IconArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: IconArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: IconArrowUp,
  },
  {
    label: "Urgent",
    value: "urgent",
    icon: IconExclamationCircle,
  },
];
