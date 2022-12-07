import { build } from "@getkoala/edge-api-client";
import { NextResponse, type NextRequest } from "next/server";
import { fetchProfile, KOALA_ID_COOKIE_NAME } from "../lib/koala-node";

export default async function middleware(request: NextRequest) {
  const id = request.cookies[KOALA_ID_COOKIE_NAME];

  const profile = await fetchProfile({
    id,
    email: "matt@getkoala.com",
    ip: request.ip,
    referrer: request.headers.get("Referer"),
    userAgent: request.ua?.ua,
  });

  const profileApi = build(profile.a);

  const response = new NextResponse(
    JSON.stringify({
      id: profile.id,
      isB2B: profileApi.company.isB2B(),
      moreThan250Employees: profileApi.company.employeeCount.greaterThan(250),
      qualification: profile.q,
    })
  );

  // Set or update the Koala cookie
  if (!id || id !== profile.id) {
    response.cookie(KOALA_ID_COOKIE_NAME, profile.id);
  }

  return response;
}
