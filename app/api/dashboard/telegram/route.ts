export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    return Response.json({}, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
