import {defineConfig} from 'vite';
import vinext from 'vinext';
import {fileURLToPath} from 'node:url';

export default defineConfig(async () => {
  process.env.CLOUDFLARE_CF_FETCH_ENABLED ??= 'false';
  process.env.WRANGLER_SEND_METRICS ??= 'false';
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  const {cloudflare} = await import('@cloudflare/vite-plugin');
  return {
    plugins: [
      vinext(),
      cloudflare({
        configPath: fileURLToPath(new URL('./wrangler.jsonc', import.meta.url)),
        viteEnvironment: {name: 'rsc', childEnvironments: ['ssr']},
        inspectorPort: false,
      }),
    ],
  };
});
