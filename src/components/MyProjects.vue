<template>
  <div class="projects-container">
    <h2>Projects</h2>
    <div class="project" v-for="project in projects" :key="project.id">
      <p>...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProjects',
  data() {
    return {
      projects: [/* Your projects data */]
    };
  },
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
}
</style>
