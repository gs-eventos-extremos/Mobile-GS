# Weather Emergency App 🌦️🚨

Um aplicativo móvel desenvolvido em React Native para monitoramento climático e gestão de emergências, fornecendo informações meteorológicas em tempo real, alertas de desastres naturais e recursos de segurança.

## 📱 Visão Geral

O Weather Emergency App é uma solução completa para ajudar usuários a se manterem informados sobre condições climáticas e se prepararem para situações de emergência. O aplicativo combina previsão do tempo, guias de segurança, mapeamento de recursos emergenciais e sistema de contatos de emergência.

## 🚀 Funcionalidades Principais

### 1. **Sistema de Autenticação** 🔐
- **Cadastro de usuários** com validação de dados
- **Login seguro** com token JWT
- **Logout** com limpeza de dados locais
- **Persistência de sessão** entre reinicializações do app
- **Validação de senha** (mínimo 6 caracteres, maiúscula, minúscula e número)

### 2. **Monitoramento Climático** ☁️
- **Clima atual** baseado na localização do usuário
- **Previsão estendida** para os próximos 6 dias
- **Detalhes meteorológicos**: temperatura, sensação térmica, umidade
- **Múltiplas localizações**: adicione e monitore diferentes cidades
- **Atualização em tempo real** com pull-to-refresh
- **Seletor de localização** para alternar entre lugares salvos

### 3. **Alertas e Riscos Ambientais** ⚠️
- **Identificação automática de riscos** baseada nas condições climáticas:
  - Alagamento (umidade > 85%)
  - Chuva forte (umidade > 80%)
  - Calor extremo (temperatura > 35°C)
  - Seca (umidade < 30% e temperatura > 30°C)
  - Frio intenso (temperatura < 10°C)
- **Níveis de alerta**: baixo, moderado, alto, crítico
- **Visualização por ícones** coloridos conforme severidade

### 4. **Guias de Emergência** 📚
Instruções detalhadas para diferentes tipos de desastres:
- **Alagamento**: como agir durante inundações
- **Deslizamento**: sinais de alerta e procedimentos de evacuação
- **Queimada**: proteção contra incêndios florestais
- **Seca**: economia de água e cuidados com a saúde
- **Avalanche**: segurança em regiões montanhosas
- **Tornado**: procedimentos de abrigo e proteção

### 5. **Mapa de Recursos** 🗺️
- **Localização em tempo real** do usuário
- **Hospitais próximos** com marcadores vermelhos
- **Abrigos de emergência** com marcadores verdes
- **Cálculo de rotas** até os pontos de interesse
- **Filtros visuais** para mostrar/ocultar hospitais ou abrigos
- **Centralização rápida** na posição atual
- **Integração com Google Maps** para navegação precisa

### 6. **Contatos de Emergência** 📞
- **Contatos padrão do sistema**:
  - Defesa Civil (199)
  - Bombeiros (193)
  - SAMU (192)
  - Polícia Militar (190)
  - CGE - Central de Gestão de Emergências (181)
  - Companhia de Energia Elétrica
  - Concessionária de água/esgoto (195)
- **Contatos pessoais personalizados**:
  - Adicionar familiares e amigos
  - Definir relacionamento (pai, mãe, irmão, etc.)
  - Marcar contato principal
  - Ligação direta pelo app
  - Edição e exclusão de contatos

### 7. **Perfil e Configurações** 👤
- **Dados do usuário**: visualização de informações pessoais
- **Gerenciamento de localizações**:
  - Adicionar novas localizações por endereço
  - Marcar locais favoritos
  - Editar e excluir localizações
- **Política de privacidade**
- **Exclusão de conta**
- **Logout seguro**

## 🛠️ Tecnologias Utilizadas

### Frontend (React Native)
- **React Native** (v0.79.2) - Framework principal
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Expo** (v53.0.9) - Plataforma de desenvolvimento
- **React Native Maps** - Integração com mapas
- **Expo Location** - Serviços de geolocalização
- **AsyncStorage** - Armazenamento local

### Backend (.NET API)
- **ASP.NET Core 8.0** - Framework web
- **Entity Framework Core** - ORM
- **Oracle Database** - Banco de dados
- **JWT Authentication** - Autenticação segura
- **AutoMapper** - Mapeamento de objetos
- **BCrypt.Net** - Hash de senhas
- **Swagger/OpenAPI** - Documentação da API
- **RabbitMQ/MassTransit** - Sistema de mensageria
- **ML.NET** - Machine Learning para predições
- **AspNetCoreRateLimit** - Controle de taxa de requisições

### Integrações Externas
- **OpenWeatherMap API** - Dados meteorológicos em tempo real
- **Google Maps API** - Serviços de mapa e rotas
- **Google Places API** - Busca de hospitais e abrigos
- **Google Geocoding API** - Conversão de endereços em coordenadas

### Arquitetura
- **Frontend**: Context API para estado global, serviços modulares, componentes reutilizáveis
- **Backend**: Arquitetura em camadas (Controllers, Services, Repositories), padrão Repository, HATEOAS
- **Comunicação**: RESTful API com JSON, autenticação JWT Bearer
- **Mensageria**: Eventos assíncronos com RabbitMQ
- **ML**: Predição de riscos com modelos treinados

## 📂 Estrutura do Projeto

```
WeatherEmergencyApp/
├── assets/                    # Imagens e ícones
├── components/               # Componentes reutilizáveis
│   └── CustomBottomTabNavigation.tsx
├── navigation/               # Configuração de navegação
│   └── BottomTabNavigator.tsx
├── screens/                  # Telas do aplicativo
│   ├── Cadastro/
│   ├── CadastroConcluido/
│   ├── Clima/
│   ├── Dados/
│   ├── Emergencia/
│   ├── Guia/
│   ├── GuiaAlagamento/
│   ├── GuiaAvalanche/
│   ├── GuiaDeslizamento/
│   ├── GuiaQueimada/
│   ├── GuiaSeca/
│   ├── GuiaTornado/
│   ├── Localizacao/
│   ├── Login/
│   ├── Mapa/
│   ├── Onboarding/
│   ├── Perfil/
│   └── PoliticaDePrivacidade/
├── src/
│   ├── context/             # Contextos React
│   │   └── authContext.tsx
│   ├── services/            # Serviços de API
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── emergencyContact.service.ts
│   │   ├── location.service.ts
│   │   └── weather.service.ts
│   └── types/               # Definições TypeScript
│       ├── auth.types.ts
│       ├── emergencyContact.types.ts
│       ├── location.types.ts
│       └── weather.types.ts
├── App.tsx                  # Componente principal
├── app.json                 # Configuração Expo
├── package.json             # Dependências
└── tsconfig.json           # Configuração TypeScript
```

## 🚦 Fluxo de Navegação

### Usuário Não Autenticado
```
Onboarding → Login/Cadastro → Cadastro Concluído → Login
```

### Usuário Autenticado
```
MainTabs (Bottom Navigation):
├── Clima (Tela inicial)
├── Guia
│   ├── GuiaAlagamento
│   ├── GuiaDeslizamento
│   ├── GuiaQueimada
│   ├── GuiaSeca
│   ├── GuiaAvalanche
│   └── GuiaTornado
├── Mapa
└── Emergência

Perfil (acessível de qualquer tela):
├── Dados do usuário
├── Localizações cadastradas
├── Políticas de privacidade
└── Sair
```

## 🏗️ Arquitetura da API Backend

A API backend foi desenvolvida em .NET 8.0 seguindo as melhores práticas de desenvolvimento:

### Estrutura em Camadas
- **Controllers**: Endpoints REST da API
- **Services**: Lógica de negócio
- **Repositories**: Acesso a dados com Entity Framework
- **DTOs**: Objetos de transferência de dados
- **Models**: Entidades do banco de dados

### Recursos Principais
- **Autenticação e Autorização**: JWT Bearer tokens
- **Rate Limiting**: Controle de taxa de requisições por IP/Cliente
- **HATEOAS**: Links hipermídia nas respostas
- **Swagger**: Documentação interativa da API
- **RabbitMQ**: Sistema de mensageria para eventos assíncronos
- **ML.NET**: Predições de riscos usando Machine Learning
- **Cache**: Sistema de cache em memória para otimização

### Endpoints da API

#### Autenticação
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `PUT /api/auth/update-password` - Atualização de senha

#### Usuários
- `GET /api/users/{userId}` - Obter dados do usuário
- `PUT /api/users/{userId}` - Atualizar dados do usuário
- `DELETE /api/users/{userId}` - Excluir conta (soft delete)

#### Localizações
- `GET /api/users/{userId}/locations` - Listar localizações
- `POST /api/users/{userId}/locations` - Criar localização
- `POST /api/users/{userId}/locations/by-address` - Criar por endereço
- `PUT /api/users/{userId}/locations/{locationId}` - Atualizar
- `DELETE /api/users/{userId}/locations/{locationId}` - Excluir

#### Contatos de Emergência
- `GET /api/users/{userId}/emergency-contacts` - Listar contatos
- `POST /api/users/{userId}/emergency-contacts` - Criar contato
- `PUT /api/users/{userId}/emergency-contacts/{contactId}` - Atualizar
- `DELETE /api/users/{userId}/emergency-contacts/{contactId}` - Excluir

#### Clima
- `POST /api/weather` - Informações completas do clima
- `POST /api/weather/current` - Clima atual
- `POST /api/weather/forecast` - Previsão do tempo
- `POST /api/weather/alerts` - Alertas meteorológicos

#### Machine Learning
- `POST /api/mlprediction/predict-disaster` - Predição de riscos
- `POST /api/mlprediction/detect-anomaly` - Detecção de anomalias

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn
- Expo CLI
- .NET 8.0 SDK
- Oracle Database ou SQL Server
- RabbitMQ (opcional, para mensageria)
- Dispositivo físico ou emulador

### Configuração do Backend (.NET API)

1. **Clone o repositório da API**
```bash
git clone https://github.com/gs-eventos-extremos/.NET-API.git
cd .NET-API
```

2. **Configure o banco de dados**
   - Abra `appsettings.json`
   - Configure a connection string para Oracle ou SQL Server
   ```json
   "ConnectionStrings": {
     "OracleConnection": "sua-connection-string-aqui"
   }
   ```

3. **Configure as chaves de API**
   - OpenWeatherMap API Key
   - JWT Secret Key
   ```json
   "JwtSettings": {
     "SecretKey": "sua-chave-secreta-com-256-bits",
     "Issuer": "WeatherEmergencyAPI",
     "Audience": "WeatherEmergencyApp",
     "ExpirationInHours": 24
   },
   "WeatherApi": {
     "OpenWeatherMapKey": "sua-chave-openweathermap"
   }
   ```

4. **Execute as migrations**
```bash
dotnet ef database update
```

5. **Inicie a API**
```bash
dotnet run
```

A API estará disponível em `http://localhost:5165`

### Configuração do Frontend (React Native)

1. **Clone o repositório do app**
```bash
git clone https://github.com/seu-usuario/weather-emergency-app.git
cd weather-emergency-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure a URL da API**
   - Abra `src/services/api.ts`
   - Configure o endereço da API:
   ```typescript
   // Para emulador Android
   const API_BASE_URL = 'http://10.0.2.2:5165';
   
   // Para dispositivo físico
   const API_BASE_URL = 'http://SEU_IP_LOCAL:5165';
   ```

4. **Configure as chaves de API no frontend**
   - Abra `app.json`
   - Adicione sua Google Maps API Key:
   ```json
   "ios": {
     "config": {
       "googleMapsApiKey": "SUA_API_KEY"
     }
   },
   "android": {
     "config": {
       "googleMaps": {
         "apiKey": "SUA_API_KEY"
       }
     }
   }
   ```

5. **Inicie o projeto**
```bash
expo start
# ou
npm start
```

6. **Execute no dispositivo**
   - Escaneie o QR code com o app Expo Go
   - Ou execute em um emulador

## 🔑 Configuração de APIs

### Google Maps (Frontend)
1. Obtenha uma API Key no [Google Cloud Console](https://console.cloud.google.com/)
2. Ative as seguintes APIs:
   - Maps SDK for Android/iOS
   - Places API
   - Directions API
   - Geocoding API
3. Adicione a chave em `app.json`

### OpenWeatherMap (Backend)
1. Crie uma conta em [OpenWeatherMap](https://openweathermap.org/)
2. Obtenha uma API Key gratuita
3. Configure em `appsettings.json` da API .NET

### Oracle Database
1. Configure uma instância Oracle (local ou cloud)
2. Atualize a connection string em `appsettings.json`
3. Execute as migrations para criar as tabelas

### RabbitMQ (Opcional)
1. Instale RabbitMQ localmente ou use um serviço cloud
2. Configure as credenciais em `appsettings.json`
3. Usado para processamento assíncrono de eventos

## 🏃‍♂️ Ordem de Execução

1. **Primeiro**: Inicie a API backend (.NET)
   ```bash
   cd .NET-API
   dotnet run
   ```

2. **Segundo**: Inicie o app React Native
   ```bash
   cd weather-emergency-app
   expo start
   ```

3. **Verificação**: 
   - API rodando em `http://localhost:5165`
   - Swagger disponível em `http://localhost:5165/swagger`
   - App conectando corretamente à API

## 🔒 Segurança

- **Autenticação JWT** com expiração de token
- **Validação de dados** no frontend e backend
- **Armazenamento seguro** de credenciais
- **HTTPS** para todas as comunicações
- **Sanitização de inputs** do usuário
- **Permissões mínimas** solicitadas ao usuário

## 📊 Funcionalidades Futuras

- [ ] Notificações push para alertas meteorológicos
- [ ] Modo offline com cache de dados
- [ ] Compartilhamento de localização em emergências
- [ ] Integração com serviços de emergência locais
- [ ] Suporte multi-idioma
- [ ] Widget de clima para tela inicial
- [ ] Histórico de condições climáticas
- [ ] Chat de emergência com autoridades

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Grupo
- **Nome:** Gustavo Araújo Maia **RM:** 553270
- **Nome:** Rafael Vida Fernandes **RM:** 553721
- **Nome:** Kauã Almeida Silveira **RM:** 552618
- **Turma:** 2TDSPS
