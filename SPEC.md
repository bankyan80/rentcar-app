# Rental Mobil App - Spesifikasi

## 1. Project Overview

**Nama Project:** RentalCarApp
**Tipe:** Aplikasi Mobile Android (React Native / Expo)
**Deskripsi:** Aplikasi rental mobil pribadi sederhana dengan tampilan modern dan menarik untuk pengguna yang ingin menyewa mobil.

## 2. Tech Stack

- **Framework:** React Native dengan Expo SDK 53
- **Bahasa:** TypeScript
- **Navigasi:** @react-navigation/native + @react-navigation/bottom-tabs
- **Styling:** NativeWind (Tailwind CSS untuk React Native)
- **Icons:** @expo/vector-icons (Ionicons)
- **State Management:** React useState + Context API
- **Font:** System default / Inter font

## 3. Feature List

### 3.1 Home Screen
- Hero banner dengan judul dan tombol CTA
- Statistik singkat (jumlah mobil, pelanggan puas, rating)
- Tombol cepat ke daftar mobil

### 3.2 Daftar Mobil (Cars)
- Grid/List view mobil dengan gambar
- Card mobil menampilkan: nama, tipe, harga/hari, rating
- Filter sederhana (semua, SUV, Sedan, MPV)
- Tombol "Pesan" di setiap card

### 3.3 Detail Mobil
- Gambar besar mobil
- Info lengkap: nama, tipe, kapasitas, harga
- Deskripsi fitur
- Tombol booking/pemesanan

### 3.4 Pemesanan (Booking)
- Form input: nama, no. HP, tanggal sewa, tanggal kembali
- Ringkasan mobil yang dipilih
- Tombol konfirmasi booking

### 3.5 Riwayat (History)
- Daftar pemesanan yang sudah dibuat
- Status: pending, confirmed, completed
- Detail setiap booking

### 3.6 Profile
- Avatar dan nama user
- Menu: Edit Profil, Riwayat, Pengaturan, Bantuan
- Tombol logout

## 4. UI/UX Design Direction

### Visual Style
- Modern, clean, minimalist dengan rounded corners
- Card-based layout dengan shadows subtle
- Smooth transitions dan micro-interactions

### Color Scheme
- Primary: #2563EB (Blue)
- Secondary: #1E40AF (Dark Blue)
- Accent: #F59E0B (Amber/Orange)
- Background: #F8FAFC (Light Gray)
- Card Background: #FFFFFF
- Text Primary: #1E293B
- Text Secondary: #64748B
- Success: #10B981
- Error: #EF4444

### Typography
- Heading: Bold, 24-28px
- Subheading: SemiBold, 18-20px
- Body: Regular, 14-16px
- Caption: Regular, 12px

### Layout
- Bottom Tab Navigation (5 tabs): Home, Cars, Booking, History, Profile
- Safe area handling untuk notch devices
- Consistent spacing: 16px padding horizontal, 12px antar elemen

## 5. Data Model

### Mobil
```
{
  id: string
  name: string
  brand: string
  type: 'SUV' | 'Sedan' | 'MPV' | 'Hatchback'
  pricePerDay: number
  capacity: number
  image: string
  rating: number
  features: string[]
}
```

### Booking
```
{
  id: string
  carId: string
  carName: string
  customerName: string
  phone: string
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'completed'
  totalPrice: number
}
```

## 6. Struktur Folder

```
src/
  components/       # Komponen reusable
  screens/          # Screen pages
  navigation/       # Navigation setup
  context/          # State management
  data/             # Mock data
  types/            # TypeScript types
  utils/             # Utility functions
```