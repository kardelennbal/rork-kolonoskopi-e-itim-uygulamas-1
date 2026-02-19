import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, Activity, ShieldCheck } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Activity size={14} color={Colors.white} />
            <Text style={styles.badgeText}>Sağlık Eğitim Uygulaması</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationOuter}>
              <View style={styles.illustrationInner}>
                <Smartphone size={64} color={Colors.primary} strokeWidth={1.5} />
              </View>
            </View>
            <View style={styles.decorDot1} />
            <View style={styles.decorDot2} />
            <View style={styles.decorDot3} />
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.appName}>KOLONOSKOPİ</Text>
            <Text style={styles.appSubtitle}>Bağırsak Hazırlığı Rehberi</Text>
          </View>

          <View style={styles.descriptionCard}>
            <View style={styles.descriptionIconRow}>
              <ShieldCheck size={20} color={Colors.primary} />
            </View>
            <Text style={styles.description}>
              Bu uygulama, kolonoskopi öncesi bağırsak temizliği işlemlerinde size
              yardımcı olacaktır. İşlem öncesi yapmanız gerekenleri adım adım
              öğrenebilirsiniz.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.push('/kvkk' as any)}
            activeOpacity={0.8}
            testID="welcome-continue-btn"
          >
            <Text style={styles.continueButtonText}>DEVAM ET</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Akademik araştırma amaçlı geliştirilmiştir.
          </Text>
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
    alignItems: 'center',
    paddingTop: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  illustrationOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  illustrationInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorDot1: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryLight,
    opacity: 0.5,
  },
  decorDot2: {
    position: 'absolute',
    bottom: 20,
    left: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    opacity: 0.4,
  },
  decorDot3: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryLight,
    opacity: 0.6,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  appSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
  },
  descriptionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  descriptionIconRow: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  footer: {
    paddingBottom: 16,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 1,
  },
  footerNote: {
    marginTop: 12,
    fontSize: 11,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
});
