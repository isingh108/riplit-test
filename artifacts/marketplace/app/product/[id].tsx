import React, { useState } from 'react';
import {
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
import { useFavorites } from '@/context/FavoritesContext';
import { PRODUCTS } from '@/data/products';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>Product not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const favorited = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Back + Favorite overlay */}
      <View style={[styles.overlay, { paddingTop: topInset + 8 }]}>
        <Pressable
          style={[styles.overlayBtn, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Pressable
          style={[styles.overlayBtn, { backgroundColor: colors.card }]}
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            toggleFavorite(product);
          }}
        >
          <Feather name="heart" size={20} color={favorited ? colors.primary : colors.foreground} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomInset + 100 }}>
        {/* Hero image */}
        <Image source={product.image} style={styles.heroImage} resizeMode="cover" />

        <View style={styles.content}>
          {/* Category + discount */}
          <View style={styles.tagRow}>
            <View style={[styles.catTag, { backgroundColor: colors.secondary, borderRadius: 6 }]}>
              <Text style={[styles.catTagText, { color: colors.mutedForeground }]}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Text>
            </View>
            {discount && (
              <View style={[styles.discountTag, { backgroundColor: colors.primary, borderRadius: 6 }]}>
                <Text style={[styles.discountTagText, { color: colors.primaryForeground }]}>{discount}% off</Text>
              </View>
            )}
          </View>

          {/* Name + price */}
          <Text style={[styles.name, { color: colors.foreground }]}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.foreground }]}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Feather
                key={s}
                name="star"
                size={14}
                color={s <= Math.floor(product.rating) ? colors.star : colors.border}
              />
            ))}
            <Text style={[styles.ratingText, { color: colors.mutedForeground }]}>
              {product.rating} · {product.reviewCount} reviews
            </Text>
          </View>

          {/* Description */}
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Description</Text>
          <Text style={[styles.description, { color: colors.mutedForeground }]}>{product.description}</Text>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {product.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.secondary, borderRadius: 6 }]}>
                <Text style={[styles.tagText, { color: colors.mutedForeground }]}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Seller */}
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Seller</Text>
          <View style={[styles.sellerCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
            <View style={[styles.sellerAvatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.sellerAvatarText, { color: colors.primaryForeground }]}>
                {product.seller.avatar}
              </Text>
            </View>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerNameRow}>
                <Text style={[styles.sellerName, { color: colors.foreground }]}>{product.seller.name}</Text>
                {product.seller.verified && (
                  <Feather name="check-circle" size={14} color={colors.primary} />
                )}
              </View>
              <Text style={[styles.sellerStats, { color: colors.mutedForeground }]}>
                {product.seller.rating} rating · {product.seller.totalSales.toLocaleString()} sales
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: bottomInset + 12 }]}>
        <View style={[styles.qtyControl, { borderColor: colors.border }]}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            hitSlop={6}
          >
            <Feather name="minus" size={16} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.qty, { color: colors.foreground }]}>{qty}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => setQty((q) => q + 1)} hitSlop={6}>
            <Feather name="plus" size={16} color={colors.foreground} />
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.addBtn,
            {
              backgroundColor: added ? colors.success : colors.primary,
              borderRadius: colors.radius,
              opacity: pressed ? 0.9 : 1,
              flex: 1,
            },
          ]}
          onPress={handleAddToCart}
        >
          <Feather name={added ? 'check' : 'shopping-cart'} size={18} color={colors.primaryForeground} />
          <Text style={[styles.addBtnText, { color: colors.primaryForeground }]}>
            {added ? 'Added to Cart' : `Add to Cart · $${(product.price * qty).toFixed(2)}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  overlayBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  heroImage: { width: '100%', height: 320 },
  content: { padding: 20, gap: 10 },
  tagRow: { flexDirection: 'row', gap: 8 },
  catTag: { paddingHorizontal: 10, paddingVertical: 4 },
  catTagText: { fontSize: 12, fontWeight: '500' },
  discountTag: { paddingHorizontal: 10, paddingVertical: 4 },
  discountTagText: { fontSize: 12, fontWeight: '600' },
  name: { fontSize: 22, fontWeight: '700', lineHeight: 28, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  price: { fontSize: 24, fontWeight: '700' },
  originalPrice: { fontSize: 16, textDecorationLine: 'line-through' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, marginLeft: 4 },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12 },
  sellerCard: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12, borderWidth: 1 },
  sellerAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sellerAvatarText: { fontSize: 14, fontWeight: '700' },
  sellerInfo: { flex: 1, gap: 3 },
  sellerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sellerName: { fontSize: 15, fontWeight: '600' },
  sellerStats: { fontSize: 12 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  qtyControl: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10 },
  qtyBtn: { paddingHorizontal: 12, paddingVertical: 10 },
  qty: { fontSize: 16, fontWeight: '600', minWidth: 30, textAlign: 'center' },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  addBtnText: { fontSize: 15, fontWeight: '600' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 18 },
  backLink: { fontSize: 15 },
});
