import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

async function main() {
  try {
    await prisma.$connect;
  } catch (error) {
    return Error("DB connection Unsuccessful.");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET");

  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ messege: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, category, content } = await req.json();
    await main();

    const post = await prisma.post.create({data:{title, category, content}}); 
    return NextResponse.json({message:"Success", post},{status:201});
  } catch (error) {
    return NextResponse.json({message:"Error", error},{status:500});
  }
  finally{
    await prisma.$disconnect();
  }
};
