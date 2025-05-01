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
        edges: [],
        nodes: [],
      },
    });
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const { workflowId, edges, nodes, workflowName } = await req.json();
  try {
    const workflow = await prisma.workflow.update({
      data: {
        edges,
        nodes,
        name: workflowName,
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
export async function GET() {
  const {
    user: { id },
  } = (await auth()) as Session;
  try {
    const workflows = await prisma.workflow.findMany({
      where: {
        userId: id,
      },
    });
    return Response.json({ workflows }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
