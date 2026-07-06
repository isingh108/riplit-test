import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useFavorites } from '@/context/FavoritesContext';
import { Product } from '@/data/products';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

type Props = {
  product: Product;
  style?: object;
};

export function ProductCard({ product, style }: Props) {
  const colors = useColors();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleFavorite = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(product);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderRadius: colors.radius, borderColor: colors.border },
        style,
        pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] },
      ]}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={[styles.image, { borderRadius: colors.radius }]}
          resizeMode="cover"
        />
        {discount && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>-{discount}%</Text>
          </View>
        )}
        <Pressable
          style={[styles.favoriteBtn, { backgroundColor: colors.card }]}
          onPress={handleFavorite}
          hitSlop={8}
        >
          <Feather
            name={favorited ? 'heart' : 'heart'}
            size={16}
            color={favorited ? colors.primary : colors.mutedForeground}
          />
        </Pressable>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <Feather name="star" size={11} color={colors.star} />
          <Text style={[styles.rating, { color: colors.mutedForeground }]}>
            {product.rating} ({product.reviewCount})
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.foreground }]}>
            ${product.price.toFixed(2)}
          </Text>
          {product.originalPrice && (
            <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        <Text style={[styles.seller, { color: colors.mutedForeground }]} numberOfLines={1}>
          {product.seller.name}
          {product.seller.verified ? ' ✓' : ''}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  info: {
    padding: 10,
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  seller: {
    fontSize: 11,
  },
});
