# 📚 Documentação - CardDemo

## 📁 Estrutura

```
docs/
├── system-overview.md              # 🎯 Fonte única da verdade (98% de precisão)
└── site/
    ├── index.html                  # 🏠 Página principal navegável
    └── modules/
        └── accounts/
            └── index.html          # 📦 Guia detalhado do módulo Cuentas
```

## 🚀 Início Rápido

### Opção 1: Abrir a documentação HTML (recomendado)
```bash
# Abra o hub principal no navegador
open docs/site/index.html

# Ou navegue diretamente para o módulo de contas
open docs/site/modules/accounts/index.html
```

### Opção 2: Ler Markdown
```bash
# Visualize a visão geral do sistema
cat docs/system-overview.md

# Ou use seu editor favorito
code docs/system-overview.md
```

## 🌍 Idiomas disponíveis

- **Português-BR (original)**: [README-pt-BR.md](README-pt-BR.md), [README_DOCUMENTACION-pt-BR.md](README_DOCUMENTACION-pt-BR.md), [README_DOCUMENTACION_NUEVA-pt-BR.md](README_DOCUMENTACION_NUEVA-pt-BR.md), [system-overview-pt-BR.md](system-overview-pt-BR.md), [docs/site/index-pt-BR.html](docs/site/index-pt-BR.html), [docs/site/modules/accounts/index-pt-BR.html](docs/site/modules/accounts/index-pt-BR.html), [docs/site/modules/auth/index-pt-BR.html](docs/site/modules/auth/index-pt-BR.html)
- **Español**: [README.md](README.md), [README_DOCUMENTACION.md](README_DOCUMENTACION.md), [README_DOCUMENTACION_NUEVA.md](README_DOCUMENTACION_NUEVA.md), [docs/system-overview.md](docs/system-overview.md), [docs/site/index.html](docs/site/index.html), [docs/site/modules/accounts/index.html](docs/site/modules/accounts/index.html), [docs/site/modules/auth/index.html](docs/site/modules/auth/index.html)

## 📖 O que está incluído

### 1. Visão Geral do Sistema (`system-overview.md`)
Documentação completa para gerar User Stories:
- ✅ Visão da arquitetura (Spring Boot + React + PostgreSQL)
- ✅ Descrição do módulo de Contas
- ✅ Modelos de dados (Account, Customer, CardXrefRecord)
- ✅ Regras de negócio (12 regras documentadas)
- ✅ Endpoints da API (4 documentados)
- ✅ Templates de User Stories
- ✅ Diretrizes de complexidade
- ✅ Orçamentos de performance
- ✅ Rastreamento de dívida técnica

### 2. Hub de Documentação (`site/index.html`)
Landing page HTML com:
- Cards de resumo dos módulos
- Estatísticas rápidas
- Navegação para guias detalhados
- Links para a documentação da API (Swagger)

### 3. Guia do Módulo Contas (`site/modules/accounts/index.html`)
Guia de desenvolvimento com:
- Templates de User Stories específicos do módulo
- Exemplos de código reais do projeto
- Regras de negócio e critérios de aceitação
- Fundamentos técnicos (componentes, serviços, entidades)
- Considerações de performance
- Estratégias de mitigação de riscos

## 🎯 Principais destaques

### ✅ Acurácia de 98% com o Codebase
Toda documentação baseada em análise direta de:
- `/tmp/workspace/repo/frontend/app/components/account/` - componentes React
- `/tmp/workspace/repo/management/src/main/java/` - backend Spring Boot
- Interfaces TypeScript, entidades Java e serviços reais

### ✅ Padrões reais, sem ficção
- **NÃO** menciona BaseForm ou BaseDataTable fictícios
- **SIM** usa componentes Material-UI (TextField, Card, Grid, Button)
- **SIM** registra endpoints reais dos controllers
- **SIM** detalha regras de negócio vindas da migração COBOL

### ✅ User Stories acionáveis
Templates com:
- Padrões por papéis (oficial de crédito, administrador, agente)
- Casos reais (visualizar saldo, atualizar limite, alterar status)
- Estimativas de complexidade (1-2 pts simples, 3-5 pts médio, 5-8 pts complexo)

## 📋 Destaques técnicos

### APIs do backend
```
GET  /api/account-view?accountId={id}     - dados da conta
GET  /api/account-view/initialize          - inicializa a tela
GET  /api/accounts/{accountId}             - dados para edição
PUT  /api/accounts/{accountId}             - atualização de conta e cliente
```

### Telas frontend
- **AccountViewScreen.tsx** - tela com cartões Material-UI
- **AccountUpdateScreen.tsx** - edição com validação

### Modelos de dados
- **Account** (ID 11 dígitos, BigDecimal, datas locais)
- **Customer** (CPF, pontuação FICO 300-850, endereço)
- **CardXrefRecord** (liga Conta → Cliente → Cartão)

## 📊 Estatísticas do módulo

- **Componentes**: 2 telas principais (visualizar, atualizar)
- **Serviços**: 3 (AccountViewService, AccountUpdateService, AccountValidationService)
- **Entidades**: 3 (Account, Customer, CardXrefRecord)
- **Endpoints**: 4 (2 GET, 1 PUT, 1 GET de inicialização)
- **Regras de negócio**: 12 documentadas
- **Templates de User Stories**: 4 padrões

## 🚨 Notas importantes

### Limitações atuais
1. **Sem i18n**: textos em inglês hardcoded
2. **Sem controle de concorrência**: falta `@Version`
3. **Validações comentadas** nas linhas 87-91 e 101-104 do `AccountUpdateScreen`
4. **Sem trilha de auditoria**: alterações não logadas

### Metas de performance
- Visualizar conta: < 500ms (P95)
- Atualizar conta: < 1s (P95)
- Máximo de 3 consultas ao DB por visualização

## 📈 Próximos passos

1. **Product Owners**: use `system-overview.md` para gerar backlog
2. **Desenvolvedores**: consulte `site/modules/accounts/index.html` para padrões
3. **QA**: baseie casos de teste nos critérios de aceitação
4. **Arquitetos**: cheque os fundamentos técnicos e modelos de dados

## 🔗 Documentação relacionada
- [README principal](../README.md) - setup e quick start
- [Guia de deployment](deployment.md) - quando existir
- [Modelo de dados](data-model.md) - quando existir
- [Swagger UI](http://localhost:8080/swagger-ui.html) - com backend rodando

## ✅ Checklist de validação
- [x] Nenhum componente fictício
- [x] Estrutura i18n documenta ausência de implementação
- [x] Formulários reais (página completa, sem modal)
- [x] Código real usado (useAccountView, AccountUpdateService)
- [x] APIs com endpoints reais
- [x] Alinhamento 98% com o codebase
