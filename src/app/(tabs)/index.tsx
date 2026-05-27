import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { cars, user } = useApp();

  const stats = [
    { icon: 'car', value: cars.length.toString(), label: 'Mobil Tersedia' },
    { icon: 'people', value: '500+', label: 'Pelanggan Puas' },
    { icon: 'star', value: '4.8', label: 'Rating Aplikasi' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, {user.name.split(' ')[0]} 👋</Text>
            <Text style={styles.subtitle}>Mau rental mobil kemana?</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Rental Mobil{'\n'}Pribadi Premium</Text>
            <Text style={styles.heroSubtitle}>Solusi transportasi terbaik untuk Anda</Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => router.push('/cars')}>
              <Text style={styles.heroButtonText}>Lihat Mobil</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={24} color={Colors.light.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mobil Populer</Text>
            <TouchableOpacity onPress={() => router.push('/cars')}>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cars.slice(0, 4).map((car) => (
              <TouchableOpacity
                key={car.id}
                style={styles.popularCard}
                onPress={() => router.push({ pathname: '/car-detail', params: { carId: car.id } })}>
                <Image source={{ uri: car.image }} style={styles.popularImage} />
                <View style={styles.popularContent}>
                  <Text style={styles.popularName}>{car.name}</Text>
                  <Text style={styles.popularType}>{car.type}</Text>
                  <View style={styles.popularFooter}>
                    <Text style={styles.popularPrice}>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(car.pricePerDay)}
                    </Text>
                    <Text style={styles.popularPerDay}>/hari</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Kenapa Memilih Kami?</Text>
          <View style={styles.featuresGrid}>
            {[
              { icon: 'shield-checkmark', title: 'Terpercaya', desc: 'Mobil terawat & terjamin' },
              { icon: 'cash', title: 'Harga Bersahabat', desc: 'Promo menarik setiap hari' },
              { icon: 'call', title: 'Layanan 24/7', desc: 'Siap membantu kapan saja' },
              { icon: 'location', title: 'Antar Jemput', desc: 'Gratis untuk area tertentu' },
            ].map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name={feature.icon as any} size={28} color={Colors.light.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heroCard: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.9)',
    marginTop: Spacing.xs,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    gap: 8,
  },
  heroButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  popularCard: {
    width: 180,
    marginLeft: Spacing.md,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  popularContent: {
    padding: Spacing.sm,
  },
  popularName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
  },
  popularType: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  popularFooter: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  popularPrice: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  popularPerDay: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    marginLeft: 2,
  },
  featuresSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  featureCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: FontSize.xs,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});