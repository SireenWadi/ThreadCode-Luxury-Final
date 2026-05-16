"use client";

const codeSnippet = `
const styleEngine = {
  analyze: (body: BodyShape, occasion: Occasion) => {
    const palette = derivePalette(body.undertone)
    const silhouette = mapSilhouette(body.shape)
    return { palette, silhouette }
  },
  score: (outfit: Outfit[]) => {
    return outfit.reduce((acc, item) => {
      return acc + compatibility(item, occasion)
    }, 0) / outfit.length
  }
}

interface Product {
  id: string
  name: string
  brand: string
  category: Category
  occasion: Occasion
  compatibilityScore: number
}

type BodyShape = 
  | 'rectangle'
  | 'invertedTriangle'
  | 'hourglass'

const occasions = [
  'JOB_INTERVIEW',
  'GYM',
  'DINNER_NIGHT',
] as const

function derivePalette(undertone: string) {
  const map = {
    warm: ['#c9a97a', '#d4b896'],
    cool: ['#b8b8d0', '#d4d4e8'],
    neutral: ['#c8c8c0', '#e0ddd8'],
  }
  return map[undertone] ?? map.neutral
}
`.repeat(8);

export function CodeWatermark() {
  return (
    <div
      className="code-watermark"
      aria-hidden="true"
      style={{ padding: "2rem 3rem" }}
    >
      {codeSnippet}
    </div>
  );
}
