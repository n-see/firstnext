import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";


// interface Props {
//     params: {id: number}
// }


export async function GET(request:NextRequest,{params}:{params:{id:string}}) {

    //fetch the data from a db

    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!user) 
        return NextResponse.json({error: 'Userer not found'}, {status: 404})
        return NextResponse.json(user)

}

export async function PUT(request:NextRequest,{params}:{params:{id:string}}) {
    //validate the request of body
    const body = await request.json()
    //if invalid, return 400
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    }) 
    //if doesn't exist 404
    if(!user)
        return NextResponse.json({error:"User not Found"}, {status: 404})
    //fetch the user with the given id
    const updatedUser = await prisma.user.update({
        where:{id:user.id},
        data:{
            name: body.name,
            email: body.email
        }
    })
    //update the user
    return NextResponse.json(updatedUser);
    //return the updated user

}

export async function DELETE (request:NextRequest, {params}: {params:{id:string}}) {
    //fetch  user db
    //if not found 404
    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!user)
        return NextResponse.json({error: "user not found"}, {status: 404})
    //delete the user db
    await prisma.user.delete({
        where: {id: user.id}
    })
    return NextResponse.json({})
}