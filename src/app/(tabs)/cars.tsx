import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { CarCard } from '@/components/ui';
import { CarType } from '@/types';

const { width } = Dimensions.get('window');

const carTypes: { label: string; value: CarType | 'All' }[] = [
  { label: 'Semua', value: 'All' },
  { label: 'SUV', value: 'SUV' },
  { label: 'Sedan', value: 'Sedan' },
  { label: 'MPV', value: 'MPV' },
  { label: 'Hatchback', value: 'Hatchback' },
];

export default function CarsScreen() {
  const router = useRouter();
  const { cars, setSelectedCar } = useApp();
  const [selectedType, setSelectedType] = useState<CarType | 'All'>('All');

  const filteredCars =
    selectedType === 'All' ? cars : cars.filter((car) => car.type === selectedType);

  const handleCarPress = (carId: string) => {
    router.push({ pathname: '/car-detail', params: { carId } });
  };

  const handleBook = (car: typeof cars[0]) => {
    setSelectedCar(car);
    router.push('/booking');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Mobil</Text>
        <Text style={styles.subtitle}>{cars.length} mobil tersedia</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}>
          {carTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.filterChip,
                selectedType === type.value && styles.filterChipActive,
              ]}
              onPress={() => setSelectedType(type.value)}>
              <Text
                style={[
                  styles.filterText,
                  selectedType === type.value && styles.filterTextActive,
                ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.cardInner}
              onPress={() => handleCarPress(item.id)}
              activeOpacity={0.9}>
              <View style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="car" size={40} color={Colors.light.textSecondary} />
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={Colors.light.accent} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carBrand}>{item.brand} • {item.type}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(item.pricePerDay)}
                  </Text>
                  <Text style={styles.perDay}>/hari</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => handleBook(item)}>
                  <Text style={styles.bookBtnText}>Pesan</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={64} color={Colors.light.textSecondary} />
            <Text style={styles.emptyText}>Tidak ada mobil ditemukan</Text>
          </View>
        }
      />
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
  filterContainer: {
    paddingVertical: Spacing.sm,
  },
  filterScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterChipActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    marginBottom: Spacing.md,
  },
  cardInner: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 100,
    backgroundColor: Colors.light.background,
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    gap: 2,
  },
  ratingText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.light.text,
  },
  cardContent: {
    padding: Spacing.sm,
  },
  carName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
  },
  carBrand: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  price: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  perDay: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginLeft: 2,
  },
  bookBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  bookBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.xxl * 2,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
  },
});