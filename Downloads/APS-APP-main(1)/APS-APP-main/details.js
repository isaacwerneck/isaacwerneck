import { StyleSheet } from "react-native";

export const colors = {
  bg: "#0F172A",
  card: "#1E293B",
  cardActive: "#1E3A5F",
  gold: "#C9A227",
  textPrimary: "#fff",
  textSecondary: "#94A3B8",
  placeholder: "#475569",
  dark: "#334155",
};

export const styles = StyleSheet.create({

  // ===== GERAL =====
  screenCenter: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // ===== ÍCONE TESOURA =====
  iconCircle: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 50,
    marginBottom: 16,
  },

  // ===== LOGIN / CADASTRO =====
  welcomeText: {
    color: colors.textPrimary,
    fontSize: 28,
    marginBottom: 30,
  },
  input: {
    backgroundColor: colors.card,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  inputSmall: {
    backgroundColor: colors.card,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    color: colors.textPrimary,
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    padding: 15,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  linkRow: {
    marginTop: 8,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  linkHighlight: {
    color: colors.gold,
    fontWeight: "bold",
  },

  // ===== CHECKBOX TIPO =====
  checkboxLabel: {
    color: colors.textSecondary,
    marginBottom: 12,
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: "row",
    gap: 12,
  },
  checkboxCard: (active) => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: active ? colors.cardActive : colors.card,
    borderWidth: 2,
    borderColor: active ? colors.gold : "transparent",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  }),
  checkboxBox: (active) => ({
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: active ? colors.gold : "transparent",
    alignItems: "center",
    justifyContent: "center",
  }),
  checkboxCheck: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxTitle: {
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  checkboxSub: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  // ===== HOME =====
  homeHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  homeIconCircle: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  homeTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "bold",
  },
  homeHighlight: {
    color: colors.gold,
  },
  homeTipo: {
    color: colors.gold,
    marginTop: 5,
  },
  homeSubtitle: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },

  // ===== CARD =====
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  cardImagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImagePlaceholderText: {
    color: colors.placeholder,
    fontSize: 12,
    marginTop: 6,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  cardDurationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  cardDurationText: {
    color: colors.textSecondary,
    marginLeft: 4,
  },
  cardPriceLabel: {
    color: colors.textSecondary,
    marginTop: 10,
    fontSize: 12,
  },
  cardPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  cardPrice: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardArrowButton: {
    backgroundColor: colors.gold,
    padding: 10,
    borderRadius: 10,
  },

  // ===== AGENDAMENTO =====
  agendamentoTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  agendamentoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  agendamentoService: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  agendamentoInfo: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  agendamentoDayTitle: {
    color: colors.gold,
    fontSize: 18,
    marginBottom: 8,
  },
  agendamentoTimeButton: (active) => ({
    backgroundColor: active ? colors.gold : colors.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  }),
  agendamentoTimeText: (active) => ({
    color: active ? "#000" : colors.textPrimary,
  }),
  agendamentoConfirmButton: (active) => ({
    backgroundColor: active ? colors.gold : colors.dark,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  }),
  agendamentoConfirmText: (active) => ({
    color: active ? "#000" : colors.textSecondary,
    fontWeight: "bold",
  }),

  // ===== BARBEIRO HOME =====
  barberEmpty: {
    alignItems: "center",
    marginTop: 60,
    gap: 12,
  },
  barberEmptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 8,
  },
  barberCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  barberCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  barberTrashButton: {
    marginLeft: "auto",
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#2d1a1a",
  },
  barberCardCliente: {
    color: colors.gold,
    fontWeight: "bold",
    fontSize: 15,
  },
  barberCardService: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  barberCardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  barberCardInfo: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
