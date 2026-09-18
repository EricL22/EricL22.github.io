import dompurify from 'https://cdn.jsdelivr.net/npm/dompurify@3/+esm'
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
        ziOutput = await vietOutputConvert(checkString);
    else
        ziOutput = cleanHtml;
    hanziOutput.innerHTML = ziOutput;
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
    output = `You are performing a deterministic lexical substitution task, NOT a conventional translation task.

Your job is to transform the Vietnamese Source Text according to the Lexical Mappings below.

[Lexical Mappings]
${output}

[Source Text]
${checkString}

[Instructions]
1. Process the Source Text strictly from left to right.
2. Identify each Vietnamese syllable and its context.
3. If a syllable appears in one of the listed compound-word contexts, replace that syllable with the exact Chinese character given in the mapping.
4. Copy the mapped Chinese character VERBATIM. Do not change its Unicode form, simplify it, replace it with a synonym, or normalize it. Do NOT paraphrase, reorder, omit, combine, or add words.
5. If a syllable has no applicable mapping, copy that Vietnamese syllable verbatim.
6. Retain all punctuation marks exactly as they appear in the source text, with the sole exception of hyphens, which must be removed. Eliminate spaces only where they do not immediately follow another punctuation mark.
7. Output ONLY the transformed text. Do not provide explanations, notes, analysis, or alternatives.

IMPORTANT:
This is a mechanical substitution task. An unnatural-looking result is acceptable and must NOT be corrected into natural Chinese.

[Translation]`
    return output;
}
