import { useEffect, useState } from "react";
import {
  defaultProjects,
  getSkills,
  saveCustomSkills,
  STORAGE_KEYS,
  fetchProjectsFromAPI,
} from "../data/portfolioData";

export default function usePortfolioData() {
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(() => getSkills());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const apiProjects = await fetchProjectsFromAPI();
        setProjects([...defaultProjects, ...apiProjects]);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    const refresh = () => {
      loadProjects();
      setSkills(getSkills());
    };

    window.addEventListener("portfolio-data-updated", refresh);

    return () => {
      window.removeEventListener("portfolio-data-updated", refresh);
    };
  }, []);

  const updateCustomSkills = (skillsToSave) => {
    saveCustomSkills(skillsToSave);
    window.dispatchEvent(new Event("portfolio-data-updated"));
  };

  return {
    projects,
    skills,
    loading,
    updateCustomSkills,
    storageKeys: STORAGE_KEYS,
  };
}
