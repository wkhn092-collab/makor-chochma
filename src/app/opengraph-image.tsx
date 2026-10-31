import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "מכון מקור חכמה";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Preview image: full logo only — no extra text (WhatsApp/OG). */
export default async function OpenGraphImage() {
  const logoBytes = await readFile(join(process.cwd(), "public/logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F2EFE9",
        }}
      >
        <img
          src={logoSrc}
          width={520}
          height={520}
          alt=""
          style={{
            width: 520,
            height: 520,
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
