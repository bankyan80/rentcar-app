import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';

const { width } = Dimensions.get('window');

export default function CarDetailScreen() {
  const { carId } = useLocalSearchParams();
  const router = useRouter();
  const { cars, setSelectedCar } = useApp();

  const car = cars.find((c) => c.id === carId);

  if (!car) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons name="car-outline" size={64} color={Colors.light.textSecondary} />
          <Text style={styles.notFoundText}>Mobil tidak ditemukan</Text>
          <Button title="Kembali" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleBooking = () => {
    setSelectedCar(car);
    router.push('/booking');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="car" size={80} color={Colors.light.textSecondary} />
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color={Colors.light.accent} />
            <Text style={styles.ratingText}>{car.rating}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>{car.brand}</Text>
              <Text style={styles.name}>{car.name}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{car.type}</Text>
            </View>
          </View>

          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Ionicons name="people" size={24} color={Colors.light.primary} />
              <Text style={styles.specValue}>{car.capacity}</Text>
              <Text style={styles.specLabel}>Penumpang</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="settings" size={24} color={Colors.light.primary} />
              <Text style={styles.specValue}>Auto</Text>
              <Text style={styles.specLabel}>Transmisi</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="flash-outline" size={24} color={Colors.light.primary} />
              <Text style={styles.specValue}>Full</Text>
              <Text style={styles.specLabel}>BBM</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="calendar" size={24} color={Colors.light.primary} />
              <Text style={styles.specValue}>2024</Text>
              <Text style={styles.specLabel}>Tahun</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>
              {car.name} adalah pilihan sempurna untuk kebutuhan transportasi Anda.
              Dengan desain yang modern dan nyaman, mobil ini cocok untuk keluarga maupun
              perjalanan bisnis. Dilengkapi dengan berbagai fitur canggih untuk menjamin
              kenyamanan dan keamanan selama perjalanan.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fitur</Text>
            <View style={styles.featuresGrid}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.light.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Harga per Hari</Text>
          <Text style={styles.price}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(car.pricePerDay)}
          </Text>
        </View>
        <Button title="Pesan Sekarang" onPress={handleBooking} style={styles.bookButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  imageSection: {
    width: width,
    height: 250,
    backgroundColor: Colors.light.background,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  ratingText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.light.text,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  brand: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.light.text,
  },
  typeBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  typeText: {
    color: '#FFF',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  specsGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specValue: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  specLabel: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.light.card,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  featureText: {
    fontSize: FontSize.md,
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  priceContainer: {},
  priceLabel: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
  },
  price: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  bookButton: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  notFoundText: {
    fontSize: FontSize.lg,
    color: Colors.light.textSecondary,
  },
});