import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../contexts/PetContext';
import { PetCard } from '../components/PetCard';
import { FilterPicker } from '../components/FilterPicker';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../shared/theme';

export const HomeScreen = ({ navigation }) => {
  const { filteredPets, loading, filters, updateFilters, toggleFavorite } = usePets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    updateFilters({ query: text });
  };

  const sexoOptions = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Macho', value: 'Macho' },
    { label: 'Fêmea', value: 'Fêmea' },
  ];

  const idadeOptions = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Filhote', value: 'Filhote' },
    { label: 'Adulto', value: 'Adulto' },
  ];

  const porteOptions = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Pequeno', value: 'Pequeno' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Grande', value: 'Grande' },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise por tamanho, sexo ou idade!"
          placeholderTextColor={colors.textGray}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <FilterPicker
          label="Sexo"
          selectedValue={filters.sexo}
          onValueChange={(value) => updateFilters({ sexo: value })}
          items={sexoOptions}
        />
        <View style={styles.filterSpacer} />
        <FilterPicker
          label="Idade"
          selectedValue={filters.idade}
          onValueChange={(value) => updateFilters({ idade: value })}
          items={idadeOptions}
        />
        <View style={styles.filterSpacer} />
        <FilterPicker
          label="Porte"
          selectedValue={filters.porte}
          onValueChange={(value) => updateFilters({ porte: value })}
          items={porteOptions}
        />
      </View>
    </View>
  );

  const renderPetCard = ({ item }) => (
    <PetCard
      pet={item}
      onPress={() => navigation.navigate('PetDetails', { petId: item.id })}
      onFavoritePress={toggleFavorite}
    />
  );

  if (loading && filteredPets.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPets}
        renderItem={renderPetCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum pet encontrado</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    height: 50,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  filterSpacer: {
    width: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.lg,
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
