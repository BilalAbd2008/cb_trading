# 🔐 CB Trading Admin Authentication System

## Overview

Sistem authentication untuk admin CB Trading dengan satu akun tetap (seeder) yang bisa diubah credentialsnya.

---

## 🎯 Fitur Authentication

### ✅ **Yang Sudah Dibuat:**

1. **Login System** - Page login dengan validasi
2. **Protected Routes** - Semua halaman admin memerlukan login
3. **Session Management** - Menggunakan localStorage
4. **Settings Page** - Ubah email & password admin
5. **Logout Function** - Keluar dari sistem
6. **Single Admin Account** - Hanya satu akun (seeder pattern)

---

## 🔑 Default Admin Credentials

**Email:** `admin@cbtrading.com`  
**Password:** `CBTrading2024!`

⚠️ **Penting:** Segera ubah credentials ini setelah login pertama kali!

---

## 📂 File Structure

```
lib/
  └── auth.ts                      # Authentication logic & storage

components/
  └── ProtectedRoute.tsx           # Route protection wrapper

app/
  └── admin/
      ├── login/
      │   └── page.tsx             # Login page
      ├── settings/
      │   └── page.tsx             # Settings (ubah email/password)
      ├── page.tsx                 # Dashboard (protected)
      ├── blog/
      │   └── page.tsx             # Blog management (protected)
      └── subscribers/
          └── page.tsx             # Subscribers (protected)
```

---

## 🚀 Cara Menggunakan

### **1. Login ke Admin Dashboard**

1. Buka: `http://localhost:3000/admin/login`
2. Masukkan credentials default:
   - Email: `admin@cbtrading.com`
   - Password: `CBTrading2024!`
3. Click "Sign In"
4. Redirect ke dashboard admin

### **2. Ubah Email & Password (Settings)**

1. Setelah login, click "Settings" di header
2. Atau akses: `http://localhost:3000/admin/settings`
3. Form fields:
   - **Admin Name** - Ubah nama admin
   - **Email Address** - Ubah email login
   - **Current Password** - Masukkan password saat ini (WAJIB)
   - **New Password** - Password baru (opsional, min 8 karakter)
   - **Confirm New Password** - Konfirmasi password baru
4. Click "Save Changes"

**⚠️ Important:**

- Jika ubah password, Anda akan otomatis logout
- Login lagi dengan password baru

### **3. Logout**

Click tombol "Logout" di header (icon LogOut merah)

---

## 🔒 Security Features

### **1. Protected Routes**

Semua halaman admin wrapped dengan `<ProtectedRoute>`:

```tsx
export default function AdminPage() {
  return (
    <ProtectedRoute>
      <YourContent />
    </ProtectedRoute>
  );
}
```

### **2. Session Check**

Setiap halaman admin check session:

- Jika tidak login → redirect ke `/admin/login`
- Jika sudah login → tampilkan content

### **3. Password Validation**

- Minimum 8 karakter
- Password confirmation required
- Current password verification

### **4. Automatic Logout on Password Change**

Untuk keamanan, setelah ubah password:

1. Auto logout dalam 2 detik
2. Redirect ke login page
3. Login dengan password baru

---

## 💾 Data Storage

Authentication menggunakan **localStorage** dengan 2 keys:

### **1. Admin Credentials**

Key: `cb_admin_credentials`

```json
{
  "email": "admin@cbtrading.com",
  "password": "CBTrading2024!",
  "name": "CB Trading Admin"
}
```

### **2. Admin Session**

Key: `cb_admin_session`

```json
{
  "loggedIn": true,
  "timestamp": "2025-11-05T10:30:00.000Z"
}
```

---

## 🎨 UI Features

### **Login Page** (`/admin/login`)

- ✅ Email & password fields
- ✅ Show/hide password toggle
- ✅ Loading state saat login
- ✅ Error messages
- ✅ Default credentials info (for development)
- ✅ "Back to Website" link

### **Settings Page** (`/admin/settings`)

- ✅ Current account info display
- ✅ Name, email, password fields
- ✅ Show/hide password toggles
- ✅ Success/error messages
- ✅ Auto-logout on password change
- ✅ Warning messages

### **Protected Pages** (Dashboard, Blog, Subscribers)

- ✅ User email display di header
- ✅ Settings button
- ✅ Logout button (red)
- ✅ Loading spinner saat check auth

---

## 📋 Admin Dashboard Updates

Semua halaman admin sekarang punya:

1. **Header dengan Info User:**

   ```tsx
   <User size={14} />
   admin@cbtrading.com
   ```

2. **Navigation Buttons:**

   - Settings (gray)
   - Back to Site (purple)
   - Logout (red)

3. **Auto-redirect:**
   - Jika belum login → `/admin/login`
   - Jika sudah login → show content

---

## 🔧 Functions di `lib/auth.ts`

### **Public Functions:**

```typescript
// Initialize default admin (first time)
initializeAdmin(): void

// Get admin credentials
getAdminCredentials(): AdminUser

// Update credentials (email, password, name)
updateAdminCredentials(email, password, name?): boolean

// Verify login
verifyLogin(email, password): boolean

// Create session (after login)
createSession(): void

// Check if logged in
isAdminLoggedIn(): boolean

// Logout (clear session)
logout(): void

// Get admin info (without password)
getAdminInfo(): { email, name }
```

---

## 🎯 User Flow

### **First Time Login:**

```
1. User → /admin → redirect ke /admin/login
2. Login dengan default credentials
3. Redirect ke /admin dashboard
4. Click "Settings"
5. Ubah email & password
6. Auto logout
7. Login lagi dengan credentials baru
```

### **Subsequent Logins:**

```
1. User → /admin/login
2. Login dengan credentials tersimpan
3. Access semua admin features
4. Click "Logout" untuk keluar
```

---

## ⚠️ Important Notes

1. **Single Account Only:**

   - Tidak bisa tambah admin baru
   - Hanya satu akun yang bisa diubah credentialsnya

2. **localStorage Usage:**

   - Data tersimpan di browser
   - Clear browser data = reset ke default credentials
   - Not suitable for production (consider database + proper auth)

3. **Development Mode:**

   - Default credentials displayed di login page
   - Remove untuk production

4. **Session Persistence:**
   - Session bertahan sampai logout manual
   - Atau clear localStorage

---

## 🚀 Production Recommendations

Untuk production, pertimbangkan:

1. **Migrate ke Database:**

   - Simpan credentials di Supabase
   - Hash passwords dengan bcrypt

2. **Proper Authentication:**

   - NextAuth.js
   - Supabase Auth
   - JWT tokens

3. **Session Management:**

   - Server-side sessions
   - Secure cookies
   - Token expiration

4. **Security Enhancements:**
   - Rate limiting
   - 2FA (Two-Factor Authentication)
   - Password strength requirements
   - Login attempt logging

---

## 📱 Responsive Design

Semua authentication pages fully responsive:

- ✅ Mobile-friendly forms
- ✅ Touch-friendly buttons
- ✅ Flexible layouts
- ✅ Readable on all screen sizes

---

## 🎉 Summary

✅ **Login system** dengan default credentials  
✅ **Protected routes** untuk semua admin pages  
✅ **Settings page** untuk ubah credentials  
✅ **Session management** dengan localStorage  
✅ **Logout functionality** di semua pages  
✅ **Single admin account** (seeder pattern)  
✅ **Consistent UI/UX** dengan design system existing

**Siap digunakan!** 🚀

Default Login:

- Email: `admin@cbtrading.com`
- Password: `CBTrading2024!`

Akses: `http://localhost:3000/admin/login`
