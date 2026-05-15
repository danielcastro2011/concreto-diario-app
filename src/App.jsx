import React, { useEffect, useMemo, useState } from 'react';
import {
  Truck,
  MapPinned,
  Flag,
  Ruler,
  Layers3,
  Plus,
  Trash2,
  ClipboardList,
  BarChart3,
  Boxes,
} from 'lucide-react';

export default function ConcretoDiarioApp() {
  const [estacaInicial, setEstacaInicial] = useState('');
  const [estacaFinal, setEstacaFinal] = useState('');
  const [quantidadeCaminhao, setQuantidadeCaminhao] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [largura, setLargura] = useState('');
  const [espessura, setEspessura] = useState('');
  const [lancamentos, setLancamentos] = useState(() => {
    const dadosSalvos = localStorage.getItem('concreto-diario');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const volumeAtual = useMemo(() => {
    return (
      Number(comprimento || 0) *
      Number(largura || 0) *
      Number(espessura || 0)
    ).toFixed(2);
  }, [comprimento, largura, espessura]);

  const totalDia = useMemo(() => {
    return lancamentos
      .reduce((acc, item) => acc + Number(item.volume), 0)
      .toFixed(2);
  }, [lancamentos]);

  useEffect(() => {
    localStorage.setItem('concreto-diario', JSON.stringify(lancamentos));
  }, [lancamentos]);

  function adicionarLancamento() {
    if (!comprimento || !largura || !espessura) {
      alert('Preencha os campos');
      return;
    }

    const novo = {
      id: Date.now(),
      estacaInicial,
      estacaFinal,
      quantidadeCaminhao,
      volume: volumeAtual,
    };

    setLancamentos([novo, ...lancamentos]);
    setEstacaInicial('');
    setEstacaFinal('');
    setQuantidadeCaminhao('');
    setComprimento('');
    setLargura('');
    setEspessura('');
  }

  function limparDia() {
    if (confirm('Limpar relatório do dia?')) {
      setLancamentos([]);
      localStorage.removeItem('concreto-diario');
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#164e63,_#020617_45%)] text-white p-4 md:p-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center relative">
          <div className="absolute inset-0 blur-3xl opacity-20 bg-cyan-400 rounded-full"></div>
          <h1 className="relative text-7xl md:text-8xl font-black tracking-tight leading-none drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            CONCRETO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500"> PRO</span>
          </h1>

          <p className="text-slate-400 text-xl mt-4 tracking-wide">
            Sistema inteligente para fechamento diário de concretagem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-2xl border border-cyan-400/10 rounded-[36px] p-8 shadow-[0_0_80px_rgba(34,211,238,0.12)] hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>

            <div className="flex items-center gap-3 relative">
              <BarChart3 className="text-cyan-400 w-8 h-8" />
              <p className="relative text-slate-400 text-lg uppercase tracking-[4px]">
                Volume Atual
              </p>
            </div>

            <h2 className="relative text-7xl md:text-8xl font-black mt-5 text-cyan-400 tracking-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
              {volumeAtual}
            </h2>

            <p className="text-3xl mt-2">m³</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-[36px] p-8 text-black shadow-[0_0_100px_rgba(16,185,129,0.45)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 blur-3xl rounded-full"></div>

            <div className="flex items-center gap-3 relative">
              <Boxes className="text-white w-8 h-8" />
              <p className="relative text-lg font-black uppercase tracking-[4px]">
                Total do Dia
              </p>
            </div>

            <h2 className="relative text-7xl md:text-8xl font-black mt-5 tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
              {totalDia}
            </h2>

            <p className="text-3xl mt-2">m³</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-cyan-950/40 via-slate-900/90 to-cyan-950/40 backdrop-blur-2xl border border-cyan-400/10 rounded-[42px] p-8 md:p-10 shadow-[0_0_120px_rgba(8,145,178,0.18)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%)]"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 relative z-10">
            <div>
              <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 px-6 py-3 rounded-2xl mb-5 w-fit shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-cyan-300 text-sm font-black tracking-[3px] uppercase">
                  Área de Lançamento
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
                Painel de Concretagem
              </h2>

              <p className="text-slate-400 mt-4 text-xl leading-relaxed max-w-2xl">
                Preencha os dados da concretagem para gerar o volume automaticamente e salvar o relatório diário da obra.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4 bg-black/30 backdrop-blur-xl border border-cyan-400/20 px-6 py-4 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.12)]">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-cyan-300 font-bold tracking-wide">
                SISTEMA ONLINE
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
            

            <input
              value={estacaInicial}
              onChange={(e) => setEstacaInicial(e.target.value)}
              placeholder="📍 Estaca Inicial"
              className="bg-black/40 backdrop-blur-xl rounded-[24px] px-6 py-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus:-translate-y-1 placeholder:text-slate-500 shadow-[0_0_30px_rgba(15,23,42,0.5)]"
            />

            <input
              value={estacaFinal}
              onChange={(e) => setEstacaFinal(e.target.value)}
              placeholder="🚩 Estaca Final"
              className="bg-black/30 backdrop-blur-xl rounded-2xl p-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:scale-[1.01]"
            />

            <input
              type="number"
              value={quantidadeCaminhao}
              onChange={(e) => setQuantidadeCaminhao(e.target.value)}
              placeholder="🚚 Quantidade de Caminhão"
              className="bg-black/40 backdrop-blur-xl rounded-[24px] px-6 py-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus:-translate-y-1 placeholder:text-slate-500 shadow-[0_0_30px_rgba(15,23,42,0.5)]"
            />

            <input
              type="number"
              value={comprimento}
              onChange={(e) => setComprimento(e.target.value)}
              placeholder="📏 Comprimento"
              className="bg-black/40 backdrop-blur-xl rounded-[24px] px-6 py-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus:-translate-y-1 placeholder:text-slate-500 shadow-[0_0_30px_rgba(15,23,42,0.5)]"
            />

            <input
              type="number"
              value={largura}
              onChange={(e) => setLargura(e.target.value)}
              placeholder="📐 Largura"
              className="bg-black/40 backdrop-blur-xl rounded-[24px] px-6 py-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus:-translate-y-1 placeholder:text-slate-500 shadow-[0_0_30px_rgba(15,23,42,0.5)]"
            />

            <input
              type="number"
              value={espessura}
              onChange={(e) => setEspessura(e.target.value)}
              placeholder="📚 Espessura"
              className="bg-black/40 backdrop-blur-xl rounded-[24px] px-6 py-5 text-lg outline-none border border-white/10 focus:border-cyan-400 transition-all focus:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus:-translate-y-1 placeholder:text-slate-500 shadow-[0_0_30px_rgba(15,23,42,0.5)]"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-10 relative z-10">
            <button
              onClick={adicionarLancamento}
              className="flex-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 py-6 rounded-[26px] text-2xl font-black shadow-[0_0_60px_rgba(34,211,238,0.45)] border border-cyan-300/20 tracking-wide"
            >
              ➕ Adicionar Concretagem
            </button>

            <button
              onClick={limparDia}
              className="flex-1 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 py-6 rounded-[26px] text-2xl font-black shadow-[0_0_60px_rgba(239,68,68,0.35)] border border-red-300/10 tracking-wide"
            >
              🗑️ Limpar Relatório
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-[0_0_80px_rgba(15,23,42,0.9)] mt-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>
          <div className="flex items-center gap-4 mb-8">
            <ClipboardList className="text-cyan-400 w-10 h-10" />
            <h2 className="text-3xl font-black">
              Histórico de Concretagem
            </h2>
          </div>     
          
          <div className="space-y-4">
            {lancamentos.map((item) => (
              <div
                key={item.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 flex items-center justify-between hover:border-cyan-400/40 hover:scale-[1.01] transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.06)]"
              >
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Truck className="text-cyan-400" />
                    Concretagem
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Estaca: {item.estacaInicial} → {item.estacaFinal}
                  </p>

                  <p className="text-slate-400 mt-1">
                    Caminhões: {item.quantidadeCaminhao}
                  </p>
                </div>

                <div>
                  <h4 className="text-4xl font-black text-cyan-400 tracking-tight">
                    {item.volume} m³
                  </h4>
                </div>
              </div>
            ))}

            {lancamentos.length === 0 && (
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[30px] p-10 text-center text-slate-400 text-2xl">
                Nenhum lançamento registrado hoje 🚧
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-cyan-400/10 px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>

            <p className="text-slate-300 text-sm md:text-base tracking-wide">
              Feito por <span className="text-cyan-400 font-bold">Daniel Castro</span> • AUX de Topografia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
