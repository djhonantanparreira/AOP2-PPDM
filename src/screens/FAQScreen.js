import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAQService } from '../data/services/FAQService';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../shared/theme';

export const FAQScreen = ({ navigation }) => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      searchFAQs(searchQuery);
    }
  }, [searchQuery, faqs]);

  const loadFAQs = async () => {
    try {
      const data = await FAQService.getAllFAQs();
      setFaqs(data);
      setFilteredFaqs(data);
    } catch (error) {
      console.error('Erro ao carregar FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchFAQs = async (query) => {
    try {
      const data = await FAQService.searchFAQs(query);
      setFilteredFaqs(data);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
    }
  };

  const toggleFAQ = (id) => {
    setFilteredFaqs((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, expandido: !faq.expandido } : faq
      )
    );
  };

  const renderFAQItem = (faq) => {
    const isExpanded = faq.expandido;
    const isFirstItem = faq.id === '1';

    return (
      <View key={faq.id} style={styles.faqItem}>
        <TouchableOpacity
          style={[
            styles.faqQuestion,
            isFirstItem && isExpanded && styles.faqQuestionExpandedFirst,
          ]}
          onPress={() => toggleFAQ(faq.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.questionText,
              isFirstItem && isExpanded && styles.questionTextExpanded,
            ]}
          >
            {faq.pergunta}
          </Text>
          <Ionicons
            name={isExpanded ? 'remove' : 'add'}
            size={24}
            color={isFirstItem && isExpanded ? colors.white : colors.text}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View
            style={[
              styles.faqAnswer,
              isFirstItem && styles.faqAnswerFirst,
            ]}
          >
            <Text
              style={[
                styles.answerText,
                isFirstItem && styles.answerTextFirst,
              ]}
            >
              {faq.resposta}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textGray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Procure sua solução!"
          placeholderTextColor={colors.textGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(renderFAQItem)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma pergunta encontrada</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
    backgroundColor: colors.white,
  },
  backButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    margin: spacing.md,
    height: 50,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  faqItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.small,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  faqQuestionExpandedFirst: {
    backgroundColor: colors.cardBackground,
  },
  questionText: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text,
    marginRight: spacing.sm,
  },
  questionTextExpanded: {
    color: colors.text,
  },
  faqAnswer: {
    padding: spacing.md,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  faqAnswerFirst: {
    backgroundColor: colors.cardBackground,
  },
  answerText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    lineHeight: 22,
  },
  answerTextFirst: {
    color: colors.text,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },
});
