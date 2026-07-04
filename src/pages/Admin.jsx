import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  defaultProjects,
  defaultSkills,
  getCustomProjects,
  getCustomSkills,
  projectColors,
  slugify,
} from "../data/portfolioData";
import usePortfolioData from "../hooks/usePortfolioData";

const emptyProject = {
  title: "",
  description: "",
  backend: "",
  video: "",
  images: "",
};

export default function Admin() {
  const { updateCustomProjects, updateCustomSkills } = usePortfolioData();
  const [customProjects, setCustomProjects] = useState(() => getCustomProjects());
  const [customSkills, setCustomSkills] = useState(() => getCustomSkills());
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const allProjectIds = useMemo(
    () => new Set([...defaultProjects, ...customProjects].map((project) => project.id)),
    [customProjects]
  );

  const allSkills = useMemo(
    () => new Set([...defaultSkills, ...customSkills].map((item) => item.toLowerCase())),
    [customSkills]
  );

  const syncProjects = (projects) => {
    setCustomProjects(projects);
    updateCustomProjects(projects);
  };

  const syncSkills = (skills) => {
    setCustomSkills(skills);
    updateCustomSkills(skills);
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((current) => ({ ...current, [name]: value }));
  };

  const addProject = (event) => {
    event.preventDefault();

    const title = projectForm.title.trim();
    const description = projectForm.description.trim();
    if (!title || !description) {
      setMessage("Project title and description are required.");
      return;
    }

    const baseSlug = slugify(title);
    if (!baseSlug) {
      setMessage("Use at least one letter or number in the project title.");
      return;
    }

    let slug = baseSlug;
    let suffix = 2;
    while (allProjectIds.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const imageList = projectForm.images
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);

    const nextProject = {
      id: slug,
      title,
      description,
      backend: projectForm.backend.trim(),
      video: projectForm.video.trim(),
      images: imageList,
      color: projectColors[customProjects.length % projectColors.length],
      link: `/work/${slug}`,
      custom: true,
    };

    syncProjects([...customProjects, nextProject]);
    setProjectForm(emptyProject);
    setMessage(`${title} was added.`);
  };

  const removeProject = (projectId) => {
    const nextProjects = customProjects.filter((project) => project.id !== projectId);
    syncProjects(nextProjects);
    setMessage("Project removed.");
  };

  const addSkill = (event) => {
    event.preventDefault();
    const nextSkill = skill.trim();

    if (!nextSkill) return;
    if (allSkills.has(nextSkill.toLowerCase())) {
      setMessage(`${nextSkill} is already listed.`);
      return;
    }

    syncSkills([...customSkills, nextSkill]);
    setSkill("");
    setMessage(`${nextSkill} was added.`);
  };

  const removeSkill = (skillToRemove) => {
    syncSkills(customSkills.filter((item) => item !== skillToRemove));
    setMessage("Skill removed.");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 pt-32 pb-32">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest text-white/45 mb-4">ADMIN</p>
            <h1 className="font-serif text-5xl md:text-7xl">Portfolio Panel</h1>
          </div>

          <Link
            to="/work"
            className="w-fit px-5 py-3 rounded-full border border-white/20 text-sm text-white/75 hover:bg-white hover:text-black transition"
          >
            View Work
          </Link>
        </div>

        {message && (
          <div className="mb-8 rounded-lg border border-white/10 bg-white/10 px-5 py-4 text-sm text-white/75">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="font-serif text-3xl mb-8">Add Project</h2>

            <form onSubmit={addProject} className="space-y-5">
              <Field
                label="Title"
                name="title"
                value={projectForm.title}
                onChange={handleProjectChange}
                required
              />

              <TextArea
                label="Description"
                name="description"
                value={projectForm.description}
                onChange={handleProjectChange}
                required
              />

              <TextArea
                label="Tech / Backend"
                name="backend"
                value={projectForm.backend}
                onChange={handleProjectChange}
              />

              <Field
                label="Video URL"
                name="video"
                value={projectForm.video}
                onChange={handleProjectChange}
                placeholder="https://..."
              />

              <TextArea
                label="Image URLs"
                name="images"
                value={projectForm.images}
                onChange={handleProjectChange}
                placeholder="/images/project/1.jpg, https://..."
              />

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/80 transition"
              >
                Add Project
              </button>
            </form>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="font-serif text-3xl mb-8">Add Skill</h2>

            <form onSubmit={addSkill} className="flex gap-3 mb-8">
              <input
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
                placeholder="GraphQL"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/80 transition"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              {customSkills.length === 0 && (
                <p className="text-white/45 text-sm">No custom skills yet.</p>
              )}

              {customSkills.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => removeSkill(item)}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 hover:border-white/40 transition"
                >
                  {item} x
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="font-serif text-3xl mb-8">Custom Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {customProjects.length === 0 && (
              <p className="text-white/45 text-sm">No custom projects yet.</p>
            )}

            {customProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-lg border border-white/10 bg-black/30 p-5"
              >
                <h3 className="font-serif text-2xl mb-3">{project.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    to={project.link}
                    className="text-sm text-white/75 underline underline-offset-4"
                  >
                    Open
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="text-sm text-white/45 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-widest text-white/45 mb-2">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
      />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-widest text-white/45 mb-2">
        {label}
      </span>
      <textarea
        {...props}
        rows={4}
        className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
      />
    </label>
  );
}
