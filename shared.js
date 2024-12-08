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
			var alteredFragment = replaceWithKeys(fragment, VARIANT_FORMS);
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

// input inString (str), replace all variant forms with keys that exist in mapping (Object)
export function replaceWithKeys(inString, mapping) {
	var output = "";
	for (let i = 0; i < inString.length; i++)
	{
		let upped = inString[i].toUpperCase();
		let normed = inString[i].normalize("NFD");
		if (inString[i] in mapping)
			output += mapping[inString[i]];
		else if (normed[0] in mapping)
			output += (mapping[normed[0]] + normed.substring(1)).normalize("NFC");
		else if (upped in mapping)
			output += mapping[upped].toLowerCase();
		else if (normed[0].toUpperCase() in mapping)
			output += (mapping[normed[0].toUpperCase()] + normed.substring(1)).normalize("NFC").toLowerCase();
		else
			output += inString[i];
	}
	return output;
}
