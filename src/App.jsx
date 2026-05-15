
import React, { useEffect, useMemo, useState } from 'react';

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
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black">
            🚧 Concreto Diário
          </h1>

          <p className="text-slate-400 text-xl mt-3">
            Controle simples de concretagem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl">
            <p className="text-slate-400 text-lg">
              Volume Atual
            </p>

            <h2 className="text-7xl font-black mt-5 text-blue-400">
              {volumeAtual}
            </h2>

            <p className="text-3xl mt-2">m³</p>
          </div>

          <div className="bg-emerald-500 rounded-3xl p-8 text-black shadow-2xl">
            <p className="text-lg font-bold">
              Total do Dia
            </p>

            <h2 className="text-7xl font-black mt-5">
              {totalDia}
            </h2>

            <p className="text-3xl mt-2">m³</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-black mb-8">
            Novo Lançamento
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              value={estacaInicial}
              onChange={(e) => setEstacaInicial(e.target.value)}
              placeholder="Estaca Inicial"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />

            <input
              value={estacaFinal}
              onChange={(e) => setEstacaFinal(e.target.value)}
              placeholder="Estaca Final"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />

            <input
              type="number"
              value={quantidadeCaminhao}
              onChange={(e) => setQuantidadeCaminhao(e.target.value)}
              placeholder="Quantidade de Caminhão"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />

            <input
              type="number"
              value={comprimento}
              onChange={(e) => setComprimento(e.target.value)}
              placeholder="Comprimento"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />

            <input
              type="number"
              value={largura}
              onChange={(e) => setLargura(e.target.value)}
              placeholder="Largura"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />

            <input
              type="number"
              value={espessura}
              onChange={(e) => setEspessura(e.target.value)}
              placeholder="Espessura"
              className="bg-slate-900 rounded-2xl p-5 text-lg outline-none border border-slate-700"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              onClick={adicionarLancamento}
              className="flex-1 bg-blue-600 hover:bg-blue-500 transition py-5 rounded-2xl text-2xl font-black"
            >
              Adicionar
            </button>

            <button
              onClick={limparDia}
              className="flex-1 bg-red-500 hover:bg-red-400 transition py-5 rounded-2xl text-2xl font-black"
            >
              Limpar Dia
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl mt-8">
          <h2 className="text-3xl font-black mb-8">
            Histórico do Dia
          </h2>

          <div className="space-y-4">
            {lancamentos.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold">
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
                  <h4 className="text-3xl font-black text-blue-400">
                    {item.volume} m³
                  </h4>
                </div>
              </div>
            ))}

            {lancamentos.length === 0 && (
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center text-slate-400 text-xl">
                Nenhum lançamento hoje.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
