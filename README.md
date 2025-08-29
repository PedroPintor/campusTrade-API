# CampusTrade API - Marketplace Universitário

API REST completa para universitários comprarem e venderem produtos usados.

## 🚀 Funcionalidades

### CRUD Completo
- ✅ Listar produtos
- ✅ Criar produtos
- ✅ Buscar produto por ID
- ✅ Atualizar produtos
- ✅ Deletar produtos

### Recursos Avançados
- ✅ Busca com filtros (categoria, termo, preço)
- ✅ Validações robustas
- ✅ Estatísticas dos produtos
- ✅ Sistema de categorias
- ✅ Documentação automática (Swagger)

## 📁 Estrutura do Projeto

```
campustrade-api/
├── main.py                      # Aplicação FastAPI principal
├── models.py                    # Modelos Pydantic (validações)
├── startup.py                   # Script para deploy Azure
├── requirements.txt             # Dependências
├── test_api.http                # Testes básicos locais
├── test_api_expandida.http      # Testes completos locais
├── test_azure.http              # Testes básicos Azure
├── test_azure_expandida.http    # Testes completos Azure
└── README.md                    # Este arquivo
```

## 🛠️ Como Executar

### 1. Ambiente Virtual
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate # macOS/Linux
```

### 2. Instalar Dependências
```bash
pip install -r requirements.txt
```

### 3. Executar Aplicação
```bash
uvicorn main:app --reload
```

### 4. Acessar
- **API:** http://localhost:8000
- **Documentação:** http://localhost:8000/docs
- **Redoc:** http://localhost:8000/redoc

## 📊 Endpoints Disponíveis

### Básicos
- `GET /` - Mensagem de boas-vindas
- `GET /produtos` - Listar todos os produtos
- `POST /produtos` - Criar novo produto
- `GET /produtos/{id}` - Buscar produto por ID
- `PUT /produtos/{id}` - Atualizar produto completo
- `DELETE /produtos/{id}` - Remover produto

### Avançados
- `GET /produtos/buscar` - Busca com filtros
- `GET /categorias` - Listar categorias válidas
- `GET /produtos/estatisticas` - Estatísticas dos produtos

### Parâmetros de Busca
- `categoria` - Filtrar por categoria
- `termo` - Buscar no título/descrição
- `preco_min` - Preço mínimo
- `preco_max` - Preço máximo

## ✅ Validações

- **Títulos:** 3-100 caracteres
- **Descrições:** 10-500 caracteres
- **Preços:** Positivos até R$ 50.000
- **Categorias:** Lista predefinida
- **Vendedores:** 2-50 caracteres

## 📂 Categorias Válidas

- Livros
- Eletrônicos
- Móveis
- Roupas
- Esportes
- Outros

## 🚀 Deploy no Azure

1. Criar App Service no Azure
2. Configurar runtime Python 3.11
3. Deploy via VS Code Azure Extension
4. Configurar startup command: `python startup.py`

## 🧪 Testes

Use os arquivos `.http` para testar:
- `test_api.http` - Testes básicos locais
- `test_api_expandida.http` - Testes completos locais
- `test_azure.http` - Testes básicos Azure
- `test_azure_expandida.http` - Testes completos Azure

## 📈 Próximos Passos

- [ ] Integração com Azure SQL Database
- [ ] Sistema de autenticação
- [ ] Upload de imagens (Azure Blob Storage)
- [ ] Cache (Azure Redis)
- [ ] Sistema de notificações

## 🎯 Status do Projeto

**Aulas Implementadas:**
- ✅ Aula 15/08 - API básica + Deploy Azure
- ✅ Aula 18/08 - CRUD completo + Validações + Busca

**Próxima:** Aula 22/08 - Integração com banco de dados
