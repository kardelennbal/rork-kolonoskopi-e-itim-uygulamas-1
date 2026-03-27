import React, { useEffect, useState } from 'react';
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
  ArrowLeft,
  CalendarDays,
  Pill,
  Clock,
  AlertCircle,
  Home,
  CheckCircle,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/colors';

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

interface ReminderItem {
  id: string;
  title: string;
  description: string;
  daysBefore: number;
  icon: 'pill' | 'clock' | 'alert';
}

const REMINDERS: ReminderItem[] = [
  {
    id: '1',
    title: 'Diyet Değişikliği',
    description:
      'Posalı gıdalar, çekirdekli meyveler, kırmızı et ve kuruyemiş tüketimini bırakın. Açık renkli, kolay sindirilen gıdalar tercih edin.',
    daysBefore: 3,
    icon: 'alert',
  },
  {
    id: '2',
    title: 'İlaç Kullanımı',
    description:
      'Kan sulandırıcı ilaçların (aspirin, coumadin vb.) kullanımı hakkında doktorunuza danışın.',
    daysBefore: 3,
    icon: 'pill',
  },
  {
    id: '3',
    title: 'Sıvı Diyet',
    description:
      'Sadece berrak sıvılar (su, berrak et suyu, elma suyu) tüketin. Katı gıda yemeyin.',
    daysBefore: 1,
    icon: 'clock',
  },
  {
    id: '4',
    title: 'Bağırsak Temizleme İlacı (1. Doz)',
    description:
      'Doktorunuzun önerdiği bağırsak temizleme solüsyonunun ilk dozunu akşam saatlerinde içmeye başlayın. Bol su tüketin.',
    daysBefore: 1,
    icon: 'pill',
  },
  {
    id: '5',
    title: 'Bağırsak Temizleme İlacı (2. Doz)',
    description:
      'İşlem günü sabahı ikinci doz bağırsak temizleme solüsyonunu içiniz. İşlemden 2-3 saat önce tamamlayınız.',
    daysBefore: 0,
    icon: 'pill',
  },
  {
    id: '6',
    title: 'İşlem Günü',
    description:
      'İşlemden en az 2 saat önce sıvı almayı bırakın. Rahat kıyafetler giyin. Yanınızda bir refakatçi bulundurun.',
    daysBefore: 0,
    icon: 'clock',
  },
];

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getIconComponent(icon: string, size: number) {
  switch (icon) {
    case 'pill':
      return <Pill size={size} color={Colors.accent} />;
    case 'clock':
      return <Clock size={size} color={Colors.primary} />;
    case 'alert':
      return <AlertCircle size={size} color={Colors.warning} />;
    default:
      return <Clock size={size} color={Colors.primary} />;
  }
}

function getIconBg(icon: string): string {
  switch (icon) {
    case 'pill':
      return '#F0EBF8';
    case 'clock':
      return '#E8F5F2';
    case 'alert':
      return '#FFF8E1';
    default:
      return '#E8F5F2';
  }
}

export default function RemindersScreen() {
  const router = useRouter();
  const [colonoscopyDate, setColonoscopyDate] = useState<Date | null>(null);

  useEffect(() => {
    const loadDate = async () => {
      try {
        const stored = await AsyncStorage.getItem('colonoscopy_date');
        if (stored) {
          setColonoscopyDate(new Date(stored));
        }
      } catch (e) {
        console.log('Error loading date:', e);
      }
    };
    loadDate();
  }, []);

  const getDayLabel = (daysBefore: number) => {
    if (daysBefore === 0) return 'İşlem Günü';
    return `İşlemden ${daysBefore} gün önce`;
  };

  const getReminderDate = (daysBefore: number) => {
    if (!colonoscopyDate) return '';
    const date = addDays(colonoscopyDate, -daysBefore);
    return formatDate(date);
  };

  const groupedReminders = REMINDERS.reduce<Record<number, ReminderItem[]>>(
    (acc, item) => {
      if (!acc[item.daysBefore]) {
        acc[item.daysBefore] = [];
      }
      acc[item.daysBefore].push(item);
      return acc;
    },
    {}
  );

  const sortedGroups = Object.keys(groupedReminders)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          testID="reminders-back-btn"
        >
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hatırlatmalar</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {colonoscopyDate && (
          <View style={styles.dateCard}>
            <View style={styles.dateCardIcon}>
              <CalendarDays size={22} color={Colors.primary} />
            </View>
            <View style={styles.dateCardContent}>
              <Text style={styles.dateCardLabel}>Kolonoskopi Tarihi</Text>
              <Text style={styles.dateCardValue}>
                {formatDate(colonoscopyDate)}
              </Text>
            </View>
            <CheckCircle size={20} color={Colors.success} />
          </View>
        )}

        {!colonoscopyDate && (
          <View style={styles.noDateCard}>
            <AlertCircle size={20} color={Colors.warning} />
            <Text style={styles.noDateText}>
              Henüz tarih seçilmedi. Lütfen önce kolonoskopi tarihini belirleyin.
            </Text>
            <TouchableOpacity
              style={styles.selectDateBtn}
              onPress={() => router.push('/date-selection' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.selectDateBtnText}>Tarih Seç</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.medicationsSection}>
          <Text style={styles.sectionTitle}>Kullanılacak İlaçlar</Text>
          <View style={styles.medicationCard}>
            <View style={styles.medicationRow}>
              <View style={[styles.medIcon, { backgroundColor: '#F0EBF8' }]}>
                <Pill size={16} color={Colors.accent} />
              </View>
              <View style={styles.medContent}>
                <Text style={styles.medName}>
                  Bağırsak Temizleme Solüsyonu
                </Text>
                <Text style={styles.medDesc}>
                  Doktorunuzun reçete ettiği preparatı kullanınız
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.medicationRow}>
              <View style={[styles.medIcon, { backgroundColor: '#E8F5F2' }]}>
                <Pill size={16} color={Colors.primary} />
              </View>
              <View style={styles.medContent}>
                <Text style={styles.medName}>Simethicone (Gerekirse)</Text>
                <Text style={styles.medDesc}>
                  Gaz giderici olarak doktor önerisi ile
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Hazırlık Takvimi</Text>

          {sortedGroups.map((daysBefore, groupIdx) => (
            <View key={daysBefore} style={styles.timelineGroup}>
              <View style={styles.timelineHeader}>
                <View style={styles.timelineBadge}>
                  <Text style={styles.timelineBadgeText}>
                    {getDayLabel(daysBefore)}
                  </Text>
                </View>
                {colonoscopyDate && (
                  <Text style={styles.timelineDateText}>
                    {getReminderDate(daysBefore)}
                  </Text>
                )}
              </View>

              {groupedReminders[daysBefore].map((item, idx) => (
                <View key={item.id} style={styles.reminderCard}>
                  <View
                    style={[
                      styles.reminderIcon,
                      { backgroundColor: getIconBg(item.icon) },
                    ]}
                  >
                    {getIconComponent(item.icon, 18)}
                  </View>
                  <View style={styles.reminderContent}>
                    <Text style={styles.reminderTitle}>{item.title}</Text>
                    <Text style={styles.reminderDesc}>{item.description}</Text>
                  </View>
                </View>
              ))}

              {groupIdx < sortedGroups.length - 1 && (
                <View style={styles.timelineConnector} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/education' as any)}
          activeOpacity={0.8}
          testID="reminders-home-btn"
        >
          <Home size={16} color={Colors.textSecondary} />
          <Text style={styles.homeButtonText}>ANA SAYFA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    marginBottom: 20,
    gap: 14,
  },
  dateCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCardContent: {
    flex: 1,
  },
  dateCardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  dateCardValue: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  noDateCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  noDateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  selectDateBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectDateBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600' as const,
  },
  medicationsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  medicationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  medIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medContent: {
    flex: 1,
  },
  medName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  medDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 14,
  },
  timelineSection: {
    marginBottom: 8,
  },
  timelineGroup: {
    marginBottom: 8,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timelineBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  timelineBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  timelineDateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
  },
  reminderIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  reminderDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  timelineConnector: {
    width: 2,
    height: 16,
    backgroundColor: Colors.gray300,
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  homeButton: {
    backgroundColor: Colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  homeButtonText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.8,
  },
});
