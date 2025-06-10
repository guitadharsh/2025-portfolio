import { createRequestHandler } from "@remix-run/vercel";
import * as build from "@remix-run/vercel/server-build";

export default createRequestHandler({ build });
