import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../contexts/PetContext';
import { Button } from '../components/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../shared/theme';

export const PetDetailsScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { getPetById, toggleFavorite } = usePets();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    loadPetDetails();
  }, [petId]);

  const loadPetDetails = async () => {
    const petData = await getPetById(petId);
    setPet(petData);
    setLoading(false);
  };

  const handleFavorite = async () => {
    await toggleFavorite(petId);
    await loadPetDetails();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Pet não encontrado</Text>
      </View>
    );
  }

  const truncatedDescription = pet.descricao.length > 150
    ? pet.descricao.substring(0, 150) + '...'
    : pet.descricao;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.imagem }} style={styles.image} resizeMode="cover" />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{pet.nome}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavorite}
            >
              <Ionicons
                name={pet.favorito ? 'heart' : 'heart-outline'}
                size={28}
                color={pet.favorito ? colors.heart : colors.text}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tags}>
            <View style={[styles.tag, styles.tagOutline]}>
              <Text style={styles.tagText}>{pet.sexo}</Text>
              <Text style={styles.tagLabel}>Sexo</Text>
            </View>
            <View style={[styles.tag, styles.tagOutline]}>
              <Text style={styles.tagText}>{pet.idade}</Text>
              <Text style={styles.tagLabel}>Idade</Text>
            </View>
            <View style={[styles.tag, styles.tagOutline]}>
              <Text style={styles.tagText}>{pet.porte}</Text>
              <Text style={styles.tagLabel}>Porte</Text>
            </View>
          </View>

          {pet.dono && (
            <View style={styles.ownerSection}>
              <Image
                source={{ uri: pet.dono.avatar }}
                style={styles.ownerAvatar}
              />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{pet.dono.nome}</Text>
                <Text style={styles.ownerDescription}>{pet.dono.descricao}</Text>
              </View>
              <View style={styles.contactIcons}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('AdoptionForm', { petId: pet.id, petName: pet.nome })}
                >
                  <Ionicons name="chatbubble-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('AdoptionForm', { petId: pet.id, petName: pet.nome })}
                >
                  <Ionicons name="call-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.descriptionSection}>
            <Text style={styles.description}>
              {showFullDescription ? pet.descricao : truncatedDescription}
            </Text>
            {pet.descricao.length > 150 && (
              <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                <Text style={styles.seeMore}>
                  {showFullDescription ? 'Ver menos' : 'Ver mais...'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Enviar formulário!"
          onPress={() =>
            navigation.navigate('AdoptionForm', {
              petId: pet.id,
              petName: pet.nome,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: colors.primaryLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.round,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  content: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  tag: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  tagOutline: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text,
  },
  tagLabel: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ownerAvatar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    marginRight: spacing.md,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  ownerDescription: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  contactIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  descriptionSection: {
    marginTop: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  seeMore: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
    marginTop: spacing.sm,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.large,
  },
  errorText: {
    fontSize: fontSize.md,
    color: colors.error,
  },
});
