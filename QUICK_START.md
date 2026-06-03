# 🚀 Quick Start Guide

## 1️⃣ **First Time Setup**

```bash
# Clone/Navigate to project
cd "c:\Users\M  K  T\Desktop\email-server-front-end-main"

# Install dependencies
npm install

# Seed test data
npm run seed

# Start dev server
npm run dev
```

Server will run on `http://localhost:3000` (or next available port)

---

## 2️⃣ **Login Credentials**

```
Email:    admin@example.com
Password: admin123
```

---

## 3️⃣ **What's Working**

✅ Home page with auth detection  
✅ Login page with JWT authentication  
✅ Dashboard (protected - requires login)  
✅ Logout functionality  
✅ Session persistence with cookies  
✅ Automatic redirect based on auth state  
✅ Professional UI with Tailwind CSS  
✅ TypeScript type safety  
✅ Production build succeeds  

---

## 4️⃣ **Routes**

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Home page |
| `/login` | Public | Login form |
| `/dashboard` | Protected | User dashboard |
| `/api/login` | POST | Authenticate |
| `/api/logout` | POST | Logout |
| `/api/profile` | GET | Get user profile |
| `/api/verify` | GET | Verify token |

---

## 5️⃣ **Development Commands**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database
npm run seed

# Check TypeScript
npm run lint
```

---

## 6️⃣ **Architecture Overview**

```
Authentication Flow:
┌─────────────┐
│  User Logs  │
│ In via /    │
│ login page  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ /api/login creates  │
│ JWT token & sets    │
│ HTTP-only cookie    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────┐
│ Middleware verifies     │
│ token on each request   │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────┐
│ useAuth hook manages     │
│ React state with Context │
└──────┬───────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Dashboard displays user │
│ info & stats            │
└─────────────────────────┘
```

---

## 7️⃣ **Troubleshooting**

### Port already in use?
- Dev server auto-selects next port
- Or kill process on port 3000

### Build fails?
```bash
npm run build
```
Check console for TypeScript errors

### Seeding fails?
```bash
npm run seed
```
Re-seed the database

### Can't login?
- Use: `admin@example.com` / `admin123`
- Check `.env.local` exists
- Verify database has user data

---

## 8️⃣ **Key Features to Test**

1. **Login Flow**
   - [ ] Go to `/login`
   - [ ] Enter admin@example.com / admin123
   - [ ] Should redirect to `/dashboard`

2. **Protected Routes**
   - [ ] Try accessing `/dashboard` without login
   - [ ] Should redirect to `/login`

3. **Session Persistence**
   - [ ] Login and refresh page
   - [ ] Should stay logged in

4. **Logout**
   - [ ] Click logout on dashboard
   - [ ] Should clear auth and redirect to `/login`

5. **Home Page**
   - [ ] View `/` without login
   - [ ] Should show login link
   - [ ] Login and refresh
   - [ ] Should show dashboard link

---

## 9️⃣ **Production Checklist**

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Switch database to PostgreSQL
- [ ] Enable HTTPS
- [ ] Set up rate limiting on API
- [ ] Configure CORS
- [ ] Add logging service
- [ ] Set up error tracking (Sentry)
- [ ] Configure backups
- [ ] Add monitoring
- [ ] Document deployment steps

---

## 🔟 **File Changes Summary**

**Created:**
- `src/types/auth.ts` - Type definitions
- `src/utils/jwt.ts` - JWT utilities
- `src/services/authService.ts` - API service
- `src/hooks/useAuth.tsx` - Auth context
- `src/components/Header.tsx` - Navigation
- `src/middleware.ts` - Route protection
- `src/app/dashboard/page.tsx` - Dashboard page
- `src/app/api/logout/route.ts` - Logout endpoint
- `src/app/api/profile/route.ts` - Profile endpoint
- `src/app/api/verify/route.ts` - Verify endpoint
- `.env.local` - Environment config
- `AUTHENTICATION.md` - Full documentation

**Updated:**
- `src/app/api/login/route.ts` - Added JWT token generation
- `src/app/login/page.tsx` - Integrated useAuth hook
- `src/app/page.tsx` - Updated home page
- `src/app/layout.tsx` - Added AuthProvider
- `package.json` - Added jsonwebtoken dependency

---

## 📞 **Need Help?**

1. Check `AUTHENTICATION.md` for detailed documentation
2. Review source files for implementation details
3. Check console logs for error messages
4. Verify `.env.local` is correctly set

---

**🎉 You're all set! Happy coding!**
