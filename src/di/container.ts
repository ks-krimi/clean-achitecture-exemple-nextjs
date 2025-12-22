import { createContainer } from "awilix";

import { registerAuth } from "@/src/di/auth.container";
import { AuthCradle } from "@/src/di/types";

const container = createContainer<AuthCradle>({ injectionMode: "CLASSIC" });

registerAuth(container);

export { container };
