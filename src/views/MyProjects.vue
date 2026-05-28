<template>
  <div class="page-container">
    <div class="page-header">
      <h2>Projects</h2>
      <p class="page-sub">Open source work from <a href="https://github.com/JCoupalK" target="_blank">JCoupalK</a>, <a href="https://github.com/KeepSec-Technologies" target="_blank">KeepSec</a> and <a href="https://github.com/Vullify" target="_blank">Vullify</a></p>
    </div>

    <div v-if="loading" class="loading">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>

    <div v-else class="projects-list">
      <a
        class="project"
        v-for="(project, i) in projects"
        :key="project.id"
        :href="project.html_url"
        target="_blank"
        :style="{ animationDelay: (i * 0.05) + 's' }"
      >
        <div class="project-info">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description || 'No description available.' }}</p>
        </div>
        <div class="project-stats">
          <span title="Stars"><i class="fas fa-star"></i> {{ project.stargazers_count }}</span>
          <span title="Forks"><i class="fas fa-code-branch"></i> {{ project.forks_count }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProjects',
  data() {
    return {
      projects: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    filterProjectsByHighestStars(projects) {
      const projectMap = {};
      projects.forEach(project => {
        if (!projectMap[project.name] || projectMap[project.name].stargazers_count < project.stargazers_count) {
          projectMap[project.name] = project;
        }
      });
      return Object.values(projectMap);
    },
    async fetchProjects() {
      const urls = [
        'https://api.github.com/users/JCoupalK/repos',
        'https://api.github.com/users/KeepSec-Technologies/repos',
        'https://api.github.com/users/Vullify/repos'
      ];
      const options = { headers: { 'Accept': 'application/vnd.github.v3+json' } };
      try {
        const responses = await Promise.all(urls.map(url => fetch(url, options)));
        responses.forEach(r => { if (!r.ok) throw new Error(`Failed: ${r.statusText}`); });
        const data = await Promise.all(responses.map(r => r.json()));
        let combined = data.flat().map(({ id, name, description, html_url, stargazers_count, forks_count }) => ({
          id, name, description, html_url, stargazers_count, forks_count
        }));
        combined = this.filterProjectsByHighestStars(combined);
        combined.sort((a, b) => {
          const diff = (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count);
          return diff === 0 ? a.name.localeCompare(b.name) : diff;
        });
        this.projects = combined;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40%           { opacity: 1; }
}

.page-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
  animation: fadeUp 0.6s ease both;
}

.page-header h2 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4DBA87;
  margin: 0 0 10px;
}

.page-sub {
  color: #aaa;
  font-size: 0.9rem;
  margin: 0;
}

.page-sub a {
  color: #4DBA87;
  text-decoration: none;
}

.page-sub a:hover {
  text-decoration: underline;
}

/* Loading */
.loading {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 60px 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4DBA87;
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

/* Projects */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1e1e;
  border-left: 3px solid transparent;
  border-radius: 8px;
  padding: 20px 24px;
  text-decoration: none;
  color: #ededed;
  opacity: 0;
  animation: fadeUp 0.4s ease both;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.project:hover {
  background: #242424;
  border-left-color: #4DBA87;
  transform: translateX(4px);
}

.project-info h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #ededed;
}

.project-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #888;
  max-width: 520px;
}

.project-stats {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  margin-left: 24px;
}

.project-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: #666;
}

.project-stats i {
  color: #4DBA87;
}
</style>
