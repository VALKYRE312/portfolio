import { useEffect, useState } from "react";
import {
  getProjects,
  getSkills,
  saveCustomProjects,
  saveCustomSkills,
  STORAGE_KEYS,
} from "../data/portfolioData";

export default function usePortfolioData() {
  const [projects, setProjects] = useState(() => getProjects());
  const [skills, setSkills] = useState(() => getSkills());

  useEffect(() => {
    const refresh = () => {
      setProjects(getProjects());
      setSkills(getSkills());
    };

    window.addEventListener("portfolio-data-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("portfolio-data-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const updateCustomProjects = (projectsToSave) => {
    saveCustomProjects(projectsToSave);
    window.dispatchEvent(new Event("portfolio-data-updated"));
  };

  const updateCustomSkills = (skillsToSave) => {
    saveCustomSkills(skillsToSave);
    window.dispatchEvent(new Event("portfolio-data-updated"));
  };

  return {
    projects,
    skills,
    updateCustomProjects,
    updateCustomSkills,
    storageKeys: STORAGE_KEYS,
  };
}
