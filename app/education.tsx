import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpen,
  CalendarDays,
  MessageCircle,
  ClipboardList,
  ChevronRight,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  testID: string;
}

function MenuCard({ icon, title, subtitle, onPress, testID }: MenuCardProps) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={styles.menuCardIcon}>{icon}</View>
      <View style={styles.menuCardContent}>
        <Text style={styles.menuCardTitle}>{title}</Text>
        <Text style={styles.menuCardSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={18} color={Colors.textLight} />
    </TouchableOpacity>
  );
}

export default function EducationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <Text style={styles.topLabel}>Eğitim Modülü</Text>
          <Text style={styles.appTitle}>KOLONOSKOPİ</Text>
          <Text style={styles.appTitleSub}>Bağırsak Hazırlığı Rehberi</Text>
        </View>

        <View style={styles.illustrationSection}>
          <View style={styles.organContainer}>
            <View style={styles.organOuter}>
              <View style={styles.organSegment1} />
              <View style={styles.organSegment2} />
              <View style={styles.organSegment3} />
              <View style={styles.organCenter}>
                <ClipboardList size={36} color={Colors.primary} strokeWidth={1.5} />
              </View>
            </View>
          </View>
          <Text style={styles.illustrationLabel}>
            Bağırsak Hazırlığı Eğitimi
          </Text>
          <Text style={styles.illustrationDesc}>
            Kolonoskopi işleminiz için gerekli hazırlık adımlarını öğrenin
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoCardDot} />
          <Text style={styles.infoCardText}>
            Başarılı bir kolonoskopi için bağırsak temizliği büyük önem taşır.
            Aşağıdaki menülerden işlem tarihini seçebilir, hatırlatmaları
            görüntüleyebilir ve araştırmacıya danışabilirsiniz.
          </Text>
        </View>

        <View style={styles.menuSection}>
          <MenuCard
            icon={<CalendarDays size={22} color={Colors.primary} />}
            title="Tarih Seçimi"
            subtitle="Kolonoskopi tarihini belirleyin"
            onPress={() => router.push('/date-selection' as any)}
            testID="edu-date-btn"
          />
          <MenuCard
            icon={<BookOpen size={22} color={Colors.primary} />}
            title="Hatırlatmalar"
            subtitle="İlaç ve hazırlık bilgileri"
            onPress={() => router.push('/reminders' as any)}
            testID="edu-reminders-btn"
          />
          <MenuCard
            icon={<MessageCircle size={22} color={Colors.accent} />}
            title="Araştırmacıya Danış"
            subtitle="Sorularınızı iletin"
            onPress={() => router.push('/consultation' as any)}
            testID="edu-consult-btn"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 24,
  },
  topLabel: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.primary,
    letterSpacing: 2,
  },
  appTitleSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500' as const,
  },
  illustrationSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  organContainer: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  organOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  organSegment1: {
    position: 'absolute',
    top: 12,
    left: 20,
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B2DFDB',
    transform: [{ rotate: '-30deg' }],
  },
  organSegment2: {
    position: 'absolute',
    top: 12,
    right: 20,
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B2DFDB',
    transform: [{ rotate: '30deg' }],
  },
  organSegment3: {
    position: 'absolute',
    bottom: 20,
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B2DFDB',
  },
  organCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationLabel: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  illustrationDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 280,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
  },
  infoCardDot: {
    width: 4,
    borderRadius: 2,
    backgroundColor: Colors.primaryLight,
    marginTop: 2,
    minHeight: 40,
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  menuSection: {
    gap: 12,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuCardContent: {
    flex: 1,
  },
  menuCardTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 3,
  },
  menuCardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
