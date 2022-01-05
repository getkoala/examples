import { NextResponse, type NextRequest } from "next/server";
import { KOALA_ID_COOKIE_NAME, fetchProfile } from "../lib/koala-node";
import { build } from "@koala-live/edge-api-client";

export default async function middleware(request: NextRequest) {
  const id = request.cookies[KOALA_ID_COOKIE_NAME];

  const profile = await fetchProfile({
    id,
    email: "matthew.shwery@segment.com",
    ip: request.ip,
    referrer: request.headers.get("Referer"),
    userAgent: request.ua?.ua,
  });

  const profileApi = build({
    ...profile.a,
    sessionStart: new Date(),
  });

  const response = new NextResponse(
    JSON.stringify({
      id: profile.id,
      isB2B: profileApi.company.isB2B(),
      moreThan250Employees: profileApi.company.employeeCount.greaterThan(250),
      qualification: profile.q,
    })
  );

  if (!id || id !== profile.id) {
    response.cookie(KOALA_ID_COOKIE_NAME, profile.id);
  }

  return response;
}
