# 🗺️ Email Server - Complete Architecture Guide

## System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                            │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   React Components                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │ Home Page    │  │ Login Page   │  │ Dashboard    │   │  │
│  │  │   (/)        │  │  (/login)    │  │(/dashboard)  │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  │         ▲                 ▲                  ▲            │  │
│  │         │                 │                  │            │  │
│  │         └─────────────────┼──────────────────┘            │  │
│  │                   useAuth() Hook                          │  │
│  │                   AuthProvider                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Services & Utilities                         │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  authService.ts (API calls)                        │  │  │
│  │  │  - login()                                         │  │  │
│  │  │  - logout()                                        │  │  │
│  │  │  - getProfile()                                    │  │  │
│  │  │  - verifySession()                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware Layer                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  middleware.ts                                     │  │  │
│  │  │  - Route protection                               │  │  │
│  │  │  - Token verification                             │  │  │
│  │  │  - Auto-redirect logic                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                        │
└─────────────────────────┼────────────────────────────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │   HTTP/HTTPS Communication       │
        │   (Cookies & JSON)               │
        └─────────────────┬─────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    API ROUTES (Backend)                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  POST /api/login                                         │   │
│  │  - Validate credentials                                 │   │
│  │  - Hash comparison                                      │   │
│  │  - Generate JWT token                                   │   │
│  │  - Set HTTP-only cookie                                 │   │
│  │  - Return user data                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  POST /api/logout                                        │   │
│  │  - Clear HTTP-only cookie                               │   │
│  │  - Return success message                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  GET /api/profile                                        │   │
│  │  - Verify token from cookie                             │   │
│  │  - Fetch user from database                             │   │
│  │  - Return user data (no password)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  GET /api/verify                                         │   │
│  │  - Check token validity                                 │   │
│  │  - Return true/false                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────┬────────────────────────────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │   JWT & Security Layer            │
        │   - Token generation              │
        │   - Token verification            │
        │   - Password hashing (bcrypt)     │
        └─────────────────┬─────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    DATABASE LAYER                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Prisma ORM                                              │   │
│  │                                                          │   │
│  │  User Model:                                            │   │
│  │  ├─ id: Int (Primary Key)                              │   │
│  │  ├─ email: String (Unique)                             │   │
│  │  ├─ fullName: String                                   │   │
│  │  ├─ passwordHash: String (bcrypt)                      │   │
│  │  └─ createdAt: DateTime                                │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐   │
│  │  SQLite Database (dev.db)                               │   │
│  │  - Lightweight & simple                                 │   │
│  │  - Perfect for development                              │   │
│  │  - Can be replaced with PostgreSQL for production       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Sequence

```
┌──────────────────────────────────────────────────────────────────┐
│ User Authentication Journey                                      │
└──────────────────────────────────────────────────────────────────┘

1. INITIAL STATE
   ┌─────────────────────────────────────────────────────────────┐
   │ User visits http://localhost:3000/                           │
   │ - Middleware checks for authToken cookie                    │
   │ - No token found → public home page shown                   │
   └─────────────────────────────────────────────────────────────┘

2. LOGIN INITIATION
   ┌─────────────────────────────────────────────────────────────┐
   │ User clicks "Login" or visits /login                        │
   │ - Login page renders                                        │
   │ - useAuth hook checks auth status                           │
   │ - If already logged in → redirect to /dashboard            │
   └─────────────────────────────────────────────────────────────┘

3. CREDENTIAL SUBMISSION
   ┌─────────────────────────────────────────────────────────────┐
   │ User enters:                                                │
   │ - Email: admin@example.com                                  │
   │ - Password: admin123                                        │
   │ - Clicks "Login"                                            │
   └─────────────────────────────────────────────────────────────┘

4. API REQUEST
   ┌─────────────────────────────────────────────────────────────┐
   │ POST /api/login                                             │
   │ {                                                           │
   │   "email": "admin@example.com",                            │
   │   "password": "admin123"                                    │
   │ }                                                           │
   └─────────────────────────────────────────────────────────────┘

5. SERVER VALIDATION
   ┌─────────────────────────────────────────────────────────────┐
   │ Backend processes:                                          │
   │ 1. Email format validation                                  │
   │ 2. Password length validation                               │
   │ 3. Find user in database                                    │
   │ 4. Compare password with bcrypt hash                        │
   │ 5. Generate JWT token (if valid)                            │
   │ 6. Set HTTP-only cookie with token                          │
   │ 7. Return user data + success message                       │
   └─────────────────────────────────────────────────────────────┘

6. TOKEN STORAGE
   ┌─────────────────────────────────────────────────────────────┐
   │ Browser receives response:                                  │
   │ - JWT token stored in HTTP-only cookie                      │
   │ - Cannot be accessed by JavaScript (XSS protection)        │
   │ - Automatically sent with future requests                   │
   └─────────────────────────────────────────────────────────────┘

7. STATE UPDATE
   ┌─────────────────────────────────────────────────────────────┐
   │ React updates:                                              │
   │ - useAuth hook updates auth state                           │
   │ - user data stored in context                               │
   │ - isAuthenticated set to true                               │
   │ - Component re-renders with new state                       │
   └─────────────────────────────────────────────────────────────┘

8. REDIRECT
   ┌─────────────────────────────────────────────────────────────┐
   │ After successful login:                                     │
   │ - next/navigation.useRouter() called                        │
   │ - router.push('/dashboard') executes                        │
   │ - Browser navigates to /dashboard                           │
   └─────────────────────────────────────────────────────────────┘

9. PROTECTED ROUTE ACCESS
   ┌─────────────────────────────────────────────────────────────┐
   │ GET /dashboard                                              │
   │ - Middleware intercepts request                             │
   │ - Token cookie verified                                     │
   │ - Token payload extracted (userId, email)                   │
   │ - Route allowed, dashboard page renders                     │
   └─────────────────────────────────────────────────────────────┘

10. DASHBOARD DISPLAY
    ┌─────────────────────────────────────────────────────────────┐
    │ Dashboard page shows:                                       │
    │ - Welcome message with user's name                          │
    │ - Email statistics                                          │
    │ - Recent activity                                           │
    │ - Account information                                       │
    │ - Header with logout button                                 │
    └─────────────────────────────────────────────────────────────┘

11. SESSION PERSISTENCE
    ┌─────────────────────────────────────────────────────────────┐
    │ User refreshes page /dashboard                              │
    │ - Token cookie still present                                │
    │ - Middleware verifies token again                           │
    │ - No login required                                         │
    │ - Dashboard loaded successfully                             │
    └─────────────────────────────────────────────────────────────┘

12. LOGOUT PROCESS
    ┌─────────────────────────────────────────────────────────────┐
    │ User clicks "Logout" button                                 │
    │ - handleLogout() called                                     │
    │ - POST /api/logout request sent                             │
    │ - Server clears authToken cookie                            │
    │ - Auth state reset in React                                 │
    │ - router.push('/login') redirects                           │
    └─────────────────────────────────────────────────────────────┘

13. PROTECTED ROUTE REJECTION
    ┌─────────────────────────────────────────────────────────────┐
    │ User manually tries /dashboard after logout                │
    │ - Middleware checks for token                               │
    │ - No valid token found                                      │
    │ - Redirect to /login                                        │
    │ - User must log in again                                    │
    └─────────────────────────────────────────────────────────────┘
```

---

## State Management with Context

```
┌────────────────────────────────────────────────────────────────┐
│              AuthContext (useAuth Hook)                         │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  State Variables:                                              │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ user: User | null                                        │ │
│  │ isLoading: boolean                                       │ │
│  │ isAuthenticated: boolean                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Methods:                                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ login(email, password) → Promise<void>                   │ │
│  │ logout() → Promise<void>                                 │ │
│  │ checkAuth() → Promise<void>                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Consumed by:                                                  │
│  ├─ Login Page (/app/login/page.tsx)                          │
│  ├─ Dashboard Page (/app/dashboard/page.tsx)                  │
│  ├─ Home Page (/app/page.tsx)                                 │
│  └─ Header Component (/components/Header.tsx)                 │
│                                                                 │
│  Provided by:                                                  │
│  └─ AuthProvider (in useAuth.tsx)                             │
│     ↳ Wrapped around all pages in layout.tsx                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Security Layers

```
Layer 1: TRANSPORT SECURITY
├─ HTTPS (in production)
└─ HTTP (in development)

Layer 2: COOKIE SECURITY
├─ httpOnly: true (prevent XSS)
├─ secure: true (production only)
└─ sameSite: 'lax' (prevent CSRF)

Layer 3: TOKEN SECURITY
├─ JWT signature verification
├─ Token expiration (24 hours)
└─ Token rotation capable

Layer 4: PASSWORD SECURITY
├─ bcrypt hashing (salt rounds: 10)
└─ Never stored in plain text

Layer 5: INPUT VALIDATION
├─ Email format validation
├─ Password strength validation
└─ SQL injection protection (Prisma)

Layer 6: ROUTE PROTECTION
├─ Middleware token verification
├─ Protected routes enforcement
└─ Automatic redirect logic

Layer 7: DATA PROTECTION
├─ Sensitive fields excluded from responses
├─ No password hashes in API responses
└─ User data properly filtered
```

---

## Component Hierarchy

```
RootLayout
├─ AuthProvider (Context Provider)
│  │
│  ├─ Home Page (/)
│  │
│  ├─ Login Page (/login)
│  │  └─ useAuth hook
│  │
│  ├─ Dashboard Page (/dashboard)
│  │  ├─ Header component
│  │  │  └─ useAuth hook
│  │  └─ Dashboard content
│  │
│  ├─ API Routes
│  │  ├─ /api/login
│  │  ├─ /api/logout
│  │  ├─ /api/profile
│  │  └─ /api/verify
│  │
│  └─ Middleware
│     └─ Route protection logic
```

---

## Data Flow

```
User Input → Login Form
    ↓
useAuth hook → authService.login()
    ↓
API Call → POST /api/login
    ↓
Server Validation → Database Query
    ↓
Password Hash Comparison (bcrypt)
    ↓
JWT Token Generation
    ↓
Cookie Set (HTTP-only)
    ↓
Response → User Data + Token
    ↓
Auth State Update → Context
    ↓
Component Re-render
    ↓
Router Redirect → /dashboard
    ↓
Middleware Verification → Token Valid
    ↓
Dashboard Display
```

---

## File Dependency Graph

```
src/app/layout.tsx
├─ src/hooks/useAuth.tsx (AuthProvider)
│  ├─ src/services/authService.ts
│  │  └─ (API calls)
│  └─ src/types/auth.ts (TypeScript types)
│
├─ src/app/page.tsx (Home)
│  └─ src/hooks/useAuth.tsx
│
├─ src/app/login/page.tsx (Login)
│  └─ src/hooks/useAuth.tsx
│
├─ src/app/dashboard/page.tsx (Dashboard)
│  ├─ src/components/Header.tsx
│  │  └─ src/hooks/useAuth.tsx
│  └─ src/hooks/useAuth.tsx
│
├─ src/middleware.ts
│  └─ src/utils/jwt.ts
│
└─ API Routes
   ├─ src/app/api/login/route.ts
   │  ├─ src/utils/jwt.ts
   │  └─ src/lib/prisma.ts
   ├─ src/app/api/logout/route.ts
   ├─ src/app/api/profile/route.ts
   │  ├─ src/utils/jwt.ts
   │  └─ src/lib/prisma.ts
   └─ src/app/api/verify/route.ts
      └─ src/utils/jwt.ts
```

---

This architecture provides a **secure, scalable, and professional** authentication system for your email server application.

✨ **Ready for production deployment!**
