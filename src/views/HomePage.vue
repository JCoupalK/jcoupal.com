<template>
  <div class="home-container">
    <h1>Hi, I'm Jordan Coupal</h1>
    <p>I'm a MLOps Engineer, Co-Founder of KeepSec and Vullify while being an Open Source Developper with experience building
      multiple tools and solutions mainly in cloud computing, cyber security and data integration.</p>
    <h2>My Skills</h2>
    <div class="skills-container">
      <div class="skill" v-for="skill in skills" :key="skill">
        {{ skill }}
      </div>
    </div>
    <h2>My Hobbies</h2>
    <p>Pixel artist on my spare time and I adventure in game development from time to time.</p>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/jordan-coupal-222773225/" alt="LinkedIn" target="_blank" class="social-link">
        <i class="fab fa-linkedin fa-2x"></i>
      </a>
      <a href="mailto:jordan@jcoupal.com" alt="Mail" class="social-link">
        <i class="fas fa-envelope fa-2x"></i>
      </a>
      <a href="https://github.com/JCoupalK" alt="GitHub" target="_blank" class="social-link">
        <i class="fab fa-github fa-2x"></i>
      </a>
      <a href="https://www.keepsec.ca" alt="KeepSec Technologies" target="_blank" class="social-link">
        <img src="../../public/ks-icon-green.png" class="keepsec-icon">
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
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+/Edge */
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
  transition: color 0.3s ease;
}

.skill:hover {
  background: #409970;
  color: #333;
}

.social-links {
  margin-top: 30px;
}

.social-link {
  margin: 0 10px;
  color: #4DBA87;
  transition: opacity 0.3s ease;
}

.social-link:hover {
  opacity: 0.2;
}

.keepsec-icon {
  width: 31px;
  height: 32px;
  position: relative;
  top: 5px;
}

h2 {
  margin-top: 50px;
}
</style>
