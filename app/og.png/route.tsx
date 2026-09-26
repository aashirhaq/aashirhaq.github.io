import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Served as a real /og.png file so static hosts (GitHub Pages) send image/png.
// Referenced from the metadata in app/layout.tsx.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export async function GET() {
  const background = await readFile(join(process.cwd(), "assets", "og-background.jpg"));
  const src = `data:image/jpeg;base64,${background.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#03060d" }}>
        {/* Satori has no `inset` shorthand: explicit edges and sizes. next/image doesn't apply to image generation. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(3,6,13,0.94) 0%, rgba(3,6,13,0.84) 50%, rgba(3,6,13,0.4) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            width: "100%",
            height: "100%",
            color: "#eaf2ff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, letterSpacing: 5, color: "#5ee1ff" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#5ee1ff" }} />
            {profile.location.toUpperCase()}
          </div>
          <div style={{ marginTop: 28, fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 22, fontSize: 38, color: "#bfe9ff" }}>{profile.positioning}</div>
          <div style={{ marginTop: 8, fontSize: 30, color: "#a9b8cf" }}>{profile.positioningDetail}</div>
          <div style={{ marginTop: 48, display: "flex", gap: 44, fontSize: 24, color: "#a9b8cf" }}>
            {profile.heroIndicators.map((m) => (
              <div key={m.label} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#eaf2ff", fontWeight: 700 }}>{m.value}</span>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
