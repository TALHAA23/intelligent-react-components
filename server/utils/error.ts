export default function Error(err: Error) {
  console.log(err.message);
  // return new Response({}, { status: 500, statusText: "internal server error" });
}
