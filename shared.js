import { TRAD_CHAR_LIST } from "./assets/data/xn-trad.js"
import { VARIANT_FORMS } from "./assets/data/variants.js"

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
			var alteredFragment = replaceWithKeys(fragment);
			if (alteredFragment in TRAD_CHAR_LIST && conv_key > -1 && conv_key < TRAD_CHAR_LIST[alteredFragment].length)
			{
				output += TRAD_CHAR_LIST[alteredFragment][conv_key] + delimiter;
				checkString = checkString.substring(i);
				break;
			}
			else if (alteredFragment in TRAD_CHAR_LIST || !(alteredFragment in TRAD_CHAR_LIST) && i == 1)
			{
				if (conv_key == -1)	// use the variant form if Traditional mode enabled
					output += fragment + delimiter;
				else	// convert to standard form otherwise
					output += alteredFragment + delimiter;
				checkString = checkString.substring(i);
				break;
			}
		}
	}
	return output;
}

// variant of the above optimized for Vietnamese Quoc-Ngu orthography
export function vietOutputConvert(checkString, conv_key) {
	var output = "";
	while (checkString.length > 0)
	{
		for (let i = checkString.length; i > 0; i--)
		{
			var fragment = checkString.substring(0, i);
			if (!(fragment in TRAD_CHAR_LIST))   fragment = fragment.replaceAll("-", " ");
			if (!(fragment in TRAD_CHAR_LIST) && i > 1)   continue;
			if (fragment in TRAD_CHAR_LIST && conv_key > -1 && conv_key < TRAD_CHAR_LIST[fragment].length)
			{
				output += TRAD_CHAR_LIST[fragment][conv_key];
				checkString = checkString.substring(i);
				break;
			}
			else if (fragment in TRAD_CHAR_LIST || !(fragment in TRAD_CHAR_LIST) && i == 1)
			{
				output += fragment;
				checkString = checkString.substring(i);
				break;
			}
		}
	}
	return output;
}

// input inString (str), replace all variant forms with keys that exist in TRAD_CHAR_LIST
function replaceWithKeys(inString) {
	var output = "";
	for (let i = 0; i < inString.length; i++)
	{
		if (inString[i] in VARIANT_FORMS)
			output += VARIANT_FORMS[inString[i]];
		else
			output += inString[i];
	}
	return output;
}
