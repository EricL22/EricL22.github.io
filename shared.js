import { TRAD_CHAR_LIST } from "./assets/data/xn-trad.js"

// input checkString (str), convert based on conv_key (int)
export function outputConvert(checkString, conv_key, delimiter = "") {
	const MAX_STRING_SIZE = 15;
	var output = "";
	while (checkString.length > 0)
	{
		for (let i = checkString.length; i > 0; i--)
		{
			var fragment = checkString.substring(0, i);
			if (fragment.length > MAX_STRING_SIZE)   continue;
			if (fragment in TRAD_CHAR_LIST && conv_key > -1 && conv_key < TRAD_CHAR_LIST[fragment].length)
			{
				output += TRAD_CHAR_LIST[fragment][conv_key] + delimiter;
				checkString = checkString.substring(i);
				break;
			}
			else if (fragment in TRAD_CHAR_LIST || !(fragment in TRAD_CHAR_LIST) && i == 1)
			{
				output += fragment + delimiter;
				checkString = checkString.substring(i);
				break;
			}
		}
	}
	return output;
}
