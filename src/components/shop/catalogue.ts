import { merch, type Merch } from "./merch";
import { smartCasual } from "./smartCasual";
import { rangeRound1 } from "./rangeRound1";
import { spreadBlack, withStag } from "./stag";

/** Everything the shop sells: partner-made kit (merch.ts, generated), the hand-fulfilled smart casual range, and Devonshire range round 1 (browse only until designs are saved). */
export const catalogue: Merch[] = spreadBlack([...withStag(merch), ...smartCasual, ...rangeRound1]);
