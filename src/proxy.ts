import { NextResponse, type NextRequest } from "next/server";
import { isPrivatePath } from "@/lib/auth/server";

/** Marco las rutas privadas para diagnóstico; la sesión local se valida en el guard cliente. */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (isPrivatePath(request.nextUrl.pathname)) {
    response.headers.set("x-rm-private-route", "1");
  }
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/configuracion/:path*", "/galeria/:path*"],
};
