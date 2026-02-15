


const ProtocolCard = ({ data, profile }) => {
    if (!data) return null;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Mi Protocolo Bio Hacker',
                    text: `Resultados: Pre: ${data.pre}g, Post: ${data.post}g`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error compartiendo', error);
            }
        } else {
            alert('¡Listo! Captura esta pantalla para compartirla en tus historias.');
        }
    };

    return (
        <div className="w-full mx-auto bg-zinc-950 border border-zinc-800/60 rounded-4xl overflow-hidden shadow-2xl font-sans relative animate-in fade-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/5">
            {/* Glow Decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/20 blur-[60px] pointer-events-none rounded-full"></div>

            {/* Header */}
            <div className="relative pt-8 pb-6 text-center z-10">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-none">
                    BIO <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">HACKER</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 opacity-60">
                    <div className="h-px w-8 bg-zinc-600"></div>
                    <p className="text-[10px] text-zinc-400 font-mono tracking-[0.2em] uppercase">V1.0 • Motor de Rendimiento</p>
                    <div className="h-px w-8 bg-zinc-600"></div>
                </div>
            </div>

            {/* User Data Tag */}
            <div className="mx-6 mb-6 bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-xl py-2 px-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">PERFIL</span>
                    <span className="text-xs text-zinc-300 font-bold">{profile?.edad || '--'} Años</span>
                </div>
                <div className="h-6 w-px bg-zinc-800"></div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">OBJETIVO</span>
                    <span className="text-xs text-blue-400 font-bold">{profile?.objetivo || 'Rendimiento'}</span>
                </div>
            </div>

            {/* Results Grid */}
            <div className="px-6 pb-6 space-y-3 z-10 relative">
                <div className="grid grid-cols-2 gap-3">
                    {/* Pre-Carbs */}
                    <div className="bg-zinc-900/50 hover:bg-zinc-900 transition-colors p-4 rounded-2xl border border-white/5 relative group">
                        <p className="text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1 group-hover:text-blue-400 transition-colors">🔥 Pre-Workout</p>
                        <p className="text-3xl font-black text-white font-mono tracking-tighter">{data.pre}<span className="text-sm text-zinc-600 font-sans ml-1 font-bold">g</span></p>
                    </div>

                    {/* Post-Carbs */}
                    <div className="bg-zinc-900/50 hover:bg-zinc-900 transition-colors p-4 rounded-2xl border border-white/5 relative group">
                        <p className="text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1 group-hover:text-green-400 transition-colors">⚡ Post-Workout</p>
                        <p className="text-3xl font-black text-white font-mono tracking-tighter">{data.post}<span className="text-sm text-zinc-600 font-sans ml-1 font-bold">g</span></p>
                    </div>
                </div>

                {/* Sodium */}
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-yellow-500/20 transition-colors">
                    <div>
                        <p className="text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1 group-hover:text-yellow-500 transition-colors">🧂 Sodio (Sal)</p>
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => <div key={i} className="h-1 w-4 bg-yellow-500/20 rounded-full group-hover:bg-yellow-500/50 transition-colors"></div>)}
                        </div>
                    </div>
                    <p className="text-3xl font-black text-white font-mono tracking-tighter">{data.sodio}<span className="text-sm text-zinc-600 font-sans ml-1 font-bold">mg</span></p>
                </div>

                {/* Caffeine */}
                <div className="bg-linear-to-br from-zinc-900 to-zinc-950 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-2">☕ Cafeína</p>
                            <span className={`inline-block px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wide border ${data.alerta.includes('Cuidado') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                {data.alerta}
                            </span>
                        </div>
                        <p className="text-4xl font-black text-white font-mono tracking-tighter drop-shadow-lg">{data.cafeina}<span className="text-sm text-zinc-600 font-sans ml-1 font-bold">mg</span></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 bg-black/60 backdrop-blur-md border-t border-white/5 text-center">
                <p className="text-[9px] text-zinc-600 mb-4 font-medium uppercase tracking-widest">Protocolo generado por <span className="text-white font-bold">@Gastycoriaok</span></p>

                <button
                    onClick={handleShare}
                    className="w-full py-4 bg-white text-black rounded-xl font-black text-xs tracking-[0.15em] hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] uppercase flex items-center justify-center gap-2 group"
                >
                    <span>Compartir Resultado</span>
                    <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default ProtocolCard;
