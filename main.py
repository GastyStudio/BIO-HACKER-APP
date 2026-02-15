from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Bio-Hacker Fitness API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambia "*" por tu URL de Vercel (ej: "https://mi-app.vercel.app")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BioData(BaseModel):
    peso: float
    intensidad: int  # Escala 1-10
    temperatura: float
    hora: int        # Formato 24hs

@app.post("/calcular")
async def calcular_nutricion(data: BioData):
    # Lógica Peri-Workout (Carbos)
    pre_carbos = round(data.peso * (0.5 + (data.intensidad * 0.05)), 1)
    post_carbos = round(data.peso * (0.8 + (data.intensidad * 0.07)), 1)
    
    # Lógica Sodio (Hidratación)
    sodio = round(500 + ((data.temperatura - 20) * 20 if data.temperatura > 20 else 0))
    
    # Lógica Cafeína con Alerta de Sueño
    cafeina = round(data.peso * 4) if data.hora < 17 else round(data.peso * 2)
    alerta = "⚠️ Cuidado con el sueño" if data.hora >= 17 else "✅ Dosis segura"

    return {
        "pre": pre_carbos,
        "post": post_carbos,
        "sodio": sodio,
        "cafeina": cafeina,
        "alerta": alerta
    }