import { VercelRequest, VercelResponse } from "@vercel/node";

import { TEST_COOKIE_NAME } from "./index";
import createTopLevelRedirect from "./create-top-level-redirect";
import { setCookie } from "../helpers/nookies";

export default function createEnableCookiesRedirect(apiKey: string, path: string, appUrl: string) {
	const redirect = createTopLevelRedirect(apiKey, path, appUrl);

	return function topLevelOAuthRedirect(req: VercelRequest, res: VercelResponse) {
		// This is to avoid a redirect loop if the app doesn't use verifyRequest or set the test cookie elsewhere.
		setCookie({ res, name: TEST_COOKIE_NAME, value: "1" });
		redirect(req, res);
	};
}