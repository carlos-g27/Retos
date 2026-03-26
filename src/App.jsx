import { useState, useEffect } from "react";
import "./App.css";

const retos = [
  { emoji: "🦆", texto: "Camina como pato durante 10 minutos en tu casa", nivel: "Fácil" },
  { emoji: "🧦", texto: "Usa los calcetines al revés todo el día", nivel: "Fácil" },
  { emoji: "🗣️", texto: "Habla en susurros durante una hora entera", nivel: "Medio" },
  { emoji: "🖐️", texto: "No uses tu mano dominante para comer el desayuno", nivel: "Medio" },
  { emoji: "🚶", texto: "Camina hacia atrás cada vez que vayas al baño", nivel: "Fácil" },
  { emoji: "😐", texto: "No sonrías en todo el día (modo robot activado)", nivel: "Difícil" },
  { emoji: "🎵", texto: "Tararea una canción diferente cada vez que entres a un cuarto", nivel: "Fácil" },
  { emoji: "🐌", texto: "Haz todo en cámara lenta por 30 minutos", nivel: "Medio" },
  { emoji: "🤝", texto: "Saluda a todos con un apretón de manos formal, incluido tu gato", nivel: "Fácil" },
  { emoji: "🧠", texto: "Llama a las cosas por nombres incorrectos todo el día (el 'zapato' es el teléfono)", nivel: "Difícil" },
  { emoji: "💬", texto: "Responde todas las preguntas con otra pregunta", nivel: "Medio" },
  { emoji: "🎭", texto: "Actúa como si estuvieras siendo filmado para un documental de naturaleza", nivel: "Medio" },
  { emoji: "🦁", texto: "Ruge suavemente cada vez que abras una puerta", nivel: "Fácil" },
  { emoji: "🕺", texto: "Gira 360° antes de sentarte en cualquier silla", nivel: "Fácil" },
  { emoji: "📢", texto: "Anuncia en voz alta lo que vas a hacer antes de hacerlo", nivel: "Medio" },
  { emoji: "🤖", texto: "Habla como robot durante toda una reunión o llamada", nivel: "Difícil" },
  { emoji: "🐧", texto: "Mantén los brazos pegados al cuerpo todo el día, como pingüino", nivel: "Difícil" },
  { emoji: "🔢", texto: "Cuenta en voz alta cada escalón que subas o bajes", nivel: "Fácil" },
  { emoji: "🎪", texto: "Entra dramaticamente a cada habitación como si fuera tu gran entrada", nivel: "Medio" },
  { emoji: "🫥", texto: "Finge que eres invisible por 5 minutos y actúa en consecuencia", nivel: "Fácil" },
];

const nivelesColor = {
  Fácil: "nivel-facil",
  Medio: "nivel-medio",
  Difícil: "nivel-dificil",
};

function getRetoDiario() {
  const hoy = new Date();
  const seed = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
  return retos[seed % retos.length];
}

export default function App() {
  const [retoDiario] = useState(getRetoDiario());
  const [retoAleatorio, setRetoAleatorio] = useState(null);
  const [completado, setCompletado] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [estrellitas, setEstrellitas] = useState([]);

  const generarEstrellitas = () => {
    const nuevas = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setEstrellitas(nuevas);
    setTimeout(() => setEstrellitas([]), 1500);
  };

  const girarReto = () => {
    setAnimando(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * retos.length);
      setRetoAleatorio(retos[idx]);
      setAnimando(false);
    }, 400);
  };

  const marcarCompletado = () => {
    setCompletado(true);
    generarEstrellitas();
  };

  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="app">
      {/* Fondo decorativo */}
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <header className="header">
        <div className="header-badge">⚡ App de Retos</div>
        <h1 className="titulo">
          Retos<span className="titulo-acento">Absurdos</span>
        </h1>
        <p className="subtitulo">Porque la vida necesita más caos controlado</p>
      </header>

      <main className="contenido">
        {/* Reto del día */}
        <section className="card card-principal">
          <div className="card-tag">
            <span className="punto-vivo" />
            Reto de hoy · {fechaHoy}
          </div>

          <div className="emoji-grande">{retoDiario.emoji}</div>
          <p className="reto-texto">{retoDiario.texto}</p>

          <div className="card-footer">
            <span className={`nivel-badge ${nivelesColor[retoDiario.nivel]}`}>
              {retoDiario.nivel}
            </span>
            {!completado ? (
              <button className="btn-completar" onClick={marcarCompletado}>
                ✓ Lo hice
              </button>
            ) : (
              <div className="completado-msg">
                🎉 ¡Eres oficialmente absurdo!
              </div>
            )}
          </div>

          {estrellitas.map((e) => (
            <span
              key={e.id}
              className="estrellita"
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                animationDelay: `${e.delay}s`,
              }}
            >
              ✦
            </span>
          ))}
        </section>

        {/* Reto aleatorio */}
        <section className="card card-secundaria">
          <div className="card-tag">🎲 ¿Quieres más caos?</div>

          {retoAleatorio ? (
            <div className={`reto-aleatorio ${animando ? "fade-out" : "fade-in"}`}>
              <div className="emoji-mediano">{retoAleatorio.emoji}</div>
              <p className="reto-texto-sm">{retoAleatorio.texto}</p>
              <span className={`nivel-badge ${nivelesColor[retoAleatorio.nivel]}`}>
                {retoAleatorio.nivel}
              </span>
            </div>
          ) : (
            <p className="placeholder-texto">
              Pulsa el botón para descubrir un reto sorpresa 👇
            </p>
          )}

          <button className="btn-girar" onClick={girarReto}>
            <span className="btn-girar-icono">⟳</span>
            Generar reto absurdo
          </button>
        </section>

        {/* Lista de todos */}
        <section className="card card-lista">
          <div className="card-tag">📋 Todos los retos</div>
          <div className="lista-retos">
            {retos.map((r, i) => (
              <div className="lista-item" key={i}>
                <span className="lista-emoji">{r.emoji}</span>
                <span className="lista-texto">{r.texto}</span>
                <span className={`nivel-badge nivel-sm ${nivelesColor[r.nivel]}`}>
                  {r.nivel}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        Hecho con 🤪 para personas que se aburren fácilmente
      </footer>
    </div>
  );
}