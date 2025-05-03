import { auth } from "@/auth";
import { db } from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const { name, type, apiKey } = await req.json();
  try {
    const credential = await prisma.credential.create({
      data: {
        name,
        userId: id,
        apiKey,
        type,
      },
    });
    return Response.json({ ...credential }, { status: 201 });
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

export async function PATCH(req: Request) {
  const { workflowId, credentialId, nodeId } = await req.json();
  console.log({ workflowId, credentialId, nodeId });
  try {
    const workflow = await db.collection("Workflow").updateOne(
      { _id: new ObjectId(workflowId) },
      { $set: { "nodes.$[elem].data.credentialId": credentialId } },
      {
        arrayFilters: [{ "elem.id": nodeId }],
      }
    );
    console.log(workflow);
    return Response.json({ ...workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
