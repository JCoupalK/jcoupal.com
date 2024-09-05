<template>
  <div class="home-container">
    <h1>Hi, I'm Jordan Coupal</h1>
    <p>I'm a MLOps Engineer and Open Source Developper with experience programming all sort of tools and maintainer of
      some projects on GitHub.</p>
    <h2>My Skillsets</h2>
    <div class="skills-container">
      <div class="skill" v-for="skill in skills" :key="skill">
        {{ skill }}
      </div>
    </div>
    <h2>My Hobbies</h2>
    <p>Pixel artist on my spare time and I adventure in game development from time to time.</p>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/jordan-coupal-222773225/" target="_blank" class="social-link">
        <i class="fab fa-linkedin fa-2x"></i>
      </a>
      <a href="mailto:jordan@jcoupal.com" class="social-link">
        <i class="fas fa-envelope fa-2x"></i>
      </a>
      <a href="https://github.com/JCoupalK" target="_blank" class="social-link">
        <i class="fab fa-github fa-2x"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      skills: ['Linux', 'Bash', 'Go', 'Python', 'SQL', 'Git', 'Docker', 'Kubernetes', 'OpenStack', 'Networking', 'API Design', 'CI/CD'],
    };
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 50px 20px;
}

.skills-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 10px 0;
  max-width: 750px;
  margin: auto;
}

.skill {
  flex: 0 0 auto;
  margin: 5px;
  background: #4DBA87;
  color: #fff;
  padding: 10px;
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.social-links {
  margin-top: 30px;
}

.social-link {
  margin: 0 10px;
  color: #4DBA87;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #333;
}

h2 {
  margin-top: 50px;
}
</style>
