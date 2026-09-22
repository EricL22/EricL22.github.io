import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3/+esm'
import { loadCharactersFromFile } from "./shared.js"

window.outputHanNom = async function outputHanNom() {
    const paragraph = document.getElementById("demo");
    var checkString = document.getElementById("fname").value;
    var hanziOutput = document.getElementById("zi1");
    var ziOutput = "";
    paragraph.innerText = "";
    const cleanHtml = DOMPurify.sanitize(checkString, {
        ALLOWED_TAGS: ["span"],
        ALLOWED_ATTR: ["class"]
    });
    hideGraphic("error");
    showGraphic("loading");
    try {
        ziOutput = await replaceWithValidMappings(normalizeToNewStyle(checkString));
        ziOutput = ziOutput.replaceAll("\n", "<br>");
    } catch (error) {
        showGraphic("error");
    } finally {
        hideGraphic("loading");
    }
    hanziOutput.innerHTML = ziOutput;
}

async function replaceWithValidMappings(checkString) {
    const tokens = tokenizeSentence(checkString);
    // split into a list of syllables; strip punctuation and lowercase
    var wordsInSentence = tokens
      .filter(token => /\p{L}/u.test(token))
      .map(word => word.toLowerCase());
    // read database
    const lines = await loadCharactersFromFile("./assets/data/nom.tsv");
    // create both the natural-language lexical mappings for the Gemini prompt and a separate object for validation
    const mappingObject = {};
    const extractedMappings = lines
      .map(line => line.split("\t"))
      .filter(entry => wordsInSentence.includes(entry[1].trim().toLowerCase()))
      .map(entry => {
        const chineseChar = entry[0];
        const vnSyllable = entry[1].trim().toLowerCase();
        const compounds = entry[5].trim();

        if (!mappingObject[vnSyllable]) {
            mappingObject[vnSyllable] = new Set();
        }
        mappingObject[vnSyllable].add(chineseChar);

        return `${chineseChar} | ${vnSyllable} | ${compounds}`;
      });
    var inputMappings = extractedMappings.join("\n");
    //var geminiOutput = await askGemini(vietOutputConvert(inputMappings, checkString));
    return vietOutputConvert(inputMappings, checkString);
    // verify that Gemini outputs JSON, as intended
    /*let result;
    try {
        result = JSON.parse(geminiOutput);
        if (!Array.isArray(result.replacements)) throw new Error("replacements must be an array");
    } catch (error) {
        console.error("Gemini returned invalid JSON:", error);
    }
    return buildOutput(tokens, result, mappingObject);*/
}

function tokenizeSentence(text) {
    return text.normalize("NFC")
        .match(/\p{L}+(?:['’]\p{L}+)*|\s+|\p{P}+|[^\p{L}\p{P}\s]+/gu) || [];
}

function buildOutput(tokens, geminiResult, mappingObject) {
    var output = "";
    var lastReplaced = false;   // was the previous token replaced?
    let wordIndex = 0;
    for (const token of tokens) {
        // Preserve punctuation, spaces, numbers, etc.
        if (!/\p{L}/u.test(token)) {
            if (/^\s+$/.test(token) && lastReplaced) {  // remove space if the last token was replaced
                continue;
            }
            output += token;
            lastReplaced = false;
            continue;
        }

        const word = token.toLowerCase();
        const replacement = geminiResult.replacements[wordIndex];

        if (mappingObject[word]?.has(replacement)) {
            output += replacement;
            lastReplaced = true;
        } else {
            output += token;
            lastReplaced = false;
        }

        wordIndex++;
    }
    return output;
}

// Produce a standard prompt for use in the LLM context checker
function vietOutputConvert(inputMappings, checkString) {
    output = `You are performing a context-sensitive lexical substitution task, NOT a conventional translation task.

Your job is to transform the Vietnamese Source Text according to the Lexical Mappings below.

[Lexical Mappings]
${inputMappings}

[Source Text]
${checkString}

[Instructions]
1. Process the Source Text strictly from left to right.
2. Identify each Vietnamese syllable and its context case-insensitively.
3. Identify each potential Vietnamese lexical item and its context case-insensitively. For each item, consider the candidate Chinese characters provided by the Lexical Mappings. Use the surrounding context to determine which candidate, if any, best fits the actual lexical sense.
4. Copy the mapped Chinese character VERBATIM. Do not change its Unicode form, simplify it, replace it with a synonym, or normalize it. Do NOT paraphrase, reorder, omit, combine, or add words.
5. For each mapped Vietnamese lexical item, choose the best applicable Chinese character from the mappings based on context. If only one candidate is provided, always use it. The listed lexical contexts are illustrative, not exhaustive.
6. Treat each contiguous Vietnamese syllable as a separate output unit. Preserve every remaining source syllable in left-to-right order.
7. Hyphens, spaces, punctuation, and other non-letter separators do not produce output units. They MUST NOT produce elements in the replacements array. 
8. Any syllable, word, or character not covered by the above rules must be copied verbatim.
9. Output ONLY the transformed JSON. Do not provide explanations, notes, analysis, or alternatives. Do not wrap the JSON in Markdown code fences. The output MUST be valid JSON matching exactly this schema:
{
  "replacements": ["string", "string", ...]
}

[Examples]
Mapping:
義 | nghĩa | ý nghĩa, nghĩa vụ, tình nghĩa

Example A
Input: ý nghĩa
Output:
{
    "replacements": [
        "ý",
        "義"
    ]
}

Example B
Input: chủ nghĩa
Output:
{
    "replacements": [
        "chủ",
        "義"
    ]
}

Mapping:
羅 | là | là quần áo, lụa là, ác là, giặt là

Example C
Input: là một quốc gia
Output:
{
    "replacements": [
        "羅",
        "một",
        "quốc",
        "gia"
    ]
}

Mapping:
半 | bán | bán đảo, bắc bán cầu, bán sống bán chết
島 | đảo | bán đảo, hòn đảo, quần đảo

Example D
Input: Bán-đảo, ca-khúc
Output:
{
    "replacements": [
        "半",
        "島",
        "ca",
        "khúc"
    ]
}

Mapping:
男 | nam | nam nữ, nam sinh
南 | nam | phương nam, đông nam
越 | việt | Việt Nam, người Việt, siêu việt
羅 | là | là quần áo, lụa là, ác là, giặt là
𱺵 | là | tức là, đó là
𠬠 | một | một cái, một chiếc, một ít
國 | quốc | quốc tịch, quốc tế
家 | gia | gia đình, gia dụng, nho gia

Example E
Input: Việt Nam
Output:
{
    "replacements":
    [
        "越",
        "南"
    ]
}

Example F
Input: Việt Nam là một quốc gia.
Output:
{
    "replacements": [
        "越",
        "南",
        "𱺵",
        "𠬠",
        "國",
        "家"
    ]
}

[Output]`
    return output;
}

async function askGemini(userPrompt) {
    try {
        const vercelUrl = "https://vercel-backend-kappa-lovat.vercel.app/api/generate";
        
        const response = await fetch(vercelUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userPrompt }),
        });
        
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        return data.text;
    } catch (error) {
        console.error("Error contacting backend:", error);
        throw error;
    }
}

function normalizeToNewStyle(text) {
    if (!text) return "";
    
    // Mapping of Traditional Style (key) to New Style (value)
    const newStyleToneMap = {
        // oa cluster (e.g., hóa -> hoá)
        "óa": "oá", "òa": "oà", "ỏa": "oả", "õa": "oã", "ọa": "oạ",
        // oe cluster (e.g., khỏe -> khoẻ)
        "óe": "oé", "òe": "oè", "ỏe": "oẻ", "õe": "oẽ", "ọe": "oẹ",
        // uy cluster (e.g., thủy -> thuỷ)
        "úy": "uý", "ùy": "uỳ", "ủy": "uỷ", "ũy": "uỹ", "ụy": "uỵ"
    };
    
    // 1. Enforce Unicode NFC to prevent broken combined accents
    let normalized = text.normalize("NFC");
    
    // 2. Replace traditional clusters with new style clusters
    const regex = new RegExp(Object.keys(newStyleToneMap).join("|"), "g");
    return normalized.replace(regex, (match) => newStyleToneMap[match]);
}

function showGraphic(graphicName) {
    document.getElementById(graphicName).hidden = false;
}

function hideGraphic(graphicName) {
    document.getElementById(graphicName).hidden = true;
}
