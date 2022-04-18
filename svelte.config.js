import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import { mdsvex } from 'mdsvex';
import path from 'path'; 
import { fileURLToPath } from "url";

const dirname = path.resolve(fileURLToPath(import.meta.url), '../')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },

  extensions: ['.svelte', '.svx', '.md', '.MD'],

  preprocess: [
    preprocess({
      postcss: true,
    }),

    mdsvex({
      extensions: ['.svx', '.md', '.MD'],
      layout: {
        blog: path.join(dirname, 'src/routes/blog/blogLayout.svelte')
      }
    })
  ],
};

export default config;
