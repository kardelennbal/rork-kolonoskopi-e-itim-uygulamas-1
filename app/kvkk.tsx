import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, FileText } from 'lucide-react-native';
import Colors from '@/constants/colors';

const KVKK_TEXT = `KİŞİSEL VERİLERİN KORUNMASI KANUNU HAKKINDA BİLGİLENDİRME

1. Veri Sorumlusu
Bu uygulama kapsamında kişisel verileriniz, akademik araştırma amacıyla işlenmektedir.

2. Kişisel Verilerin İşlenme Amacı
Toplanan veriler yalnızca kolonoskopi öncesi bağırsak hazırlığı eğitimi araştırması kapsamında kullanılacaktır.

3. Kişisel Verilerin Aktarılması
Toplanan veriler üçüncü kişi veya kuruluşlarla paylaşılmayacaktır. Veriler yalnızca araştırma ekibi tarafından erişilebilir olacaktır.

4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
Kişisel verileriniz, bu uygulama aracılığıyla elektronik ortamda, açık rızanıza istinaden toplanmaktadır.

5. Kişisel Veri Sahibinin Hakları
KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse buna ilişkin bilgi talep etme
• İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme
• Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme
• KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme

6. Rıza
Bu uygulamayı kullanarak, yukarıda belirtilen amaçlar doğrultusunda kişisel verilerinizin işlenmesine açık rıza vermektesiniz.

7. İletişim
Kişisel verileriniz ile ilgili her türlü soru ve talepleriniz için araştırma ekibi ile iletişime geçebilirsiniz.

Bu bilgilendirme metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır.`;

export default function KVKKScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
            testID="kvkk-back-btn"
          >
            <ArrowLeft size={20} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleRow}>
            <FileText size={18} color={Colors.primary} />
            <Text style={styles.headerTitle}>KVKK Bilgilendirme</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.textCard}>
            <ScrollView
              style={styles.scrollArea}
              showsVerticalScrollIndicator={true}
              testID="kvkk-scroll"
            >
              <Text style={styles.kvkkText}>{KVKK_TEXT}</Text>
            </ScrollView>
          </View>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setAccepted(!accepted)}
            testID="kvkk-checkbox"
          >
            <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
              {accepted && <Check size={14} color={Colors.white} strokeWidth={3} />}
            </View>
            <Text style={styles.checkboxLabel}>
              Okudum, onaylıyorum.
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !accepted && styles.continueButtonDisabled]}
            onPress={() => {
              if (accepted) {
                router.push('/education' as any);
              }
            }}
            activeOpacity={accepted ? 0.8 : 1}
            disabled={!accepted}
            testID="kvkk-continue-btn"
          >
            <Text
              style={[
                styles.continueButtonText,
                !accepted && styles.continueButtonTextDisabled,
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  textCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  scrollArea: {
    flex: 1,
    padding: 18,
  },
  kvkkText: {
    fontSize: 13,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
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
