import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, slugify } from "../data/portfolioData";

const emptyProject = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  techStack: "",
  video: "",
  github: "",
  live: "",
  featured: false,
  published: true,
};

export default function AdminNew() {
  const navigate = useNavigate();
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProjectForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
    }
  };

  const handleGalleryChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setGallery(filesArray);
      console.log(`Selected ${filesArray.length} images for gallery`);
    }
  };

  const addProject = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('shortDescription', projectForm.shortDescription);
      formData.append('fullDescription', projectForm.fullDescription);
      
      const techArray = projectForm.techStack.split(',').map(t => t.trim()).filter(Boolean);
      techArray.forEach(tech => formData.append('techStack', tech));
      
      formData.append('video', projectForm.video);
      formData.append('github', projectForm.github);
      formData.append('live', projectForm.live);
      formData.append('featured', projectForm.featured);
      formData.append('published', projectForm.published);

      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }

      gallery.forEach((file) => {
        formData.append('gallery', file);
      });

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      setMessage(`✓ ${data.title} was added successfully!`);
      setProjectForm(emptyProject);
      setThumbnail(null);
      setGallery([]);
      fetchProjects();
      window.dispatchEvent(new Event("portfolio-data-updated"));
      
      // Clear file inputs
      document.getElementById('thumbnail-input').value = '';
      document.getElementById('gallery-input').value = '';
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (slug) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setMessage('✓ Project deleted successfully');
      fetchProjects();
      window.dispatchEvent(new Event("portfolio-data-updated"));
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 pt-32 pb-32">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest text-white/45 mb-4">ADMIN PANEL</p>
            <h1 className="font-serif text-5xl md:text-7xl">Manage Portfolio</h1>
          </div>

          <div className="flex gap-3">
            <Link
              to="/work"
              className="w-fit px-5 py-3 rounded-full border border-white/20 text-sm text-white/75 hover:bg-white hover:text-black transition"
            >
              View Work
            </Link>
            <button
              onClick={handleLogout}
              className="w-fit px-5 py-3 rounded-full border border-red-500/20 text-sm text-red-400/75 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-8 rounded-lg border border-white/10 bg-white/10 px-5 py-4 text-sm text-white/75">
            {message}
          </div>
        )}

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8 mb-8">
          <h2 className="font-serif text-3xl mb-8">Add New Project</h2>

          <form onSubmit={addProject} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Project Title *"
                name="title"
                value={projectForm.title}
                onChange={handleProjectChange}
                required
              />

              <div className="text-sm text-white/50 flex items-end pb-3">
                Slug: {projectForm.title ? slugify(projectForm.title) : '(auto-generated)'}
              </div>
            </div>

            <TextArea
              label="Short Description *"
              name="shortDescription"
              value={projectForm.shortDescription}
              onChange={handleProjectChange}
              placeholder="Brief description shown on Work page card"
              rows={3}
              required
            />

            <TextArea
              label="Full Description"
              name="fullDescription"
              value={projectForm.fullDescription}
              onChange={handleProjectChange}
              placeholder="Detailed description shown on project detail page"
              rows={5}
            />

            <Field
              label="Tech Stack (comma-separated)"
              name="techStack"
              value={projectForm.techStack}
              onChange={handleProjectChange}
              placeholder="React, Node.js, MongoDB, Tailwind CSS"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="GitHub URL"
                name="github"
                value={projectForm.github}
                onChange={handleProjectChange}
                placeholder="https://github.com/..."
              />

              <Field
                label="Live Demo URL"
                name="live"
                value={projectForm.live}
                onChange={handleProjectChange}
                placeholder="https://..."
              />
            </div>

            <Field
              label="Video URL (YouTube or Cloudinary)"
              name="video"
              value={projectForm.video}
              onChange={handleProjectChange}
              placeholder="https://..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FileField
                  label="Thumbnail Image"
                  id="thumbnail-input"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
                {thumbnail && (
                  <p className="text-xs text-white/50 mt-2">Selected: {thumbnail.name}</p>
                )}
              </div>

              <div>
                <FileField
                  label="Gallery Images (multiple) - Hold Ctrl/Cmd to select multiple"
                  id="gallery-input"
                  onChange={handleGalleryChange}
                  accept="image/*"
                  multiple
                />
                {gallery.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-400">✓ {gallery.length} file(s) selected:</p>
                    <div className="max-h-32 overflow-y-auto space-y-1 bg-black/40 rounded p-2">
                      {gallery.map((file, index) => (
                        <p key={index} className="text-xs text-white/60">
                          {index + 1}. {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {gallery.length === 0 && (
                  <p className="text-xs text-white/40 mt-2 italic">
                    💡 Tip: Hold Ctrl (Win) or Cmd (Mac) while clicking to select multiple files
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={projectForm.featured}
                  onChange={handleProjectChange}
                  className="w-5 h-5 rounded border-white/20 bg-black/40"
                />
                <span className="text-sm text-white/75">Featured Project</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={projectForm.published}
                  onChange={handleProjectChange}
                  className="w-5 h-5 rounded border-white/20 bg-black/40"
                />
                <span className="text-sm text-white/75">Published</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/80 transition disabled:opacity-50"
            >
              {loading ? 'Adding Project...' : 'Add Project'}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="font-serif text-3xl mb-8">All Projects from Database</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.length === 0 && (
              <p className="text-white/45 text-sm">No projects in database yet.</p>
            )}

            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-lg border border-white/10 bg-black/30 p-5"
              >
                {project.thumbnail && (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-4">
                  {project.description}
                </p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Link
                    to={project.link}
                    className="text-sm text-white/75 underline underline-offset-4"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="text-sm text-red-400/75 hover:text-red-400 transition"
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
        className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
      />
    </label>
  );
}

function FileField({ label, id, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-widest text-white/45 mb-2">
        {label}
      </span>
      <input
        {...props}
        id={id}
        type="file"
        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/75 outline-none focus:border-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white/10 file:text-white/75 hover:file:bg-white/20"
      />
    </label>
  );
}
