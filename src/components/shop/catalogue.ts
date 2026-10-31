import { merch, type Merch } from "./merch";
import { smartCasual } from "./smartCasual";
import { spreadBlack, withStag } from "./stag";

/** Everything the shop sells: partner-made kit (merch.ts, generated) plus the hand-fulfilled smart casual range. */
export const catalogue: Merch[] = spreadBlack([...withStag(merch), ...smartCasual]);
