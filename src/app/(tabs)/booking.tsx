import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Button, Input } from '@/components/ui';

export default function BookingScreen() {
  const router = useRouter();
  const { selectedCar, addBooking, user } = useApp();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const totalPrice = selectedCar ? selectedCar.pricePerDay * days : 0;

  const handleConfirm = () => {
    if (!name || !phone || !startDate || !endDate) {
      Alert.alert('Error', 'Mohon lengkapi semua data');
      return;
    }

    if (days <= 0) {
      Alert.alert('Error', 'Tanggal tidak valid');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (selectedCar) {
        addBooking({
          carId: selectedCar.id,
          carName: selectedCar.name,
          carImage: selectedCar.image,
          customerName: name,
          phone,
          startDate,
          endDate,
          status: 'pending',
          totalPrice,
        });
      }
      setLoading(false);
      Alert.alert('Sukses', 'Pemesanan berhasil! Kami akan menghubungi Anda shortly.', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/history');
          },
        },
      ]);
    }, 1000);
  };

  if (!selectedCar) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={80} color={Colors.light.textSecondary} />
          <Text style={styles.emptyTitle}>Belum Pilih Mobil</Text>
          <Text style={styles.emptyText}>
            Silakan pilih mobil terlebih dahulu dari daftar mobil
          </Text>
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={() => router.push('/cars')}>
            <Text style={styles.chooseButtonText}>Pilih Mobil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Form Pemesanan</Text>
          <Text style={styles.subtitle}>Lengkapi data di bawah ini</Text>
        </View>

        <View style={styles.carSummary}>
          <View style={styles.carImagePlaceholder}>
            <Ionicons name="car" size={40} color={Colors.light.primary} />
          </View>
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{selectedCar.name}</Text>
            <Text style={styles.carDetail}>
              {selectedCar.brand} • {selectedCar.type} • {selectedCar.capacity} Penumpang
            </Text>
            <Text style={styles.carPrice}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(selectedCar.pricePerDay)}{' '}
              / hari
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Input
            label="Nama Lengkap"
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama lengkap"
          />
          <Input
            label="Nomor HP"
            value={phone}
            onChangeText={setPhone}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
          />
          <Input
            label="Tanggal Mulai Sewa"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
          />
          <Input
            label="Tanggal Selesai Sewa"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
          />

          {days > 0 && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Ringkasan</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Durasi Sewa</Text>
                <Text style={styles.summaryValue}>{days} hari</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Harga per Hari</Text>
                <Text style={styles.summaryValue}>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(selectedCar.pricePerDay)}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </Text>
              </View>
            </View>
          )}

          <Button
            title="Konfirmasi Pemesanan"
            onPress={handleConfirm}
            loading={loading}
            style={styles.confirmButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  carSummary: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  carName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.text,
  },
  carDetail: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  carPrice: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.light.primary,
    marginTop: Spacing.xs,
  },
  form: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  summaryCard: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  summaryLabel: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
  },
  summaryValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.light.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  confirmButton: {
    marginTop: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  chooseButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.lg,
  },
  chooseButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: FontSize.md,
  },
});