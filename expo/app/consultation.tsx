import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Home, MessageSquare } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function ConsultationScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Uyarı', 'Lütfen konu ve mesaj alanlarını doldurunuz.');
      return;
    }
    Alert.alert(
      'Gönderildi',
      'Mesajınız araştırmacıya iletilmiştir. En kısa sürede dönüş yapılacaktır.',
      [{ text: 'Tamam', onPress: () => router.push('/education' as any) }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
            testID="consult-back-btn"
          >
            <ArrowLeft size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Danışma</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <View style={styles.titleIconBg}>
              <MessageSquare size={24} color={Colors.accent} />
            </View>
            <Text style={styles.title}>Araştırmacıya Danışabilirsiniz</Text>
            <Text style={styles.subtitle}>
              Kolonoskopi hazırlığı ile ilgili sorularınızı aşağıdaki form
              aracılığıyla iletebilirsiniz.
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>Konu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Mesajınızın konusunu yazınız"
              placeholderTextColor={Colors.textLight}
              value={subject}
              onChangeText={setSubject}
              testID="consult-subject-input"
            />

            <Text style={styles.inputLabel}>Mesajınız</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Sorunuzu veya mesajınızı detaylı olarak yazınız..."
              placeholderTextColor={Colors.textLight}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              testID="consult-message-input"
            />
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              activeOpacity={0.8}
              testID="consult-send-btn"
            >
              <Send size={16} color={Colors.white} />
              <Text style={styles.sendButtonText}>GÖNDER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push('/education' as any)}
              activeOpacity={0.8}
              testID="consult-home-btn"
            >
              <Home size={16} color={Colors.textSecondary} />
              <Text style={styles.homeButtonText}>ANA SAYFA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
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
    paddingBottom: 32,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  titleIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F0EBF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 300,
  },
  formSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
    marginLeft: 2,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: Colors.text,
    marginBottom: 18,
  },
  textArea: {
    minHeight: 140,
    paddingTop: 14,
  },
  buttonsRow: {
    gap: 12,
  },
  sendButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700' as const,
    letterSpacing: 0.8,
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
