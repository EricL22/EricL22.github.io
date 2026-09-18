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
    if (document.getElementById("phon").checked)
        ziOutput = await vietOutputConvert(normalizeToNewStyle(checkString));
    else
        ziOutput = cleanHtml;
    hanziOutput.innerHTML = ziOutput;
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

// Produce a standard prompt for use in the LLM context checker
async function vietOutputConvert(checkString) {
    // Lowercase and strip punctuation for clean matching
    var cleanSentence = checkString.normalize("NFC").replace(/\p{P}/gu, " ").replace(/\s+/g, " ").trim().toLowerCase();
    var wordsInSentence = cleanSentence.split(" ");
    const lines = await loadCharactersFromFile("./assets/data/nom.tsv");
    const extractedMappings = lines
      .map(line => line.split("\t"))
      .filter(entry => wordsInSentence.includes(entry[1].trim().toLowerCase()))
      .map(entry => {
        const chineseChar = entry[0];
        const vnSyllable = entry[1].trim().toLowerCase();
        const compounds = entry[5].trim();

        return `${chineseChar} | ${vnSyllable} | ${compounds}`;
      });
    var output = extractedMappings.join("<br>");
    output = `You are performing a context-sensitive lexical substitution task, NOT a conventional translation task.

Your job is to transform the Vietnamese Source Text according to the Lexical Mappings below.

[Lexical Mappings]
${output}

[Source Text]
${checkString}

[Instructions]
1. Process the Source Text strictly from left to right.
2. Identify each Vietnamese syllable and its context case-insensitively.
3. If a syllable appears in one of the listed compound-word contexts, replace that syllable with the exact Chinese character given in the mapping. Capitalization of the Vietnamese source text must not affect whether a mapping applies.
4. Copy the mapped Chinese character VERBATIM. Do not change its Unicode form, simplify it, replace it with a synonym, or normalize it. Do NOT paraphrase, reorder, omit, combine, or add words.
5. If a syllable appears in one of the listed compound-word contexts, choose the row whose lexical field best matches the actual lexical sense of that occurrence in context. Otherwise, copy that Vietnamese syllable verbatim.
6. Retain all punctuation marks exactly as they appear in the source text, with the sole exception of hyphens, which must be removed. Eliminate spaces only where they do not immediately follow another punctuation mark.
7. Output ONLY the transformed text. Do not provide explanations, notes, analysis, or alternatives.

[Examples]
Mapping:
義 | nghĩa | ý nghĩa, nghĩa vụ, tình nghĩa

Example A
Input: ý nghĩa
Output: ý 義

Example B
Input: chủ nghĩa
Output: chủ 義

Mapping:
羅 | là | là quần áo, lụa là, ác là, giặt là

Example C
Input: 羅 một quốc gia
Output: 羅 một quốc gia

Mapping:
半 | bán | bán đảo, bắc bán cầu, bán sống bán chết
島 | đảo | bán đảo, hòn đảo, quần đảo

Example D
Input: bán đảo
Output: 半島

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
Output: 越南

Example F
Input: Việt Nam là một quốc gia.
Output: 越南𱺵𠬠國家.

[Translation]`
    return output;
}
