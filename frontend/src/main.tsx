import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CoursesProvider } from './contexts/CoursesContext.tsx';

createRoot(document.getElementById("root")!).render(<CoursesProvider><App /></CoursesProvider>);
