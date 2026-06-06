import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        seo_local: resolve(__dirname, 'services/seo-local.html'),
        quang_cao_maps: resolve(__dirname, 'services/quang-cao-maps.html'),
        thiet_lap_profile: resolve(__dirname, 'services/thiet-lap-profile.html'),
        case_studies: resolve(__dirname, 'case-studies.html'),
        blog: resolve(__dirname, 'blog.html'),
        blog_seo_guide: resolve(__dirname, 'blog/cach-seo-google-maps-len-top.html'),
        blog_setup_guide: resolve(__dirname, 'blog/huong-dan-thiet-lap-profile-chuan.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
