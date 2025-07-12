import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export default dayjs;
