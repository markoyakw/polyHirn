import generateCssVariables from "@root/scripts/generateCssVariables"
import { writeFileSync } from "fs"
import type { NextConfig } from "next"
import path from "path"

function writeTokens() {
  try {
    const css = generateCssVariables()

    writeFileSync(
      path.resolve("src/globalStyles/variables.generated.css"),
      css,
      "utf-8",
    )

    console.log("CSS global variable tokens generated successfully")
  } catch (err) {
    console.error("Failed to generate CSS global variable tokens", err)
    process.exit(1)
  }
}

// runs when Next loads the config to generate the css from ts tokens on:
// - `next dev`
// - `next build`
writeTokens()

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  reactStrictMode: false,
}

export default nextConfig