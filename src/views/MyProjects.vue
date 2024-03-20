<template>
  <div class="projects-container">
    <h2>Projects</h2>
    <div class="project" v-for="project in projects" :key="project.id">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description || 'No description available.' }}</p>
      <a :href="project.html_url" target="_blank">View on GitHub</a>
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
    async fetchProjects() {
      const url = 'https://api.github.com/users/JCoupalK/repos';
      const options = {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      };
      
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        this.projects = data.map(({ id, name, description, html_url }) => ({
          id,
          name,
          description,
          html_url
        }));
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
  transition: background-color 0.3s ease;
}

.project:hover {
  background-color: #292929; 
}

.project h3 {
  margin-top: 0;
}

.project a {
  color: #4DBA87; 
  text-decoration: none;
  transition: color 0.3s ease;
}

.project a:hover {
  color: #e0e0e0;
}
</style>
