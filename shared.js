import { TRAD_CHAR_LIST } from "./assets/data/xn-trad.js"

// input checkString (str), convert based on conv_key (int)
export function outputConvert(checkString, conv_key, delimiter = "") {
	const MAX_STRING_SIZE = 15;
	var output = "";
	while (checkString.length > 0)
	{
		for (let i = checkString.length; i > 0; i--)
		{
			if (checkString.substring(0, i).length > MAX_STRING_SIZE)   continue;
			if (checkString in TRAD_CHAR_LIST)
			{
				if (conv_key > -1 && conv_key < TRAD_CHAR_LIST[checkString].length)
					output += TRAD_CHAR_LIST[checkString][conv_key] + delimiter;
				else
				{
					output += checkString + delimiter;
					break;
				}
			}
		}
	}
	return output;
}
