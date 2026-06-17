    updateLiveInterface() {
        const priceEl = document.getElementById('live-price');
        const signalEl = document.getElementById('ai-signal');
        
        priceEl.innerText = `$ ${QuantumState.currentPrice.toLocaleString('US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const lastPrices = QuantumState.priceHistory.slice(-5);
        const avg = lastPrices.reduce((a, b) => a + b, 0) / 5;

        // INSTANCIA O AUDIO ESTÁTICO NATIVO DO SITEMA
        const audioAlert = new Audio('assets/audio/alert.mp3');
        audioAlert.volume = 0.3; // VOLUME CONTROLADO EM 30%

        if (QuantumState.currentPrice > avg + 20) {
            if(signalEl.innerText !== "SINAL: COMPRA FORTE (MOMENTUM UP)") {
                audioAlert.play().catch(() => {}); // TOCA O BIPE ESTÁTICO (IGNORA SE O USUÁRIO NÃO CLICOU NA TELA AINDA)
            }
            signalEl.innerText = "SINAL: COMPRA FORTE (MOMENTUM UP)";
            signalEl.className = "text-xs bg-emerald-950 text-emerald-400 font-black px-4 py-2 tracking-widest border border-emerald-500 animate-pulse";
        } else if (QuantumState.currentPrice < avg - 20) {
            if(signalEl.innerText !== "SINAL: VENDA FORTE (MOMENTUM DOWN)") {
                audioAlert.play().catch(() => {}); // TOCA O BIPE ESTÁTICO
            }
            signalEl.innerText = "SINAL: VENDA FORTE (MOMENTUM DOWN)";
            signalEl.className = "text-xs bg-rose-950 text-rose-400 font-black px-4 py-2 tracking-widest border border-rose-500 animate-pulse";
        } else {
            signalEl.innerText = "SINAL: MERCADO NEUTRO (CONSOLIDADO)";
            signalEl.className = "text-xs bg-zinc-950 text-zinc-400 font-black px-4 py-2 tracking-widest border border-zinc-700";
        }
    }
