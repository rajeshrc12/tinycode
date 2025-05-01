import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const { name, type, apiKey } = await req.json();
  try {
    const workflow = await prisma.credential.create({
      data: {
        name,
        userId: id,
        apiKey,
        type,
      },
    });
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function GET() {
  const {
    user: { id },
  } = (await auth()) as Session;
  try {
    const credentials = await prisma.credential.findMany({
      where: {
        userId: id,
      },
    });
    return Response.json({ credentials }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
