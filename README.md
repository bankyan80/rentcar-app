# RentCar App

Aplikasi rental mobil pribadi berbasis Android dengan tampilan modern dan menarik.

## Tech Stack

- **Framework:** Expo SDK 56 + React Native 0.85
- **Bahasa:** TypeScript
- **Backend:** Firebase Authentication
- **Deploy:** Vercel
- **Navigasi:** Expo Router + Bottom Tabs

## Fitur

- Home Screen dengan banner dan statistik
- Daftar mobil dengan filter tipe (SUV, Sedan, MPV, Hatchback)
- Detail mobil
- Form pemesanan
- Riwayat pemesanan
- Profile user
- Login/Register dengan Firebase Auth
- Login dengan Google

## Setup Firebase

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Dari file konfigurasi, catat nilai-nilai berikut:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### 2. Enable Authentication
1. Di Firebase Console, masuk ke **Authentication**
2. Klik **Get Started**
3. Enable **Email/Password**
4. Enable **Google** (opsional)

### 3. Tambahkan Authorized Domains
1. Di Authentication > Settings > Authorized domains
2. Tambahkan:
   - `localhost` (untuk development)
   - `rentcar-app-puce.vercel.app` (untuk production)

### 4. Update Firebase Config
File konfigurasi ada di: `src/lib/firebase.ts`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run web

# Type check
npx tsc --noEmit

# Build for production
npx expo export --platform web
```

## Deployment

App auto-deploy ke Vercel setiap kali ada push ke GitHub.

**Live URL:** https://rentcar-app-puce.vercel.app

**GitHub:** https://github.com/bankyan80/rentcar-app

## Project Structure

```
src/
  app/                  # Expo Router pages
    (tabs)/             # Tab navigation screens
      index.tsx          # Home
      cars.tsx          # Daftar mobil
      booking.tsx        # Form booking
      history.tsx        # Riwayat
      profile.tsx        # Profil
    auth/
      login.tsx          # Login/Register
    car-detail.tsx       # Detail mobil
  components/ui/         # Reusable components
  context/
    AppContext.tsx       # App state management
    AuthContext.tsx      # Auth state management
  data/
    cars.ts              # Mock data
  lib/
    firebase.ts          # Firebase config
  types/                 # TypeScript types
```

## Screenshots

### Home Screen
Hero banner dengan CTA, statistik, mobil populer, dan fitur aplikasi.

### Daftar Mobil
Grid 2 kolom dengan filter tipe: SUV, Sedan, MPV, Hatchback.

### Form Booking
Input nama, no. HP, tanggal sewa dengan kalkulasi harga otomatis.

### Login
Email/password dan Google sign-in dengan Firebase Authentication.

## License

MIT