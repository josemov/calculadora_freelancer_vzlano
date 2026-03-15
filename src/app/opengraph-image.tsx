import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Calculadora de Tarifa para Freelancers — PayPal, Zinli y Binance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #030712 0%, #0f0f1a 50%, #030712 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glows */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 14, color: "#a5b4fc", letterSpacing: 1 }}>
            HERRAMIENTA GRATUITA PARA FREELANCERS
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -1,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Calculadora de Tarifa
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              background: "linear-gradient(90deg, #818cf8, #c084fc)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: -1,
              lineHeight: 1.1,
            }}
          >
            para Freelancers
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Calcula tu tarifa por hora y ajústala según las comisiones de cada plataforma de pago
        </p>

        {/* Platform pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { name: "PayPal", fee: "5.4%", color: "#1d4ed8", bg: "rgba(29,78,216,0.15)", border: "rgba(59,130,246,0.4)" },
            { name: "Zinli",  fee: "2.9%", color: "#7c3aed", bg: "rgba(124,58,237,0.15)", border: "rgba(139,92,246,0.4)" },
            { name: "Binance", fee: "0%",  color: "#b45309", bg: "rgba(180,83,9,0.15)",   border: "rgba(245,158,11,0.4)" },
            { name: "Payoneer", fee: "2%", color: "#b45309", bg: "rgba(234,88,12,0.15)",  border: "rgba(249,115,22,0.4)" },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: p.bg,
                border: `1px solid ${p.border}`,
                borderRadius: 16,
                padding: "14px 24px",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: "#f9fafb" }}>{p.name}</span>
              <span style={{ fontSize: 14, color: "#9ca3af" }}>Comisión {p.fee}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <p style={{ position: "absolute", bottom: 28, fontSize: 16, color: "#4b5563" }}>
          calculadora-freelance.vercel.app
        </p>
      </div>
    ),
    { ...size }
  );
}
