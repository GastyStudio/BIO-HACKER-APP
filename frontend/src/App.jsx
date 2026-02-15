import { useState, useCallback, useEffect } from 'react'
import ProtocolCard from './ProtocolCard'

function App() {
  const [form, setForm] = useState({
    peso: 80,
    intensidad: 5,
    temperatura: 25,
    hora: 10,
    edad: 30, // Valor inicial
    objetivo: 'Rendimiento' // Valor inicial
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);



  const calcular = useCallback(async () => {
    if (!form.peso || form.peso === 0) return;

    setLoading(true);
    try {
      const response = await fetch('https://bio-hacker-app.onrender.com/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Error conectando con Python:", error);
    } finally {
      setLoading(false); // Siempre volvemos el botón a azul
    }
  }, [form]);


  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-in fade-in duration-700">
        <img
          src="/logo.png"
          alt="Bio Hacker Logo"
          className="w-3/4 max-w-sm object-contain animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col items-center font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Aplicación <span className="text-blue-500">Bio Hacker</span></h1>
        <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em]">MOTOR EN TIEMPO REAL // V1.0</p>
      </header>

      <main className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Input label="Peso (kg)" value={form.peso}
            onChange={(e) => setForm({ ...form, peso: Number(e.target.value) })} />
          <Input label="Intensidad (1-10)" value={form.intensidad}
            onChange={(e) => setForm({ ...form, intensidad: Number(e.target.value) })} />
          <Input label="Temp (°C)" value={form.temperatura}
            onChange={(e) => setForm({ ...form, temperatura: Number(e.target.value) })} />
          <Input label="Hora (0-24)" value={form.hora}
            onChange={(e) => setForm({ ...form, hora: Number(e.target.value) })} />

          {/* Nuevos Inputs de Perfil */}
          <Input label="Edad" value={form.edad}
            onChange={(e) => setForm({ ...form, edad: Number(e.target.value) })} />

          <div className="flex flex-col">
            <label className="text-[10px] uppercase text-zinc-400 mb-1 ml-1">Objetivo</label>
            <select
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none h-[50px]"
            >
              <option value="Perder Grasa">Perder Grasa</option>
              <option value="Ganar Músculo">Ganar Músculo</option>
              <option value="Rendimiento">Rendimiento</option>
              <option value="Longevidad">Longevidad</option>
            </select>
          </div>
        </div>

        <button
          onClick={calcular}
          disabled={loading}
          className="w-full py-4 bg-blue-600 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.2)] mb-6"
        >
          {loading ? "PROCESANDO..." : "RECALCULAR AHORA"}
        </button>

        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
          <div className={`h-full bg-blue-500 w-full ${loading ? 'animate-pulse' : 'opacity-20'}`}></div>
        </div>

        {data && <ProtocolCard data={data} profile={form} />}
      </main>
    </div>
  )
}

// COMPONENTE INPUT (Solo uno y corregido)
function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] uppercase text-zinc-400 mb-1 ml-1">{label}</label>
      <input
        type="number"
        value={value === 0 ? '' : value}
        onChange={onChange}
        placeholder="0"
        className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  )
}

// COMPONENTE RESULT CARD
function ResultCard({ label, value, color }) {
  return (
    <div className="flex justify-between items-center bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800">
      <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">{label}</span>
      <span className={`text-xl font-mono font-black ${color}`}>{value}</span>
    </div>
  )
}

export default App