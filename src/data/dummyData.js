export let dummyUsers = [
  {
    id: 1,
    email: 'client1@example.com',
    password: 'password123',
    first_name: 'Jane',
    last_name: 'Smith',
    user_type: 'client',
    phone: '123-456-7890',
    license_number: 'LIC123',
    id_number: 'ID123',
    address: '123 Main St',
  },
  {
    id: 2,
    email: 'builder1@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    user_type: 'builder',
    phone: '234-567-8901',
    specialization: 'Civil Engineer',
    company: 'BuildCo',
  },
];

export const dummyBuilders = [
  { id: 1, first_name: "John", last_name: "Doe", specialization: "Civil Engineer", email: "john.doe@buildco.com", phone: "123-456-7890", company: "BuildCo" },
  { id: 2, first_name: "Sarah", last_name: "Smith", specialization: "Plumber", email: "sarah.smith@buildco.com", phone: "234-567-8901", company: "PipeFix" },
  { id: 3, first_name: "Emily", last_name: "Johnson", specialization: "Roofer", email: "emily.johnson@buildco.com", phone: "345-678-9012", company: "RoofPro" },
];

export const dummyProjects = [
  { id: 1, builder: "John Doe", client: "Jane Smith", scheduled_datetime: "2025-05-21T10:00:00", end_datetime: "2025-06-21T10:00:00", status: "assigned" },
];

export const dummyProjectLogs = [
  { id: 1, client: "Jane Smith", date: "2025-05-15", requirements: "Foundation Work", progress: "50%", notes: "Concrete poured" },
];

export const dummyFAQs = [
  { question: "How do I assign a project?", answer: "Go to the Builders page, select a builder, and choose a start time." },
  { question: "How can I track project progress?", answer: "Visit the Project Logs section or use the real-time progress tracker on the main page." },
];
export const dummyBuilders = [
  { id: 1, first_name: "John", last_name: "Doe", specialization: "Civil Engineer", email: "john.doe@buildco.com", phone: "123-456-7890", company: "BuildCo" },
  { id: 2, first_name: "Sarah", last_name: "Smith", specialization: "Plumber", email: "sarah.smith@buildco.com", phone: "234-567-8901", company: "PipeFix" },
  { id: 3, first_name: "Emily", last_name: "Johnson", specialization: "Roofer", email: "emily.johnson@buildco.com", phone: "345-678-9012", company: "RoofPro" },
];

export const dummyProjects = [
  { id: 1, client: "client1@example.com", builder: "John Doe", date: "2025-05-15", requirements: "Foundation Work", progress: "50%", notes: "Concrete poured" },
];

export const dummyProjectLogs = [
  {
    id: 1,
    client: "Jane Smith",
    date: "2025-05-15",
    requirements: "Foundation Work",
    progress: "50%",
    notes: "Concrete poured",
    materialSource: "Eco-Friendly", // Added
  },
];