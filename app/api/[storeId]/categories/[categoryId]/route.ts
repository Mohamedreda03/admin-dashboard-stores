import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is Required", { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is Required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is Required", { status: 400 });
    }

    const storeByUser = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);  } catch (error) {
    console.log("[CATEGORY_PATCH]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category Id id is Required", { status: 400 });
    }

    const storeByUser = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
