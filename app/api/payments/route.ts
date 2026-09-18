// Placeholder endpoint for the future PostgreSQL-backed payment history.
export function GET() {
	return Response.json({ message: "Payments API is not connected yet." }, { status: 501 });
}
