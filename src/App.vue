<template>
  <div id="app">
    <!-- Navigation and content -->
    <header>
      <nav class="navbar">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about-me" class="nav-link">About Me</router-link>
        <router-link to="/projects" class="nav-link">Projects</router-link>
        <router-link to="/experience" class="nav-link">Experience</router-link>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer class="footer">
      © 2024 Jordan Coupal. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1c1c1c; /* Light background */
  color: #ededed; /* Darker text for contrast */
  position: relative;
  overflow: hidden;
}

header {
  padding: 20px 0;
  position: fixed; /* Make header sticky */
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.nav-link {
  color: #4DBA87; /* Use the button color for links for consistency */
  margin: 0 15px;
  text-decoration: none;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgb(54, 54, 54); /* Light background on hover */
}

main {
  flex: 1;
  padding: 20px;
  margin-top: 60px; /* Ensure content doesn't hide under the fixed header */
  position: relative;
  z-index: 1;
}

.footer {
  color: #6e6e6e;
  text-align: center;
  padding: 20px 0;
  margin-top: 20px;
}
</style>
