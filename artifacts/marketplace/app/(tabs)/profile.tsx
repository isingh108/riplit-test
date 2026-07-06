import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/components/ProductCard';
import { Feather } from '@expo/vector-icons';

type MenuItemProps = {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
};

function MenuItem({ icon, label, value, onPress }: MenuItemProps) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={[styles.menuIconWrap, { backgroundColor: colors.secondary, borderRadius: 8 }]}>
        <Feather name={icon as any} size={16} color={colors.primary} />
      </View>
      <Text style={[styles.menuLabel, { color: colors.foreground }]}>{label}</Text>
      <View style={styles.menuRight}>
        {value && <Text style={[styles.menuValue, { color: colors.mutedForeground }]}>{value}</Text>}
        <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 34 + 84 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 16, backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Profile</Text>
        <Pressable hitSlop={8}>
          <Feather name="settings" size={20} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Avatar + Stats */}
      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius + 4, marginHorizontal: 16 }]}>
        <View style={styles.avatarRow}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground }]}>Alex Johnson</Text>
            <Text style={[styles.profileEmail, { color: colors.mutedForeground }]}>alex@example.com</Text>
            <View style={[styles.memberBadge, { backgroundColor: colors.accent }]}>
              <Feather name="award" size={11} color={colors.primary} />
              <Text style={[styles.memberBadgeText, { color: colors.primary }]}>Premium Member</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
          {[
            { label: 'Orders', value: '14' },
            { label: 'Reviews', value: '7' },
            { label: 'Saved', value: String(favorites.length) },
          ].map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu */}
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, marginHorizontal: 16, marginTop: 20 }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>ACCOUNT</Text>
        <MenuItem icon="package" label="My Orders" value="14 orders" />
        <MenuItem icon="map-pin" label="Saved Addresses" />
        <MenuItem icon="credit-card" label="Payment Methods" />
        <MenuItem icon="bell" label="Notifications" />
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, marginHorizontal: 16, marginTop: 12 }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>SELLING</Text>
        <MenuItem icon="plus-circle" label="List an Item" />
        <MenuItem icon="bar-chart-2" label="My Listings" />
        <MenuItem icon="trending-up" label="Earnings" />
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, marginHorizontal: 16, marginTop: 12 }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>SUPPORT</Text>
        <MenuItem icon="help-circle" label="Help Center" />
        <MenuItem icon="message-circle" label="Contact Support" />
        <MenuItem icon="star" label="Rate the App" />
      </View>

      {/* Saved items */}
      {favorites.length > 0 && (
        <>
          <Text style={[styles.favTitle, { color: colors.foreground }]}>Saved Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favRow}>
            {favorites.map((p) => (
              <ProductCard key={p.id} product={p} style={{ width: 150 }} />
            ))}
          </ScrollView>
        </>
      )}

      {/* Sign out */}
      <Pressable
        style={({ pressed }) => [
          styles.signOut,
          { borderColor: colors.border, borderRadius: colors.radius, marginHorizontal: 16, marginTop: 20, opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Feather name="log-out" size={16} color={colors.destructive} />
        <Text style={[styles.signOutText, { color: colors.destructive }]}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  profileCard: { borderWidth: 1, overflow: 'hidden' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700' },
  profileInfo: { flex: 1, gap: 3 },
  profileName: { fontSize: 18, fontWeight: '700' },
  profileEmail: { fontSize: 13 },
  memberBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginTop: 4 },
  memberBadgeText: { fontSize: 11, fontWeight: '600' },
  statsRow: { flexDirection: 'row', borderTopWidth: 1, paddingVertical: 14 },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  section: { borderWidth: 1, overflow: 'hidden' },
  sectionLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.8, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 12, borderBottomWidth: 1 },
  menuIconWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15 },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  menuValue: { fontSize: 13 },
  favTitle: { fontSize: 17, fontWeight: '700', marginHorizontal: 16, marginTop: 24, marginBottom: 12 },
  favRow: { paddingHorizontal: 16, gap: 12 },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderWidth: 1 },
  signOutText: { fontSize: 15, fontWeight: '600' },
});
