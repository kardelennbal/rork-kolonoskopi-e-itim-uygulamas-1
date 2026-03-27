import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CalendarDays, ChevronDown, Info } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/colors';

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

const DAYS_IN_WEEK = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function DateSelectionScreen() {
  const router = useRouter();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  }, [currentMonth]);

  const handleDateSelect = useCallback((day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (date < today) return;
    setSelectedDate(date);
  }, [currentYear, currentMonth]);

  const handleContinue = useCallback(async () => {
    if (!selectedDate) {
      Alert.alert('Uyarı', 'Lütfen kolonoskopi tarihini seçiniz.');
      return;
    }
    try {
      await AsyncStorage.setItem(
        'colonoscopy_date',
        selectedDate.toISOString()
      );
      router.push('/reminders' as any);
    } catch (e) {
      console.log('Error saving date:', e);
    }
  }, [selectedDate, router]);

  const formatSelectedDate = () => {
    if (!selectedDate) return null;
    return `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  };

  const renderCalendarDays = () => {
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentMonth &&
        selectedDate?.getFullYear() === currentYear;
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      cells.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell,
            isSelected && styles.dayCellSelected,
            isToday && !isSelected && styles.dayCellToday,
          ]}
          onPress={() => handleDateSelect(day)}
          disabled={isPast}
          activeOpacity={0.6}
        >
          <Text
            style={[
              styles.dayText,
              isPast && styles.dayTextPast,
              isSelected && styles.dayTextSelected,
              isToday && !isSelected && styles.dayTextToday,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return cells;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
            testID="date-back-btn"
          >
            <ArrowLeft size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tarih Seçimi</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Info size={16} color={Colors.primary} />
            <Text style={styles.infoText}>
              Kolonoskopi işlem tarihini seçerek hazırlık takvimini
              oluşturabilirsiniz.
            </Text>
          </View>

          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={goToPrevMonth} style={styles.calNavBtn}>
                <ChevronDown
                  size={18}
                  color={Colors.text}
                  style={{ transform: [{ rotate: '90deg' }] }}
                />
              </TouchableOpacity>
              <Text style={styles.calendarMonthText}>
                {MONTHS[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={goToNextMonth} style={styles.calNavBtn}>
                <ChevronDown
                  size={18}
                  color={Colors.text}
                  style={{ transform: [{ rotate: '-90deg' }] }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
              {DAYS_IN_WEEK.map(d => (
                <View key={d} style={styles.weekCell}>
                  <Text style={styles.weekText}>{d}</Text>
                </View>
              ))}
            </View>

            <View style={styles.daysGrid}>{renderCalendarDays()}</View>
          </View>

          {selectedDate && (
            <View style={styles.selectedCard}>
              <CalendarDays size={20} color={Colors.primary} />
              <View style={styles.selectedCardContent}>
                <Text style={styles.selectedCardLabel}>Kolonoskopi Tarihim</Text>
                <Text style={styles.selectedCardDate}>
                  {formatSelectedDate()}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedDate && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={selectedDate ? 0.8 : 1}
            disabled={!selectedDate}
            testID="date-continue-btn"
          >
            <Text
              style={[
                styles.continueButtonText,
                !selectedDate && styles.continueButtonTextDisabled,
              ]}
            >
              DEVAM ET
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#E8F5F2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
  },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 16,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calNavBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  weekText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.textLight,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%' as const,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dayCellSelected: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  dayCellToday: {
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  dayTextPast: {
    color: Colors.gray400,
  },
  dayTextSelected: {
    color: Colors.white,
    fontWeight: '700' as const,
  },
  dayTextToday: {
    color: Colors.primary,
    fontWeight: '700' as const,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    gap: 14,
  },
  selectedCardContent: {
    flex: 1,
  },
  selectedCardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  selectedCardDate: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  footer: {
    paddingVertical: 18,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.gray300,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 1,
  },
  continueButtonTextDisabled: {
    color: Colors.gray500,
  },
});
