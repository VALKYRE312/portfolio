import { useEffect, useState } from "react";
import {
  defaultProjects,
  getSkills,
  saveCustomSkills,
  STORAGE_KEYS,
} from "../data/portfolioData";

export default function usePortfolioData() {
  const [projects] = useState(defaultProjects);
  const [skills, setSkills] = useState(() => getSkills());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refresh = () => {
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
