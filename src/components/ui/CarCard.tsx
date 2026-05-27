import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { Car } from '@/types';

interface CarCardProps {
  car: Car;
  onPress: () => void;
  onBook?: () => void;
}

export function CarCard({ car, onPress, onBook }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{car.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.rating}>{car.rating}</Text>
          </View>
        </View>
        <Text style={styles.brand}>{car.brand} • {car.type}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(car.pricePerDay)}</Text>
          <Text style={styles.perDay}>/hari</Text>
        </View>
        {onBook && (
          <TouchableOpacity style={styles.bookButton} onPress={onBook}>
            <Text style={styles.bookText}>Pesan</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    color: Colors.light.accent,
    fontSize: FontSize.md,
    marginRight: 4,
  },
  rating: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    fontWeight: '600',
  },
  brand: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  perDay: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  bookText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
});