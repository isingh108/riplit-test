import React from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

function CartRow({ item }: { item: CartItem }) {
  const colors = useColors();
  const { updateQuantity, removeFromCart } = useCart();

  const handleQty = (delta: number) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateQuantity(item.product.id, item.quantity + delta);
  };

  return (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
      <Pressable onPress={() => router.push(`/product/${item.product.id}`)}>
        <Image source={item.product.image} style={[styles.rowImage, { borderRadius: colors.radius - 2 }]} resizeMode="cover" />
      </Pressable>
      <View style={styles.rowInfo}>
        <Text style={[styles.rowName, { color: colors.foreground }]} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={[styles.rowSeller, { color: colors.mutedForeground }]}>{item.product.seller.name}</Text>
        <View style={styles.rowBottom}>
          <Text style={[styles.rowPrice, { color: colors.foreground }]}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
          <View style={[styles.qtyControl, { borderColor: colors.border }]}>
            <Pressable style={styles.qtyBtn} onPress={() => handleQty(-1)} hitSlop={6}>
              <Feather name="minus" size={13} color={colors.foreground} />
            </Pressable>
            <Text style={[styles.qty, { color: colors.foreground }]}>{item.quantity}</Text>
            <Pressable style={styles.qtyBtn} onPress={() => handleQty(1)} hitSlop={6}>
              <Feather name="plus" size={13} color={colors.foreground} />
            </Pressable>
          </View>
        </View>
      </View>
      <Pressable
        style={styles.deleteBtn}
        onPress={() => {
          if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          removeFromCart(item.product.id);
        }}
        hitSlop={8}
      >
        <Feather name="trash-2" size={16} color={colors.mutedForeground} />
      </Pressable>
    </View>
  );
}

export default function CartScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { items, subtotal, clearCart } = useCart();

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;

  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const total = subtotal + shipping;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>My Cart</Text>
        {items.length > 0 && (
          <Pressable onPress={clearCart} hitSlop={8}>
            <Text style={[styles.clearText, { color: colors.mutedForeground }]}>Clear all</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyIconWrap, { backgroundColor: colors.secondary, borderRadius: 40 }]}>
            <Feather name="shopping-cart" size={32} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Your cart is empty</Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            Browse the marketplace and add items you love
          </Text>
          <Pressable
            style={[styles.browseBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Text style={[styles.browseBtnText, { color: colors.primaryForeground }]}>Start Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.product.id}
            contentContainerStyle={[styles.list, { paddingBottom: bottomInset + 16 }]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CartRow item={item} />}
          />

          {/* Summary */}
          <View style={[styles.summary, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: bottomInset + 16 }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: colors.foreground }]}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Shipping</Text>
              <Text style={[styles.summaryValue, { color: shipping === 0 ? colors.success : colors.foreground }]}>
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.foreground }]}>Total</Text>
              <Text style={[styles.totalValue, { color: colors.foreground }]}>${total.toFixed(2)}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.checkoutBtn,
                { backgroundColor: colors.primary, borderRadius: colors.radius, opacity: pressed ? 0.88 : 1 },
              ]}
              onPress={() => {
                if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              }}
            >
              <Feather name="lock" size={15} color={colors.primaryForeground} />
              <Text style={[styles.checkoutBtnText, { color: colors.primaryForeground }]}>Checkout · ${total.toFixed(2)}</Text>
            </Pressable>
            {subtotal > 0 && subtotal <= 100 && (
              <Text style={[styles.freeShipping, { color: colors.mutedForeground }]}>
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  title: { fontSize: 22, fontWeight: '700' },
  clearText: { fontSize: 14 },
  list: { padding: 16, gap: 12 },
  row: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderWidth: 1,
  },
  rowImage: { width: 80, height: 80 },
  rowInfo: { flex: 1, gap: 4 },
  rowName: { fontSize: 14, fontWeight: '500', lineHeight: 19 },
  rowSeller: { fontSize: 12 },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  rowPrice: { fontSize: 15, fontWeight: '700' },
  qtyControl: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8 },
  qtyBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  qty: { fontSize: 14, fontWeight: '600', minWidth: 24, textAlign: 'center' },
  deleteBtn: { padding: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 40 },
  emptyIconWrap: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  browseBtn: { paddingHorizontal: 24, paddingVertical: 13, marginTop: 8 },
  browseBtnText: { fontSize: 15, fontWeight: '600' },
  summary: { padding: 16, borderTopWidth: 1, gap: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: '500' },
  divider: { height: 1, marginVertical: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '700' },
  checkoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, marginTop: 4 },
  checkoutBtnText: { fontSize: 16, fontWeight: '600' },
  freeShipping: { fontSize: 12, textAlign: 'center', marginTop: 4 },
});
