# Deploying TanStack Start to Vercel

Complete guide for deploying a TanStack Start application to Vercel.

## Prerequisites

- TanStack Start v1.132+ project
- Vercel account
- Git repository

## Step 1: Install Required Dependencies

TanStack Start requires Nitro for Vercel deployment:

```bash
npm install --save-dev @tanstack/nitro-v2-vite-plugin nitropack
```

### Also install TanStack History as a direct dependency:

```bash
npm install @tanstack/history
```

**Why?** While `@tanstack/history` is a transitive dependency, Vercel's serverless functions sometimes can't resolve it properly. Adding it as an explicit dependency fixes module resolution issues.

## Step 2: Configure Vite

Update your `vite.config.ts` to include the Nitro plugin:

```typescript
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    nitroV2Plugin({ preset: 'vercel' }),  // ← Add this
    viteReact(),
  ],
})
```

**Key points:**
- Import `nitroV2Plugin` from `@tanstack/nitro-v2-vite-plugin`
- Add `nitroV2Plugin({ preset: 'vercel' })` to plugins array
- Place it AFTER `tanstackStart()` but BEFORE `viteReact()`

## Step 3: Create nitro.config.ts

Create a `nitro.config.ts` file in your project root:

```typescript
import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'vercel',
})
```

This tells Nitro to build for Vercel's serverless environment.

## Step 4: Update package.json

Add Node.js engine requirement:

```json
{
  "name": "your-project",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build",
    "start": "node dist/server/server.js"
  }
}
```

**Note:** Your project might work with Node 20.19+, but TanStack Start v1.132+ officially requires Node 22.12+.

## Step 5: Configure .gitignore

Ensure these directories are ignored:

```
node_modules
.DS_Store
dist
dist-ssr
*.local
.env
.nitro
.tanstack
.output
.vercel       # ← Important: Never commit .vercel directory
.vinxi
```

## Step 6: Build Locally (Test)

Test your build before deploying:

```bash
npm run build
```

This should create a `.vercel/output` directory with:
- `config.json` - Vercel Build Output API v3 configuration
- `functions/__fallback.func/` - Your serverless function
- `static/` - Client-side assets

If successful, you'll see:
```
[nitro] ✔ You can deploy this build using npx vercel deploy --prebuilt
```

## Step 7: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Build locally
npm run build

# Deploy the prebuilt output
npx vercel deploy --prebuilt

# For production deployment
npx vercel deploy --prebuilt --prod
```

**Advantages:**
- Uses your local build (faster, more reliable)
- Bypasses Vercel's build cache issues
- Better for debugging

### Option B: Using Vercel Dashboard + Git

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: configure Vercel deployment"
   git push
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your Git repository

3. **Configure Build Settings:**
   - **Framework Preset:** `Other` (NOT "Vite" or "React")
   - **Build Command:** `npm run build`
   - **Output Directory:** Leave **EMPTY**
   - **Install Command:** `npm install`
   - **Node.js Version:** `22.x`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

## Vercel Dashboard Settings

### Build & Development Settings

```
Framework Preset:        Other
Build Command:           npm run build
Output Directory:        (leave empty)
Install Command:         npm install
Development Command:     vite
Node.js Version:         22.x
```

### Why These Settings?

- **Framework Preset: Other** - TanStack Start + Nitro creates a custom build output (`.vercel/output/`) that doesn't fit standard presets
- **Output Directory: Empty** - Vercel auto-detects `.vercel/output/` when empty
- **Other preset** tells Vercel: "Run the build command and look for Build Output API v3 format"

## Build Output Structure

After `npm run build`, Nitro generates:

```
.vercel/
└── output/
    ├── config.json                          # Vercel configuration
    ├── functions/
    │   └── __fallback.func/                 # Serverless function
    │       ├── index.mjs                    # Function entry point
    │       ├── chunks/                      # Bundled code
    │       ├── node_modules/                # Dependencies
    │       └── package.json                 # Function dependencies
    └── static/                              # Client-side assets
        └── assets/                          # JS, CSS, images
```

## Common Issues & Solutions

### Issue 1: "Cannot find package '@tanstack/history'"

**Solution:** Install `@tanstack/history` as a direct dependency:
```bash
npm install @tanstack/history
```

### Issue 2: Build completes in 90ms (too fast)

**Cause:** Vercel is skipping the build step.

**Solution:**
- Ensure `.vercel` is in `.gitignore` (never commit it)
- Set Framework Preset to "Other" (not "Vite")
- Clear Vercel deployment cache
- Use `npx vercel deploy --prebuilt` to deploy local build

### Issue 3: 404 errors on deployment

**Causes:**
- Build didn't actually run on Vercel
- Wrong framework preset
- Cached old deployments

**Solutions:**
1. Delete old deployments from Vercel dashboard
2. Use Vercel CLI: `npx vercel deploy --prebuilt`
3. Check build logs - should take 30-60 seconds, not 90ms

### Issue 4: Node version mismatch

**Error:** `EBADENGINE Unsupported engine`

**Solution:**
- Update Node locally to v22.12.0+ or v20.19.0+
- Ensure `package.json` has correct engines field:
  ```json
  "engines": {
    "node": ">=22.12.0"
  }
  ```

## Environment Variables

Set environment variables in Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add your variables (e.g., API keys, database URLs)
3. Select environment: Production, Preview, Development

**Important:** Never commit `.env` files to git!

## Continuous Deployment

Once set up, every push to your main branch automatically deploys to Vercel.

To deploy:
```bash
git add .
git commit -m "your changes"
git push
```

Vercel will:
1. Detect the push
2. Run `npm install`
3. Run `npm run build`
4. Deploy `.vercel/output/` to serverless infrastructure

## Quick Deployment Checklist

- [ ] Install `@tanstack/nitro-v2-vite-plugin` and `nitropack`
- [ ] Install `@tanstack/history` as direct dependency
- [ ] Add `nitroV2Plugin({ preset: 'vercel' })` to `vite.config.ts`
- [ ] Create `nitro.config.ts` with `preset: 'vercel'`
- [ ] Add `engines` field to `package.json`
- [ ] Add `.vercel` to `.gitignore`
- [ ] Test build locally: `npm run build`
- [ ] Deploy: `npx vercel deploy --prebuilt --prod`

## Useful Commands

```bash
# Install dependencies
npm install --save-dev @tanstack/nitro-v2-vite-plugin nitropack
npm install @tanstack/history

# Build locally
npm run build

# Preview build locally
npx vercel dev

# Deploy (development)
npx vercel deploy --prebuilt

# Deploy (production)
npx vercel deploy --prebuilt --prod

# View deployment logs
vercel logs [deployment-url]
```

## Additional Resources

- [TanStack Start Docs](https://tanstack.com/start/latest/docs/framework/react/overview)
- [TanStack Start Hosting Guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Nitro Documentation](https://nitro.build/)
- [Vercel Build Output API](https://vercel.com/docs/build-output-api/v3)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

## Summary

The key to deploying TanStack Start to Vercel is:

1. **Install Nitro packages** - Required for Vercel serverless format
2. **Configure Nitro plugin** - Generates `.vercel/output/` Build Output API v3
3. **Use "Other" preset** - Tells Vercel to detect custom build format
4. **Deploy with CLI** - Most reliable method, bypasses cache issues

The combination of TanStack Start + Nitro + Vercel gives you:
- ✅ Serverless functions for API routes
- ✅ Edge middleware support
- ✅ Server-side rendering (SSR)
- ✅ Streaming
- ✅ Automatic deployments from Git
- ✅ Preview deployments for pull requests

---

**Last Updated:** October 2025
**TanStack Start Version:** 1.132+
**Nitro Version:** 2.12+
