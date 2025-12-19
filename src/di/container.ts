import { createContainer } from "awilix";
import { registerAuth } from "./auth.container";
import { AuthCradle } from "./types";

const container = createContainer<AuthCradle>({ injectionMode: "CLASSIC" });

registerAuth(container);

export { container };
