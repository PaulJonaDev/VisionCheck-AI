import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './components/PrimaryButton';
import { colors, spacing } from './theme';

type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: String(error?.message || 'Error de render') };
  }

  componentDidCatch(error: any) {
    this.setState({ message: String(error?.message || 'Error de render') });
  }

  reset = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (this.state.hasError) {
      const isTextError = (this.state.message || '').includes('text');
      return (
        <View style={styles.wrap}>
          <Text style={styles.title}>Se produjo un error al renderizar</Text>
          {isTextError ? (
            <Text style={styles.msg}>Asegúrate de que los textos estén dentro de componentes Text.</Text>
          ) : (
            <Text style={styles.msg}>{this.state.message}</Text>
          )}
          <PrimaryButton title="Reintentar" onPress={this.reset} />
        </View>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, padding: spacing.lg },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: spacing.sm },
  msg: { color: colors.textDim, fontSize: 14, textAlign: 'center', marginBottom: spacing.md },
});