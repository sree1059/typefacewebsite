import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function apiDevPlugin() {
  return {
    name: 'api-dev-server-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url?.split('?')[0];
        if (url === '/api/create-order' || url === '/api/razorpay/create-order') {
          try {
            const { default: handler } = await import('./api/create-order.ts');
            const enhancedRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code;
                return enhancedRes;
              },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              send(data: any) {
                res.end(data);
              },
            });
            return handler(req, enhancedRes);
          } catch (err) {
            console.error('Error handling /api/create-order in dev:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Internal dev server error', details: String(err) }));
          }
        }

        if (url === '/api/verify-payment' || url === '/api/razorpay/verify-payment') {
          try {
            const { default: handler } = await import('./api/verify-payment.ts');
            const enhancedRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code;
                return enhancedRes;
              },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              send(data: any) {
                res.end(data);
              },
            });
            return handler(req, enhancedRes);
          } catch (err) {
            console.error('Error handling /api/verify-payment in dev:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Internal dev server error', details: String(err) }));
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
