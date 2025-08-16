# Dashboard de Transações Bancárias

![Banner do Projeto](https://github.com/GabrielDevelop777/dashboard-transacoes/blob/master/assets/dashboard.png?raw=true)

## 📊 Sobre o Projeto

O Dashboard de Transações Bancárias é uma aplicação web desenvolvida com HTML, CSS e JavaScript puro que permite gerenciar e visualizar transações financeiras de maneira intuitiva e eficiente. Este projeto demonstra o uso de métodos de array como `filter`, `map` e `reduce` para manipulação de dados financeiros.

### [Demonstração ao vivo](https://dashboard-transacoes.netlify.app/)

## ✨ Funcionalidades

- **Visualização de saldos**:
  - Saldo total (diferença entre entradas e saídas)
  - Total de entradas
  - Total de saídas

- **Gestão de transações**:
  - Listagem de transações com tipo, data e valor
  - Filtragem por tipo de transação (todas, entradas, saídas)
  - Adição de novas transações via formulário

- **Análise visual**:
  - Gráfico de linha mostrando a evolução do saldo ao longo do tempo
  - Formatação monetária adequada ao padrão brasileiro

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript** - Lógica de negócios e manipulação do DOM
- **Chart.js** - Biblioteca para criação de gráficos
- **Métodos de Array**:
  - `filter` - Para separar transações por tipo
  - `reduce` - Para calcular somas e totais
  - `map` - Para transformar dados para exibição

## 📋 Conceitos Aplicados

- **Manipulação avançada de arrays** usando métodos funcionais
- **DOM manipulation** para atualização dinâmica da interface
- **Event handling** para interações do usuário
- **Responsividade** para diferentes tamanhos de tela
- **Formatação de dados** para moeda e datas
- **Visualização de dados** através de gráficos

## 🚀 Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/dashboard-transacoes-bancarias.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd dashboard-transacoes-bancarias
   ```

3. Abra o arquivo `index.html` em seu navegador preferido.

## 🔍 Estrutura do Projeto

```
dashboard-transacoes-bancarias/
│
├── index.html          # Estrutura da página e interface do usuário
├── README.md           # Documentação do projeto
└── assets/             # Opcional: diretório para recursos adicionais
```


## 🧠 Lógica de Negócios

- **Cálculo de saldo**: Utiliza `reduce` para somar todas as entradas e subtrair todas as saídas
- **Filtragem de transações**: Usa `filter` para mostrar apenas as transações do tipo selecionado
- **Renderização de lista**: Usa `map` para converter objetos de transação em elementos HTML
- **Gráfico de evolução**: Calcula o saldo acumulado ao longo do tempo para visualização


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

[GitHub](https://github.com/GabrielDevelop777) - [LinkedIn](https://www.linkedin.com/in/gabriel-alexandre-silva/)

---

⭐️ De [Gabriel](https://github.com/GabrielDevelop777)
