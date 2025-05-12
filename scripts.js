const transacoes = [
	{ tipo: "entrada", valor: 1500.0, data: new Date("2025-05-01") },
	{ tipo: "saida", valor: 350.75, data: new Date("2025-05-02") },
	{ tipo: "entrada", valor: 200.5, data: new Date("2025-05-04") },
	{ tipo: "saida", valor: 120.0, data: new Date("2025-05-05") },
	{ tipo: "saida", valor: 850.25, data: new Date("2025-05-08") },
	{ tipo: "entrada", valor: 3000.0, data: new Date("2025-05-10") },
];

// Elementos DOM
const transactionList = document.getElementById("transaction-list");
const totalBalanceEl = document.getElementById("total-balance");
const incomeTotalEl = document.getElementById("income-total");
const expenseTotalEl = document.getElementById("expense-total");
const transactionForm = document.getElementById("transaction-form");
const filterButtons = document.querySelectorAll(".filter-btn");

// Formatador para moeda brasileira
const formatarMoeda = (valor) => {
	return valor.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

// Formatador de data
const formatarData = (data) => {
	return data.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};

// Função para atualizar os saldos
const atualizarSaldos = () => {
	// Filter para separar entradas e saídas
	const entradas = transacoes.filter((t) => t.tipo === "entrada");
	const saidas = transacoes.filter((t) => t.tipo === "saida");

	// Reduce para calcular os totais
	const totalEntradas = entradas.reduce((acc, t) => acc + t.valor, 0);
	const totalSaidas = saidas.reduce((acc, t) => acc + t.valor, 0);
	const saldoTotal = totalEntradas - totalSaidas;

	// Atualizar elementos na tela
	totalBalanceEl.textContent = formatarMoeda(saldoTotal);
	incomeTotalEl.textContent = formatarMoeda(totalEntradas);
	expenseTotalEl.textContent = formatarMoeda(totalSaidas);

	// Atualizar a cor do saldo total conforme o valor
	if (saldoTotal < 0) {
		totalBalanceEl.parentElement.style.backgroundColor = "var(--danger-color)";
	} else {
		totalBalanceEl.parentElement.style.backgroundColor = "var(--primary-color)";
	}

	// Atualizar o gráfico
	atualizarGrafico();
};

// Função para renderizar a lista de transações
const renderizarTransacoes = (filtro = "todas") => {
	// Limpar a lista atual
	transactionList.innerHTML = "";

	// Filtrar transações conforme necessário
	let transacoesFiltradas;
	if (filtro === "todas") {
		transacoesFiltradas = [...transacoes];
	} else {
		transacoesFiltradas = transacoes.filter((t) => t.tipo === filtro);
	}

	// Ordenar por data (mais recente primeiro)
	transacoesFiltradas.sort((a, b) => b.data - a.data);

	// Map para criar os elementos HTML para cada transação
	if (transacoesFiltradas.length === 0) {
		transactionList.innerHTML =
			'<p style="text-align: center; padding: 20px;">Nenhuma transação encontrada.</p>';
		return;
	}

	transacoesFiltradas.map((transacao, index) => {
		const item = document.createElement("div");
		item.className = "transaction-item animate-fade";
		item.style.animationDelay = `${index * 0.05}s`;

		const iconClass =
			transacao.tipo === "entrada" ? "icon-entrada" : "icon-saida";
		const iconSymbol = transacao.tipo === "entrada" ? "+" : "-";
		const valorClass = transacao.tipo === "entrada" ? "entrada" : "saida";

		item.innerHTML = `
                    <div class="transaction-type">
                        <span class="transaction-icon ${iconClass}">${iconSymbol}</span>
                        <div class="transaction-details">
                            <span class="transaction-name">${transacao.tipo === "entrada" ? "Entrada" : "Saída"}</span>
                            <span class="transaction-date">${formatarData(transacao.data)}</span>
                        </div>
                    </div>
                    <div class="transaction-value ${valorClass}">
                        ${formatarMoeda(transacao.valor)}
                    </div>
                `;

		transactionList.appendChild(item);
	});
};

// Inicializar o gráfico
let transactionsChart;
const initChart = () => {
	const ctx = document.getElementById("transactions-chart").getContext("2d");

	transactionsChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [],
			datasets: [
				{
					label: "Saldo",
					data: [],
					borderColor: "rgba(80, 101, 219, 1)",
					tension: 0.1,
					fill: true,
					backgroundColor: "rgba(80, 101, 219, 0.1)",
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						color: "rgba(0, 0, 0, 0.05)",
					},
				},
				x: {
					grid: {
						display: false,
					},
				},
			},
			plugins: {
				legend: {
					display: true,
					position: "top",
				},
			},
		},
	});
};

// Atualizar o gráfico
const atualizarGrafico = () => {
	// Criar uma cópia ordenada das transações por data
	const transacoesOrdenadas = [...transacoes].sort((a, b) => a.data - b.data);

	// Preparar os dados para o gráfico
	let saldoAcumulado = 0;
	const dados = transacoesOrdenadas.map((t) => {
		saldoAcumulado += t.tipo === "entrada" ? t.valor : -t.valor;
		return saldoAcumulado;
	});

	const labels = transacoesOrdenadas.map((t) => formatarData(t.data));

	// Atualizar dados do gráfico
	transactionsChart.data.labels = labels;
	transactionsChart.data.datasets[0].data = dados;
	transactionsChart.update();
};

// Event listener para adicionar novas transações
transactionForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const tipo = document.getElementById("transaction-type").value;
	const valor = Number.parseFloat(
		document.getElementById("transaction-value").value,
	);

	if (valor <= 0) {
		alert("Por favor, insira um valor válido.");
		return;
	}

	// Adicionar nova transação
	const novaTransacao = {
		tipo,
		valor,
		data: new Date(),
	};

	transacoes.push(novaTransacao);

	// Resetar o formulário
	transactionForm.reset();

	// Atualizar a interface
	atualizarSaldos();
	renderizarTransacoes(getActiveFilter());
});

// Event listeners para os botões de filtro
for (const button of filterButtons) {
	button.addEventListener("click", () => {
		// Remover classe ativa de todos os botões
		for (const btn of filterButtons) () => btn.classList.remove("active");

		// Adicionar classe ativa ao botão clicado
		button.classList.add("active");

		// Renderizar transações com o filtro selecionado
		renderizarTransacoes(button.dataset.filter);
	});
}

// Função para obter o filtro ativo atual
const getActiveFilter = () => {
	const activeButton = document.querySelector(".filter-btn.active");
	return activeButton ? activeButton.dataset.filter : "todas";
};

// Inicializar a aplicação
const inicializar = () => {
	initChart();
	atualizarSaldos();
	renderizarTransacoes("todas");
};

// Iniciar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", inicializar);
