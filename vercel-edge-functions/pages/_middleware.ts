import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { KOALA_ID_COOKIE_NAME, fetchProfile } from "../lib/koala-node";
import { build } from "../../../edge-api-client";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const id = request.cookies[KOALA_ID_COOKIE_NAME];

  const profile = await fetchProfile({
    id,
    ip: request.ip,
    referrer: request.headers.get("Referer") ?? undefined,
    userAgent: request.ua?.ua ?? undefined,
  });

  const profileApi = build({
    ...profile.a,
    sessionStart: new Date(),
  });

  const isStartup =
    profileApi.company.foundedYear.greaterThan(2011) &&
    profileApi.company.amountRaised.lessThan(50000000);

  const isSegment = profileApi.company.name.is("Segment");

  const response = new NextResponse(
    JSON.stringify({
      id: profile.id,
      isStartup,
      isSegment,
      qualification: profile.q,
    })
  );

  if (!id || id !== profile.id) {
    response.cookie(KOALA_ID_COOKIE_NAME, profile.id);
  }

  return response;
}
