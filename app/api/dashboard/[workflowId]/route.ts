import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const { workflowId, edges, nodes } = await req.json();
  try {
    const workflow = await prisma.workflow.update({
      data: {
        edges,
        nodes,
      },
      where: {
        userId: id,
        id: workflowId,
      },
    });
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const workflowId = url.pathname.split("/").pop(); // Extract videoId from URL path
  console.log("serverrrr");
  try {
    // Fetch video data from the database using Prisma
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    // If video does not exist, return an error
    if (!workflow) {
      return Response.json({ error: "worflow not found" }, { status: 404 });
    }

    // Return the signed URL
    return Response.json({ ...workflow }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workflow:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
