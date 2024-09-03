<template>
  <div class="projects-container">
    <h2>GitHub Projects</h2>
    <div class="project" v-for="project in projects" :key="project.id">
      <div class="project-info">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description || 'No description available.' }}</p>
        <a :href="project.html_url" target="_blank">View on GitHub</a>
      </div>
      <div class="project-stats">
        <span title="Stars">
          <i class="fas fa-star"></i> {{ project.stargazers_count }}
        </span>
        <span title="Forks">
          <i class="fas fa-code-branch"></i> {{ project.forks_count }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProjects',
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    filterProjectsByHighestStars(projects) {
      const projectMap = {};

      projects.forEach(project => {
        // If the project name doesn't exist in the map or has fewer stars, replace it (for redundant forks)
        if (!projectMap[project.name] || projectMap[project.name].stargazers_count < project.stargazers_count) {
          projectMap[project.name] = project;
        }
      });

      return Object.values(projectMap);
    },
    async fetchProjects() {
      const urls = [
        'https://api.github.com/users/JCoupalK/repos',
        'https://api.github.com/users/KeepSec-Technologies/repos'
      ];
      const options = {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      };

      try {
        const responses = await Promise.all(urls.map(url => fetch(url, options)));
        responses.forEach(response => {
          if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
        });

        const data = await Promise.all(responses.map(response => response.json()));
        let combinedProjects = data.flat().map(({ id, name, description, html_url, stargazers_count, forks_count }) => ({
          id,
          name,
          description,
          html_url,
          stargazers_count,
          forks_count
        }));

        combinedProjects = this.filterProjectsByHighestStars(combinedProjects);

        // Sort projects by a combined score of stars and forks
        combinedProjects.sort((a, b) => {
          const scoreA = a.stargazers_count + a.forks_count;
          const scoreB = b.stargazers_count + b.forks_count;

          if (scoreB - scoreA === 0) { // If combined score is equal
            return a.name.localeCompare(b.name); // Sort alphabetically
          }
          return scoreB - scoreA; // Else sort by combined score
        });

        this.projects = combinedProjects;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.projects-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.project {
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.project:hover {
  background-color: #292929;
}

.project-info h3,
.project-info p,
.project-info a {
  margin: 5;
}

a .project-info a {
  color: #4DBA87;
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-info a:hover {
  color: #e0e0e0;
}

.project-stats {
  display: flex;
  align-items: center;
}

.project-stats span {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.project-stats i {
  margin-right: 5px;
}
</style>
