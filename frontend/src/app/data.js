export const baseUrl =
  import.meta.env.VITE_MODE == "development"
    ? `${import.meta.env.VITE_BACKEND_URL}/api/v1`
    : "/api/v1";

export const courseDifficulties = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export const courseCategories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "nodejs", label: "Node JS" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "reactjs", label: "React JS" },
  { id: "reduxjs", label: "Redux" },
];
