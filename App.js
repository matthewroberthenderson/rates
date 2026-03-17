import React, { useState, useEffect } from 'react';

const App = () => {
  const [balance, setBalance] = useState(569460);
  const [years, setYears] = useState(26);
  const [bankRate, setBankRate] = useState(5.64);
  const [cashRate, setCashRate] = useState(4.1);
  const [income, setIncome] = useState(4000);
  const [isSafe, setIsSafe] = useState(false);

  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  const getRepayment = (P, annualRate, yrs) => {
    const r = (annualRate / 100) / 12;
    const n = yrs * 12;
    if (r <= 0 || n <= 0) return 0;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return (monthly * 12) / 26;
  };

  const hike = cashRate - 4.10;
  const projectedRate = bankRate + hike;
  const currentF = getRepayment(balance, bankRate, years);
  const newF = getRepayment(balance, projectedRate, years);
  const diff = newF - currentF;
  const ratio = (newF / income) * 100;

  const triggerSafeWord = () => {
    setIsSafe(true);
    setCashRate(4.1);
    setTimeout(() => setIsSafe(false), 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isSafe ? 'bg-green-950' : 'bg-black'}`}
         style={{ backgroundColor: !isSafe && diff > 0 ? `rgba(${Math.min(diff * 2, 120)}, 0, 0, 1)` : undefined }}>
      
      <div className={`w-full max-w-md p-8 border-4 transition-all duration-300 ${isSafe ? 'border-green-600 shadow-[0_0_30px_rgba(22,163,74,0.5)]' : 'border-red-900 bg-zinc-950 shadow-[0_0_30px_rgba(153,27,27,0.4)]'}`}>
        <h1 className="text-red-700 text-xl font-black text-center uppercase tracking-tighter mb-6 border-b-2 border-red-900 pb-2">
          ugh RBA daddy hurt me good 😩
        </h1>

        <div className="space-y-4">
          <section>
            <label className="block text-red-700 text-xs font-bold uppercase mb-1">Principal Balance</label>
            <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-white font-mono focus:border-red-700 outline-none" />
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section>
              <label className="block text-red-700 text-xs font-bold uppercase mb-1">Years Left</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-white font-mono focus:border-red-700 outline-none" />
            </section>
            <section>
              <label className="block text-red-700 text-xs font-bold uppercase mb-1">Bank Rate %</label>
              <input type="number" step="0.01" value={bankRate} onChange={(e) => setBankRate(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-white font-mono focus:border-red-700 outline-none" />
            </section>
          </div>

          <section className="bg-red-950/20 p-4 border border-dashed border-red-900">
            <label className="block text-red-700 text-xs font-bold uppercase mb-1">Future RBA Cash Rate %</label>
            <input type="number" step="0.05" value={cashRate} onChange={(e) => setCashRate(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-white font-mono focus:border-red-700 outline-none" />
          </section>

          <section className="bg-zinc-900 p-4 border border-zinc-800">
            <label className="block text-zinc-500 text-xs font-bold uppercase mb-1">🧂 Salt: Fortnightly Income</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full bg-black border-2 border-zinc-800 p-3 text-white font-mono focus:border-red-700 outline-none" />
            <div className="mt-4 flex justify-between text-sm uppercase font-bold">
              <span>Income Devoured:</span>
              <span className={ratio > 40 ? 'text-red-500' : 'text-white'}>{ratio.toFixed(1)}%</span>
            </div>
          </section>

          <div className="p-4 bg-zinc-900 border-2 border-zinc-800 text-center">
            <div className="text-zinc-500 text-xs uppercase mb-1 font-bold">New Projected Payment</div>
            <div className="text-2xl font-black font-mono text-white">{formatter.format(newF)}</div>
            {diff > 0 && <div className="text-red-600 font-black text-lg mt-1">+ {formatter.format(diff)} / F'NIGHT</div>}
          </div>

          <button onClick={triggerSafeWord} className="w-full border border-zinc-800 text-zinc-600 py-2 text-[10px] tracking-[0.2em] uppercase hover:text-white hover:border-white transition-colors">
            Safe Word: "CASHFLOW"
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;