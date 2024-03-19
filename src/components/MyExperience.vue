<template>
  <div class="experience-container">
    <h2>Experience</h2>
    <ul class="experience-list">
      <li v-for="experience in experiences" :key="experience.id">
        <h3>{{ experience.role }} at {{ experience.company }}</h3>
        <p>{{ experience.period }}</p>
        <p>{{ experience.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyExperience',
  data() {
    return {
      experiences: [
        {
          id: 1,
          role: 'Software Engineer',
          company: 'Company A',
          period: 'Jan 2020 - Present',
          description: 'Developing and maintaining web applications...'
        },
        // Add more experiences as needed
      ]
    };
  },
};
</script>

<style scoped>
.experience-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.experience-list {
  list-style-type: none;
  padding: 0;
}

.experience-list li {
  background-color: #222;
  color: #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}
</style>
