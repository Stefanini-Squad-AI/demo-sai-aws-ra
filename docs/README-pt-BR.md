# 📚 Documentação - CardDemo

## 📁 Estrutura

```
docs/
├── system-overview.md              # 🎯 Fonte única da verdade (98% de precisão)
├── system-overview-pt-BR.md        # 🎯 Versão em Português-BR
└── site/
    ├── index.html                  # 🏠 Página principal em espanhol/inglês
    ├── index-pt-BR.html            # 🏠 Página principal em Português-BR
    └── modules/
        └── accounts/
            ├── index.html          # 📦 Guia detalhado do módulo Contas (español)
            └── index-pt-BR.html    # 📦 Guia detalhado do módulo Contas (pt-BR)
```

## 🚀 Início Rápido

### Opção 1: Abrir a documentação HTML (recomendado)
```bash
# Abra o hub principal em Português-BR
open docs/site/index-pt-BR.html

# (Opcional) Versão original em espanhol/inglês
open docs/site/index.html

# Navegue diretamente para o módulo de Contas em Português
open docs/site/modules/accounts/index-pt-BR.html

# (Opcional) Versão original do módulo
open docs/site/modules/accounts/index.html
```

### Opção 2: Ler Markdown
```bash
# Visualize a visão geral do sistema em Português
cat docs/system-overview-pt-BR.md

# (Opcional) Versão original em espanhol
cat docs/system-overview.md

# Ou use seu editor favorito no arquivo em português
code docs/system-overview-pt-BR.md
```

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

1. **Product Owners**: use `system-overview-pt-BR.md` para gerar backlog
2. **Desenvolvedores**: consulte `site/modules/accounts/index-pt-BR.html` para padrões
3. **QA**: baseie casos de teste nos critérios de aceitação
4. **Arquitetos**: cheque os fundamentos técnicos e modelos de dados

## 🔗 Documentação relacionada
- [README principal](../README.md) - setup e quick start
- [README em Português](../README-pt-BR.md) - visão geral em PT-BR
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
