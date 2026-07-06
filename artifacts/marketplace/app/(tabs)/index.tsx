import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { CategoryChip } from '@/components/CategoryChip';
import { SearchBar } from '@/components/SearchBar';
import { CATEGORIES, FEATURED_PRODUCTS, PRODUCTS, TRENDING_PRODUCTS } from '@/data/products';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const BANNERS = [
  {
    id: 'b1',
    image: require('../../assets/images/banner-electronics.jpg'),
    title: 'Up to 40% off\nElectronics',
    sub: 'Limited time deals',
  },
  {
    id: 'b2',
    image: require('../../assets/images/banner-fashion.jpg'),
    title: 'New Arrivals\nin Fashion',
    sub: 'Fresh styles this season',
  },
  {
    id: 'b3',
    image: require('../../assets/images/banner-home.jpg'),
    title: 'Refresh Your\nHome',
    sub: 'Handpicked home goods',
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  const filtered =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 34 + 84 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 16, backgroundColor: colors.background }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>Good morning</Text>
          <Text style={[styles.appName, { color: colors.foreground }]}>Marketplace</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Feather name="shopping-cart" size={20} color={colors.foreground} />
            {totalItems > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>
                  {totalItems > 9 ? '9+' : totalItems}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value=""
          onChangeText={() => {}}
          editable={false}
          onPress={() => router.push('/(tabs)/explore')}
        />
      </View>

      {/* Hero banners */}
      <FlatList
        data={BANNERS}
        keyExtractor={(b) => b.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerList}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSub}>{item.sub}</Text>
              <Pressable style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Shop Now</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Categories */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.name}
            icon={cat.icon}
            selected={selectedCategory === cat.id}
            onPress={() => setSelectedCategory(cat.id)}
          />
        ))}
      </ScrollView>

      {/* Featured / Filtered */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 0 }]}>
          {selectedCategory === 'all' ? 'Featured' : CATEGORIES.find(c => c.id === selectedCategory)?.name ?? 'Products'}
        </Text>
        <Pressable onPress={() => router.push('/(tabs)/explore')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
        </Pressable>
      </View>
      <FlatList
        data={selectedCategory === 'all' ? FEATURED_PRODUCTS : filtered}
        keyExtractor={(p) => p.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productRow}
        renderItem={({ item }) => (
          <ProductCard product={item} style={{ width: 160 }} />
        )}
      />

      {/* Trending */}
      {selectedCategory === 'all' && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 0 }]}>Trending Now</Text>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.grid}>
            {TRENDING_PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} style={{ width: '47%' }} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  greeting: { fontSize: 13, marginBottom: 2 },
  appName: { fontSize: 22, fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  searchWrapper: { paddingHorizontal: 16, marginBottom: 16 },
  bannerList: { marginBottom: 4 },
  bannerCard: {
    width: 340,
    height: 180,
    marginLeft: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: { width: '100%', height: '100%', position: 'absolute' },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerTitle: { color: 'white', fontSize: 22, fontWeight: '700', lineHeight: 28, marginBottom: 4 },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 14 },
  bannerBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  bannerBtnText: { fontSize: 13, fontWeight: '600', color: 'black' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginHorizontal: 16, marginTop: 20, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 20, marginBottom: 12 },
  seeAll: { fontSize: 13, fontWeight: '600' },
  categoriesRow: { paddingHorizontal: 16, gap: 8 },
  productRow: { paddingHorizontal: 16, gap: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, justifyContent: 'space-between' },
});
