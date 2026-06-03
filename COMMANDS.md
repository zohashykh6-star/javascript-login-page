# 📞 Command Reference & Troubleshooting

## Quick Commands

```bash
# Navigate to project
cd "c:\Users\M  K  T\Desktop\email-server-front-end-main"

# Install dependencies
npm install

# Seed test data
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check linting
npm run lint
```

---

## Common Issues & Solutions

### Issue: Port 3000 already in use
**Error:** `Port 3000 is already in use`
**Solution:**
- Dev server will auto-select next available port (3001, 3002, etc.)
- Or kill process on port 3000: `netstat -ano | findstr :3000`
- Then: `taskkill /PID <PID> /F`

### Issue: JWT_SECRET not found
**Error:** Build or runtime error about JWT_SECRET
**Solution:**
- Create `.env.local` file in project root
- Add: `JWT_SECRET=your-secret-key`
- Restart dev server

### Issue: Database seeding fails
**Error:** Prisma seed fails or user not created
**Solution:**
```bash
npm run seed
# Or re-seed:
npx prisma db seed
```

### Issue: Can't login with admin@example.com
**Error:** "Invalid email or password"
**Solutions:**
1. Verify user exists: `npm run seed` (creates test user)
2. Check password: `admin123` (exactly)
3. Email must be: `admin@example.com` (exactly)
4. Clear browser cookies and try again

### Issue: TypeScript errors after changes
**Error:** Build fails with type errors
**Solution:**
```bash
npm run build
# See full error output
npx tsc --noEmit
```

### Issue: Middleware not protecting routes
**Error:** Can access /dashboard without login
**Solution:**
- Check `src/middleware.ts` file exists
- Verify middleware.ts path correct
- Restart dev server
- Clear browser cache/cookies

### Issue: Token not persisting across refresh
**Error:** Gets logged out after page refresh
**Solution:**
1. Check browser cookies enabled
2. Verify HTTP-only cookie set in login response
3. Check `secure: false` in .env (dev mode)
4. In production: `secure: true` requires HTTPS

### Issue: Build succeeds but app won't run
**Error:** `npm start` fails
**Solution:**
```bash
rm -r .next
npm run build
npm start
```

### Issue: Logout button doesn't work
**Error:** Click logout, nothing happens
**Solution:**
1. Check browser console for errors
2. Verify logout endpoint exists
3. Check network tab for failed requests
4. Clear cookies manually

---

## Development Server Tips

### View detailed errors
```bash
npm run dev 2>&1 | more
```

### Kill stuck process
```bash
# Find Node process
tasklist | findstr node

# Kill by PID
taskkill /PID <PID> /F
```

### Clear Next.js cache
```bash
rm -r .next
npm run dev
```

### Check specific port
```bash
netstat -ano | findstr :3000
```

---

## Build & Deployment

### Local Build Test
```bash
# Build production version
npm run build

# Test production server locally
npm start
```

### Environment for Production
Create `.env.local`:
```env
JWT_SECRET=your-production-secret-key-here-min-32-chars
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Pre-deployment Checklist
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Test user created: `npm run seed`
- [ ] Login works
- [ ] Dashboard protected
- [ ] Logout works
- [ ] JWT_SECRET changed
- [ ] HTTPS enabled
- [ ] Database backed up

---

## Testing Workflows

### Complete Login Test
```
1. npm run dev
2. Navigate to http://localhost:3000/login
3. Enter: admin@example.com / admin123
4. Click Login
5. Should redirect to /dashboard
6. Should see "Welcome back, Admin User!"
```

### Protected Route Test
```
1. In new tab: http://localhost:3000/dashboard (without login)
2. Should redirect to /login
3. Login first
4. Now /dashboard accessible
5. Click logout
6. Try /dashboard again
7. Should redirect to /login
```

### Session Persistence Test
```
1. npm run dev
2. Login at /login
3. Refresh page (F5)
4. Should still be logged in
5. Should see dashboard with user info
```

---

## Database Management

### Seed database
```bash
npm run seed
```

### Reset database
```bash
# Delete dev.db and reseed
rm prisma/dev.db
npm run seed
```

### Prisma Studio (UI for database)
```bash
npx prisma studio
```
Opens at: `http://localhost:5555`

### Prisma migrations
```bash
# Create migration
npx prisma migrate dev --name add_feature

# Reset database
npx prisma migrate reset
```

---

## Code Changes Workflow

### After modifying code:
1. Save file (auto-reload in dev server)
2. Check browser for changes
3. If errors, check console
4. Fix and save again

### Before committing:
```bash
npm run build
npm run lint
npm run seed
npm run dev
```

### Verify everything works:
- [ ] Build succeeds
- [ ] No lint errors
- [ ] Database seeded
- [ ] Dev server starts
- [ ] Can login
- [ ] Dashboard works
- [ ] Can logout

---

## Performance Tips

### Speed up build
- Use `npm ci` instead of `npm install` on CI/CD
- Cache node_modules in Docker

### Faster development
- Use `npm run dev` (includes hot reload)
- Monitor terminal for errors
- Use browser DevTools

### Optimize production build
- Check `.next` folder size
- Enable gzip compression
- Use CDN for static files

---

## Security Checklist

### Development
- [x] Use .env.local (not committed)
- [x] Use localhost URLs
- [x] HTTP is fine for dev

### Before Production
- [ ] Change JWT_SECRET
- [ ] Enable HTTPS
- [ ] Update API_URL to https://
- [ ] Set cookie secure: true
- [ ] Enable CORS if needed
- [ ] Add rate limiting
- [ ] Set up logging
- [ ] Database encryption
- [ ] Backup strategy

---

## Debugging Tips

### Check auth state
```javascript
// In browser console:
// Navigate to any page, then:
console.log('Auth:', localStorage) // Limited info
// Or check Network tab -> Cookies for authToken
```

### View API responses
Browser DevTools → Network tab:
- Login request → Response shows token
- Profile request → Shows user data
- Verify request → Shows token validity

### Check middleware
- Middleware logs to terminal when route accessed
- Look for "Middleware" in Next.js dev server output

### Database check
```bash
npx prisma studio
# Or check SQLite directly
sqlite3 prisma/dev.db "SELECT * FROM User;"
```

---

## Production Deployment (Quick Guide)

### Using Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# JWT_SECRET=your-production-key
# NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Using Docker
```bash
docker build -t email-server .
docker run -p 3000:3000 email-server
```

### Using Traditional Server
```bash
# On server:
npm install
npm run build
npm start

# Use PM2 for process management:
npm i -g pm2
pm2 start "npm start"
```

---

## Log Locations

- **Dev Server Logs:** Terminal output (npm run dev)
- **Build Logs:** Terminal output (npm run build)
- **Runtime Logs:** Console (browser DevTools or server console)
- **Database:** `prisma/dev.db` (SQLite file)
- **Environment:** `.env.local` (not committed)

---

## Essential Links

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **TypeScript Handbook:** https://www.typescriptlang.org/docs
- **JWT.io:** https://jwt.io
- **bcrypt:** https://www.npmjs.com/package/bcrypt
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Quick Reference Card

```
┌────────────────────────────────────────┐
│     ESSENTIAL COMMANDS                  │
├────────────────────────────────────────┤
│ npm install          → Install deps    │
│ npm run seed         → Create test user│
│ npm run dev          → Start dev       │
│ npm run build        → Build prod      │
│ npm start            → Run prod build  │
│ npm run lint         → Check linting  │
│ npx prisma studio   → View database   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│     TEST CREDENTIALS                    │
├────────────────────────────────────────┤
│ Email: admin@example.com               │
│ Password: admin123                     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│     IMPORTANT FILES                     │
├────────────────────────────────────────┤
│ .env.local              Configuration  │
│ src/middleware.ts       Route protect  │
│ src/hooks/useAuth.tsx   Auth provider  │
│ src/app/api/login       Login endpoint │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│     KEY PORTS                           │
├────────────────────────────────────────┤
│ 3000/3001           Dev server         │
│ 5555                Prisma Studio      │
└────────────────────────────────────────┘
```

---

**Need more help? Check QUICK_START.md or AUTHENTICATION.md!**
