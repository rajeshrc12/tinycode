import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const url = new URL(req.url);
  const credentialType = url.pathname.split("/").pop(); // Extract videoId from URL path
  try {
    const credentials = await prisma.credential.findMany({
      where: {
        userId: id,
        type: credentialType,
      },
    });
    return Response.json({ credentials }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
