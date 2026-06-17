/**
 * CRYPTO QUANTUM CORE ENGINE - HIGH FREQUENCY STREAMING SIMULATOR
 */

const QuantumState = {
    currentPrice: 65000.00,
    priceHistory: Array.from({ length: 15 }, () => 65000.00 + (Math.random() * 200 - 100)),
    timeline: Array.from({ length: 15 }, (_, i) => `T-${15 - i}S`),
    orders: [
        { id: "Q-9921", type: "COMPRA", qty: "1.25 BTC", price: "64950.00" },
        { id: "Q-9922", type: "VENDA", qty: "0.85 BTC", price: "65050.00" }
    ],
    config: JSON.parse(localStorage.getItem('qq_config')) || {
        name: "CRYPTO QUANTUM CORE",
        subtitle: "SISTEMA DE PROCESSAMENTO ALGORÍTMICO DE ALTA FREQUÊNCIA",
        speed: 1000
    },
    adminHash: "240951435b14e8c0f438335300d72bde758e461f52e3e44d8b875bc37433639e" // SENHA PADRÃO: admin123
};

class QuantumEngine {
    constructor() {
        this.chartInstance = null;
        this.streamInterval = null;
    }

    init() {
        // VÍNCULO DE EVENTOS DO SISTEMA
        document.getElementById('order-form').addEventListener('submit', (e) => this.injectOrder(e));
        document.getElementById('terminal-gate').addEventListener('click', () => this.verifyMasterAccess());

        this.applyCustomSettings();
        this.startDataStream();
        this.renderLedger();
        this.buildChart();
    }

    applyCustomSettings() {
        document.getElementById('sys-title').innerText = QuantumState.config.name;
        document.getElementById('sys-subtitle').innerText = QuantumState.config.subtitle;
    }

    // SIMULADOR DE ALTA COMPLEXIDADE: FLUXO DE DADOS CONTÍNUO (STREAMING)
    startDataStream() {
        if (this.streamInterval) clearInterval(this.streamInterval);

        this.streamInterval = setInterval(() => {
            // ALGORÍTMO DE PASSO ALEATÓRIO (RANDOM WALK) PARA MOVIMENTAÇÃO DE PREÇO ACURADA
            const volatility = 150.00;
            const change = (Math.random() * volatility) - (volatility / 2);
            QuantumState.currentPrice = Math.max(1000, QuantumState.currentPrice + change);

            // ATUALIZA O ESTADO DO HISTÓRICO PARA O GRÁFICO (EFEITO FILA SHIFT-PUSH)
            QuantumState.priceHistory.push(QuantumState.currentPrice);
            QuantumState.priceHistory.shift();

            // RENDERIZAÇÃO ULTRA RÁPIDA DA UI
            this.updateLiveInterface();
            this.updateChartData();
        }, parseInt(QuantumState.config.speed));
    }

    updateLiveInterface() {
        const priceEl = document.getElementById('live-price');
        const signalEl = document.getElementById('ai-signal');
        
        priceEl.innerText = `$ ${QuantumState.currentPrice.toLocaleString('US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // ANALISADOR MATEMÁTICO DE SINAIS (MÉDIA MÓVEL SIMPLES COMPACTA)
        const lastPrices = QuantumState.priceHistory.slice(-5);
        const avg = lastPrices.reduce((a, b) => a + b, 0) / 5;

        if (QuantumState.currentPrice > avg + 20) {
            signalEl.innerText = "SINAL: COMPRA FORTE (MOMENTUM UP)";
            signalEl.className = "text-xs bg-emerald-950 text-emerald-400 font-black px-4 py-2 tracking-widest border border-emerald-500 animate-pulse";
        } else if (QuantumState.currentPrice < avg - 20) {
            signalEl.innerText = "SINAL: VENDA FORTE (MOMENTUM DOWN)";
            signalEl.className = "text-xs bg-rose-950 text-rose-400 font-black px-4 py-2 tracking-widest border border-rose-500 animate-pulse";
        } else {
            signalEl.innerText = "SINAL: MERCADO NEUTRO (CONSOLIDADO)";
            signalEl.className = "text-xs bg-zinc-950 text-zinc-400 font-black px-4 py-2 tracking-widest border border-zinc-700";
        }
    }

    buildChart() {
        const ctx = document.getElementById('quantumChart');
        if (!ctx) return;

        this.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: QuantumState.timeline,
                datasets: [{
                    label: 'LIVE TICKER',
                    data: QuantumState.priceHistory,
                    borderColor: '#10b981',
                    borderWidth: 2,
                    pointRadius: 0,
                    backgroundColor: 'rgba(16, 185, 129, 0.02)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#064e3b' }, ticks: { color: '#10b981', font: { family: 'monospace' } } },
                    y: { grid: { color: '#064e3b' }, ticks: { color: '#10b981', font: { family: 'monospace' } } }
                }
            }
        });
    }

    updateChartData() {
        if (this.chartInstance) {
            this.chartInstance.data.datasets[0].data = QuantumState.priceHistory;
            this.chartInstance.update('none'); // MAPEIA ATUALIZAÇÃO SEM DELAY DE ANIMAÇÃO CRÍTICA
        }
    }

    renderLedger() {
        const ledger = document.getElementById('order-ledger');
        ledger.innerHTML = QuantumState.orders.map(o => `
            <div class="flex justify-between items-center bg-black border border-emerald-950 p-2 tracking-widest">
                <span class="text-slate-500">[${o.id}]</span>
                <span class="${o.type === 'COMPRA' ? 'text-emerald-400' : 'text-rose-500'} font-bold">${o.type}</span>
                <span class="text-white">${o.qty}</span>
                <span class="text-emerald-600 font-bold">@ $ ${parseFloat(o.price).toFixed(2)}</span>
            </div>
        `).reverse().join('');
    }

    injectOrder(e) {
        e.preventDefault();
        const qty = parseFloat(document.getElementById('order-qty').value);
        const type = Math.random() > 0.5 ? "COMPRA" : "VENDA";

        QuantumState.orders.push({
            id: `Q-${Math.floor(1000 + Math.random() * 9000)}`,
            type: type,
            qty: `${qty.toFixed(2)} BTC`,
            price: QuantumState.currentPrice.toFixed(2)
        });

        if (QuantumState.orders.length > 20) QuantumState.orders.shift();

        document.getElementById('order-form').reset();
        this.renderLedger();
    }

    // SECURE WEB CRYPTO INTEGRATION (SHA-256)
    async hashCheck(str) {
        const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    async verifyMasterAccess() {
        const token = prompt("INSIRA A CHAVE MESTRE QUANTUM:");
        if (!token) return;

        if ((await this.hashCheck(token)) === QuantumState.adminHash) {
            document.getElementById('developer-shell').classList.remove('hidden');
            document.getElementById('dev-name').value = QuantumState.config.name;
            document.getElementById('dev-sub').value = QuantumState.config.subtitle;
            document.getElementById('dev-speed').value = QuantumState.config.speed;
            alert("SISTEMA CONFIGURADO: ACESSO TOTAL GARANTIDO.");
        } else {
            alert("ERRO DE PROTOCOLO: ASSINATURA DE SEGURANÇA INVÁLIDA.");
        }
    }

    closeConfig() {
        document.getElementById('developer-shell').classList.add('hidden');
    }

    saveConfig() {
        QuantumState.config.name = document.getElementById('dev-name').value;
        QuantumState.config.subtitle = document.getElementById('dev-sub').value;
        QuantumState.config.speed = document.getElementById('dev-speed').value;

        localStorage.setItem('qq_config', JSON.stringify(QuantumState.config));
        this.applyCustomSettings();
        this.startDataStream(); // RESET DO MOTOR NA NOVA VELOCIDADE SELECIONADA
        alert("NÚCLEO QUANTUM ATUALIZADO COM SUCESSO.");
    }
}

// INICIALIZAÇÃO FORMAL DO MOTOR CENTRAL
const core = new QuantumEngine();
document.addEventListener('DOMContentLoaded', () => core.init());
