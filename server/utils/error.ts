import { NextFunction } from "express";

export default function Error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("ERROR HANDLING_____________");
  console.log(err.message);
  // return new Response({}, { status: 500, statusText: "internal server error" });
}
