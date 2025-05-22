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
    location: 'Nairobi',
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
    location: 'Mombasa',
  },
  {
    id: 3,
    email: 'supplier1@example.com',
    password: 'password123',
    first_name: 'Mike',
    last_name: 'Brown',
    user_type: 'hardware',
    storeName: 'Hardware Store A',
    location: 'Kisumu',
  },
  {
    id: 4,
    email: 'admin1@example.com',
    password: 'password123',
    first_name: 'Admin',
    last_name: 'User',
    user_type: 'admin',
    location: 'Eldoret',
  },
  {
    id: 5,
    email: 'fundi1@example.com',
    password: 'password123',
    first_name: 'Peter',
    last_name: 'Kamau',
    user_type: 'fundi',
    trade: 'Plumbing',
    location: 'Nakuru',
  },
  {
    id: 6,
    email: 'contractor1@example.com',
    password: 'password123',
    first_name: 'Alice',
    last_name: 'Mwangi',
    user_type: 'contractor',
    licenseNumber: 'CON12345',
    location: 'Thika',
  },
];

export const dummyBuilders = [
  { id: 1, first_name: "John", last_name: "Doe", specialization: "Civil Engineer", email: "john.doe@buildco.com", phone: "123-456-7890", company: "BuildCo", verified: false, experienceLevel: "senior" },
  { id: 2, first_name: "Sarah", last_name: "Smith", specialization: "Plumber", email: "sarah.smith@buildco.com", phone: "234-567-8901", company: "PipeFix", verified: false, experienceLevel: "junior" },
  { id: 3, first_name: "Emily", last_name: "Johnson", specialization: "Roofer", email: "emily.johnson@buildco.com", phone: "345-678-9012", company: "RoofPro", verified: false, experienceLevel: "junior" },
];

export let dummyProjects = [
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
    materialSource: "Eco-Friendly",
  },
];

export const dummyFAQs = [
  { question: "How do I assign a project?", answer: "Go to the Builders page, select a builder, and choose a start time." },
  { question: "How can I track project progress?", answer: "Visit the Project Logs section or use the real-time progress tracker on the main page." },
];