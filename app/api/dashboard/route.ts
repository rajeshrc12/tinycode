import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST() {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const workflow = await prisma.workflow.create({
      data: {
        userId: id,
      },
    });
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
export async function PATCH() {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const workflow = await prisma.workflow.create({
      data: {
        userId: id,
      },
    });
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
