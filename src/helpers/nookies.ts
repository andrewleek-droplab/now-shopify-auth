import nookies from "nookies";
import { ServerResponse } from "http";

type BaseParams = {
	res: ServerResponse | null | undefined;
	name: string,
};

function buildContext({ res }: Pick<BaseParams, "res">) {

	if (res !== null && res !== undefined) {
		return { res };
	}

	return null;
}

type Options = {
	secure?: boolean;
	httpOnly?: boolean;
	sameSite?: string;
	path?: string;
};

const defaultOptions: Options = { secure: true, httpOnly: false, sameSite: "none", path: "/" };

type SetCookieParams = BaseParams & {
	value: string;
	options?: Options;
};

export function setCookie(params: SetCookieParams) {
	const { res, name, value } = params;
	const context = buildContext({ res });
	const options = Object.assign({}, defaultOptions, params.options);

	return nookies.set(context, name, value, options);
}

type DestroyCookieParams = BaseParams & {
	options?: Options;
};

export function destroyCookie(params: DestroyCookieParams) {
	const { res, name } = params;
	const context = buildContext({ res });
	const options = Object.assign({}, defaultOptions, params.options);

	return nookies.destroy(context, name, options);
}
