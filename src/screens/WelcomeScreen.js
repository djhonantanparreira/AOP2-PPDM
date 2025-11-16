import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../shared/theme';
import { Button } from '../components/Button';

export const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_vector-1730829922408-900a865bcd80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFkb3B0JTIwYSUyMHBldHxlbnwwfHwwfHx8MA%3D%3D",
        }}
        style={styles.illustration}
        resizeMode="contain"
      />  

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Encontre seu{" "}
            <Text style={styles.titleHighlight}>NOVO{"\n"}AMIGO</Text> aqui!
          </Text>

          <Text style={styles.description}>
            Esse aplicativo foi feito para ajudar Maria Clara a encontrar
            doadores para seus pets resgatados.
          </Text>
        </View>

        <Button
          title="Continue"
          onPress={() => navigation.navigate("Main")}
          style={styles.button}
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  illustration: {
    width: '100%',
    height: '45%',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  titleHighlight: {
    color: colors.primary,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    width: '100%',
    maxWidth: 320,
  },
});
