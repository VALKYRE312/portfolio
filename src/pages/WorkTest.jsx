import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Minimal test without Framer Motion

const defaultProjects = [
  { id: "1", title: "Project 1", color: "bg-pink-200/10" },
  { id: "2", title: "Project 2", color: "bg-emerald-200/10" },
  { id: "3", title: "Project 3", color: "bg-orange-200/10" },
  { id: "4", title: "Project 4", color: "bg-yellow-200/10" },
  { id: "5", title: "Project 5", color: "bg-fuchsia-200/10" },
  { id: "6", title: "Project 6", color: "bg-sky-200/10" },
];

export default function WorkTest() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const url = `${API_URL}/projects?published=true`;
        
        console.log('🔍 Fetching:', url);
        const response = await fetch(url);
        
        if (response.ok) {
          const apiProjects = await response.json();
          console.log('✅ API Projects:', apiProjects.length);
          
          const merged = [...defaultProjects, ...apiProjects];
          console.log('🔵 Merged:', merged.length);
          console.log('🔵 IDs:', merged.map(p => p.id));
          
          setProjects(merged);
        }
      } catch (error) {
        console.error('❌ Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  console.log('🟢 Render - Projects count:', projects.length);

  if (loading) {
    return <div className="p-20 text-white">Loading...</div>;
  }

  return (
    <main className="bg-black text-white p-20">
      <h1 className="text-4xl mb-10">Work Test - {projects.length} Projects</h1>
      
      <div className="space-y-8">
        {projects.map((project, index) => {
          console.log('🟡 Rendering:', index, project.title);
          
          return (
            <div
              key={project.id}
              className={`
                ${project.color}
                p-8 rounded-xl border border-white/20
              `}
            >
              <h2 className="text-2xl font-bold">{index + 1}. {project.title}</h2>
              <div className="text-sm text-white/50 mt-2">ID: {project.id}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-4 bg-white/5 rounded">
        <h3 className="text-xl mb-2">Debug Info:</h3>
        <pre className="text-xs text-white/70">
          {JSON.stringify(projects.map(p => ({ id: p.id, title: p.title })), null, 2)}
        </pre>
      </div>
    </main>
  );
}
