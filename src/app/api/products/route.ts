import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const occasion   = searchParams.get("occasion");
  const category   = searchParams.get("category");
  const bodyShape  = searchParams.get("shape");
  const styleTags  = searchParams.get("prefs");
  const gender     = searchParams.get("gender");   // ← NEW: "men" | "women" | "unisex"
  const limit      = parseInt(searchParams.get("limit") ?? "100");

  try {
    const andConditions: object[] = [];

    if (occasion)  andConditions.push({ occasion });
    if (category)  andConditions.push({ category });

    if (bodyShape) {
      andConditions.push({ bodyShapes: { contains: bodyShape } });
    }

    if (styleTags) {
      const tagList = styleTags.split(",").map((t) => t.trim()).filter(Boolean);
      if (tagList.length > 0) {
        andConditions.push({
          OR: tagList.map((tag) => ({ styleTags: { contains: tag } })),
        });
      }
    }

    // Gender filter: include "unisex" items always, plus gender-specific
    if (gender && gender !== "all") {
      andConditions.push({
        OR: [
          { gender: gender },
          { gender: "unisex" },
        ],
      });
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : {};

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: { occasion: "asc" },
    });

    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ products: [], total: 0 });
  }
}
