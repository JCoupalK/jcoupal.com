<template>
  <div v-html="renderedContent"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  props: ['id'],
  data() {
    return {
      content: '',
    };
  },
  computed: {
    renderedContent() {
      const md = new MarkdownIt({ html: true });
      return md.render(this.content);
    }
  },
  mounted() {
    this.fetchContent();
  },
  methods: {
    async fetchContent() {
      const markdownPath = `/blog/${this.id}.md`; // Construct the path based on the post ID
      try {
        const response = await fetch(markdownPath);
        if (!response.ok) throw new Error(`Failed to fetch post: ${response.statusText}`);
        const text = await response.text();
        this.content = text;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
