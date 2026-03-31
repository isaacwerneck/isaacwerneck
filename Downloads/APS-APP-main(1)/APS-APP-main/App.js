import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "./details";
import { loginUser, registerUser, addAgendamento, getAllAgendamentos, cancelAgendamento } from "./database";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: "Criar Conta" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BarbeiroHome" component={BarbeiroHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

////////////////////////////////////////////////////////
/* ================= LOGIN ================= */
////////////////////////////////////////////////////////

function LoginScreen({ navigation }) {
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleLogin = async () => {
    const result = await loginUser(nome, senha);
    if (!result.success) { alert(result.message); return; }
    const dest = result.user.tipo === "barbeiro" ? "BarbeiroHome" : "Home";
    navigation.navigate(dest, { user: result.user });
  };

  return (
    <View style={styles.screenCenter}>
      <View style={styles.iconCircle}>
        <Ionicons name="cut-outline" size={36} color={colors.gold} />
      </View>

      <Text style={styles.welcomeText}>Bem-vindo 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={colors.textSecondary}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.linkText}>
          Não tem conta?{" "}
          <Text style={styles.linkHighlight}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= CADASTRO ================= */
////////////////////////////////////////////////////////

function CadastroScreen({ navigation }) {
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [tipo, setTipo] = React.useState("cliente");

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) { alert("As senhas não coincidem!"); return; }
    const result = await registerUser({ nome, senha, tipo });
    if (!result.success) { alert(result.message); return; }
    alert(`Cadastro realizado como ${tipo === "barbeiro" ? "Barbeiro ✂️" : "Cliente 👤"}!`);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.screenCenter}>
      <View style={styles.iconCircle}>
        <Ionicons name="cut-outline" size={36} color={colors.gold} />
      </View>

      <Text style={styles.welcomeText}>Criar Conta ✂️</Text>

      <TextInput style={styles.inputSmall} placeholder="Digite seu nome" placeholderTextColor={colors.textSecondary} value={nome} onChangeText={setNome} />
      <TextInput style={styles.inputSmall} placeholder="Digite sua senha" placeholderTextColor={colors.textSecondary} secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.inputSmall} placeholder="Confirme sua senha" placeholderTextColor={colors.textSecondary} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <View style={{ width: "100%", marginBottom: 25 }}>
        <Text style={styles.checkboxLabel}>Cadastrar como:</Text>

        <View style={styles.checkboxRow}>
          {["cliente", "barbeiro"].map((t) => (
            <TouchableOpacity key={t} onPress={() => setTipo(t)} style={styles.checkboxCard(tipo === t)}>
              <View style={styles.checkboxBox(tipo === t)}>
                {tipo === t && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <View>
                <Text style={styles.checkboxTitle}>{t === "cliente" ? "👤 Cliente" : "✂️ Barbeiro"}</Text>
                <Text style={styles.checkboxSub}>{t === "cliente" ? "Agendar serviços" : "Gerenciar agenda"}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleCadastro}>
        <Text style={styles.primaryButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Já tem conta?{" "}
          <Text style={styles.linkHighlight}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= HOME ================= */
////////////////////////////////////////////////////////

function HomeScreen({ navigation, route }) {
  const user = route?.params?.user;
  const tipo = user?.tipo;

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeHeader}>
        <View style={styles.homeIconCircle}>
          <Ionicons name="cut-outline" size={28} color={colors.textPrimary} />
        </View>
        <Text style={styles.homeTitle}>
          Barbearia <Text style={styles.homeHighlight}>Premium</Text>
        </Text>
        <Text style={styles.homeTipo}>{tipo === "barbeiro" ? "Modo Barbeiro" : "Modo Cliente"}</Text>
        <Text style={styles.homeSubtitle}>
          Experiência de barbearia de alta qualidade. Escolha seu serviço e agende um horário.
        </Text>
      </View>

      <ServiceCard navigation={navigation} user={user} service="Barba Completa" description="Design de barba, aparação e hidratação" price="R$ 35,00" duration="25 minutos" image="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800" />
      <ServiceCard navigation={navigation} user={user} service="Corte Infantil" description="Corte especial para crianças" price="R$ 35,00" duration="25 minutos" image="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800" />
      <ServiceCard navigation={navigation} user={user} service="Corte Clássico" description="Corte tradicional com máquina e tesoura" price="R$ 45,00" duration="30 minutos" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800" />
    </ScrollView>
  );
}

////////////////////////////////////////////////////////
/* ================= BARBEIRO HOME ================= */
////////////////////////////////////////////////////////

function BarbeiroHomeScreen({ route }) {
  const user = route?.params?.user;
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      const all = await getAllAgendamentos();
      setAgendamentos(all);
      setLoading(false);
    };
    load();
  }, []);

  const handleCancel = async (ag) => {
    await cancelAgendamento(ag.cliente, ag.id);
    setAgendamentos((prev) => prev.filter((a) => a.id !== ag.id));
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeHeader}>
        <View style={styles.homeIconCircle}>
          <Ionicons name="cut-outline" size={28} color={colors.textPrimary} />
        </View>
        <Text style={styles.homeTitle}>
          Olá, <Text style={styles.homeHighlight}>{user?.nome} ✂️</Text>
        </Text>
        <Text style={styles.homeTipo}>Modo Barbeiro</Text>
        <Text style={styles.homeSubtitle}>Todos os agendamentos dos clientes aparecem aqui.</Text>
      </View>

      {loading && (
        <Text style={{ color: colors.textSecondary, textAlign: "center", marginTop: 20 }}>
          Carregando agendamentos...
        </Text>
      )}

      {!loading && agendamentos.length === 0 && (
        <View style={styles.barberEmpty}>
          <Ionicons name="calendar-outline" size={48} color={colors.placeholder} />
          <Text style={styles.barberEmptyText}>Nenhum agendamento ainda.</Text>
        </View>
      )}

      {agendamentos.map((ag) => (
        <View key={ag.id} style={styles.barberCard}>
          <View style={styles.barberCardHeader}>
            <Ionicons name="person-circle-outline" size={22} color={colors.gold} />
            <Text style={styles.barberCardCliente}>{ag.cliente}</Text>
            <TouchableOpacity
              onPress={() => handleCancel(ag)}
              style={styles.barberTrashButton}
            >
              <Ionicons name="trash-outline" size={18} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
          <Text style={styles.barberCardService}>{ag.service}</Text>
          <View style={styles.barberCardRow}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.barberCardInfo}> {ag.time}</Text>
          </View>
          <View style={styles.barberCardRow}>
            <Ionicons name="cut-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.barberCardInfo}> {ag.duration}</Text>
          </View>
          <View style={styles.barberCardRow}>
            <Ionicons name="cash-outline" size={14} color={colors.gold} />
            <Text style={[styles.barberCardInfo, { color: colors.gold }]}> {ag.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

////////////////////////////////////////////////////////
/* ================= CARD ================= */
////////////////////////////////////////////////////////

function ServiceCard({ navigation, user, service, description, price, duration, image }) {
  return (
    <View style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
      ) : (
        <View style={styles.cardImagePlaceholder}>
          <Ionicons name="image-outline" size={40} color={colors.placeholder} />
          <Text style={styles.cardImagePlaceholderText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{service}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        <View style={styles.cardDurationRow}>
          <Ionicons name="time-outline" size={16} color={colors.gold} />
          <Text style={styles.cardDurationText}>{duration}</Text>
        </View>

        <Text style={styles.cardPriceLabel}>A partir de</Text>

        <View style={styles.cardPriceRow}>
          <Text style={styles.cardPrice}>{price}</Text>
            <TouchableOpacity style={styles.cardArrowButton} onPress={() => navigation.navigate("Agendamento", { service, price, duration, user })}>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= AGENDAMENTO ================= */
////////////////////////////////////////////////////////

function AgendamentoScreen({ route }) {
  const { service, price, duration, user } = route.params;
  const [selectedTime, setSelectedTime] = React.useState(null);

  const schedule = {
    "Segunda-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Terça-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Quarta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Quinta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Sexta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Sábado": ["14:00", "14:30", "15:00", "15:30"],
    "Domingo": ["14:00", "14:30", "15:00"],
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.agendamentoTitle}>Agendamento</Text>

      <View style={styles.agendamentoCard}>
        <Text style={styles.agendamentoService}>{service}</Text>
        <Text style={styles.agendamentoInfo}>⏱ {duration}</Text>
        <Text style={styles.agendamentoInfo}>💰 {price}</Text>
      </View>

      {Object.keys(schedule).map((day) => (
        <View key={day} style={{ marginBottom: 20 }}>
          <Text style={styles.agendamentoDayTitle}>{day}</Text>

          {schedule[day].map((time) => {
            const fullTime = `${day} ${time}`;
            return (
              <TouchableOpacity
                key={fullTime}
                onPress={() => setSelectedTime(fullTime)}
                style={styles.agendamentoTimeButton(selectedTime === fullTime)}
              >
                <Text style={styles.agendamentoTimeText(selectedTime === fullTime)}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={styles.agendamentoConfirmButton(!!selectedTime)}
        onPress={async () => {
          if (selectedTime) {
            await addAgendamento(user.nome, {
              id: Date.now(),
              service,
              price,
              duration,
              time: selectedTime,
            });
            alert("Agendamento confirmado!");
            setSelectedTime(null);
          }
        }}
      >
        <Text style={styles.agendamentoConfirmText(!!selectedTime)}>
          {selectedTime ? `Confirmar ${selectedTime}` : "Selecione um horário"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
