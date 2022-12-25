import { VARIANT_FORMS } from "./assets/data/variants.js"
import { VIET_READINGS } from "./assets/data/viet_readings.js"
var tradMode = false;

window.outputHanViet = function outputHanViet() {
    const paragraph = document.getElementById("demo");
    var checkString = document.getElementById("fname").value;
    document.getElementById("zi1").textContent = "";
    document.getElementById("zi2").textContent = "";
    if (tradMode) {
        var hanziOutput = document.getElementById("zi2");
    }
    else {
        var hanziOutput = document.getElementById("zi1");
    }
    var output = "";
    var ziOutput = "";
    paragraph.textContent = "Working...";
    setTimeout(function() {
        let sentenceBoundary = false;
        let isASentence = false;
        let magicComma = false;
        checkString.split("").forEach(
            function(item) {
                let foundReading = false;
                let keysList = [];
                let typeList = [];
                for (const key in VARIANT_FORMS) {
                    MIDDLE_LOOP: for (const type in VARIANT_FORMS[key]) {
                        for (const charIndex in VARIANT_FORMS[key][type]) {
                            if (VARIANT_FORMS[key][type][charIndex] == item) {
                                keysList.push(key);
                                if (type == "traditional" && itemAppearsLessThanTwiceInArray(item, VARIANT_FORMS[key][type]) || 
                                    "traditional" in VARIANT_FORMS[key] && VARIANT_FORMS[key][type][charIndex] == VARIANT_FORMS[key]["traditional"][charIndex])
                                    typeList.push(charIndex);
                                else
                                    typeList.push(type);
                                foundReading = true;
                                break MIDDLE_LOOP;
                            }
                        }
                    }
                }
                if (foundReading) {
                    let selectedKey = 0;
                    let selectedKeyIndex = 0;
                    if (keysList.length > 1)
                        selectedKeyIndex = promptUserForSense(item, keysList.length, "Multiple entries have been found for the character ");
                    selectedKey = keysList[selectedKeyIndex];
                    
                    let selectedInKey = 0;
                    if (!isNaN(parseInt(typeList[selectedKeyIndex])))
                        selectedInKey = typeList[selectedKeyIndex];
                    else if (VARIANT_FORMS[selectedKey]["standard"].length > 1)
                        selectedInKey = promptUserForSense(item, VARIANT_FORMS[selectedKey]["standard"].length, "Please disambiguate between the senses of ");
                    
                    if (sentenceBoundary) {
                        output += capitalizeFirstLetter(VIET_READINGS[selectedKey][selectedInKey]);
                        sentenceBoundary = false;
                    }
                    else {
                        output += VIET_READINGS[selectedKey][selectedInKey];
                    }
                    output += " ";
                    if (tradMode && "traditional" in VARIANT_FORMS[selectedKey])
                        ziOutput += VARIANT_FORMS[selectedKey]["traditional"][selectedInKey];
                    else
                        ziOutput += VARIANT_FORMS[selectedKey]["standard"][selectedInKey];
                }
                else {
                    if (item == "。") {
                        output = output.trim() + ". ";
                        sentenceBoundary = true;
                        if (!isASentence) {
                            isASentence = true;
                            output = capitalizeFirstLetter(output)
                        }
                    }
                    else if (item == "，" || item == "、") {
                        output = output.trim() + ", ";
                        magicComma = true;
                    }
                    else if (item == "？") {
                        output = output.trim() + "? ";
                        sentenceBoundary = true;
                        if (!isASentence) {
                            isASentence = true;
                            output = capitalizeFirstLetter(output)
                        }
                    }
                    else if (item == "！") {
                        output = output.trim() + "! ";
                        sentenceBoundary = true;
                        if (!isASentence) {
                            isASentence = true;
                            output = capitalizeFirstLetter(output)
                        }
                    }
                    else if (item == "“") {
                        output += '"';
                        if (magicComma) {
                            sentenceBoundary = true;
                            magicComma = false;
                        }
                    }
                    else if (item == "”") {
                        output = output.trim() + '" ';
                    }
                    else if (item == "：") {
                        output = output.trim() + ': ';
                        magicComma = true;
                    }
                    else if (item == "；") {
                        output = output.trim() + '; ';
                    }
                    else if (item == "`") {
                        sentenceBoundary = true;
                    }
                    else {
                        output += item;
                    }
                    
                    if (magicComma) {
                        if (item == " " || item == "，" || item == "、") {}
                        else { magicComma = false; }
                    }
                    if (item != "`") { ziOutput += item; }
                }
            }
        );
        paragraph.innerText = output.trim();
        document.getElementById("hanviet1").textContent = "Âm Độc";
        hanziOutput.innerText = ziOutput;
    }, 1);
}

function capitalizeFirstLetter(input) {
    return input.substring(0,1).toUpperCase() + input.substring(1);
}

function promptUserForSense(char, maxNumber, message) {
    let promptedKey = prompt(message + char + ": Enter a number from 1 to " + maxNumber);
    if (promptedKey == null)
        promptedKey = 0;
    else {
        while (isNaN(parseInt(promptedKey)) || parseInt(promptedKey) < 1 || parseInt(promptedKey) > maxNumber)
           promptedKey = prompt("Please enter a valid number from 1 to " + maxNumber);
        promptedKey = parseInt(promptedKey) - 1;
    }
    return promptedKey;
}

function itemAppearsLessThanTwiceInArray(item, array) {
    let count = 0;
    for (let index in array) {
        if (item == "將")
            console.log(array[index]);
        if (array[index] == item)
            count++;
    }
    return count < 2;
}

window.setTradMode = function setTradMode() {
    var x = document.getElementById("tradmode");
    if (x.textContent === "") {
        x.textContent = new String("Traditional Chinese Conversion Enabled");
        x.style.fontStyle = "italic";
    } else {
        x.textContent = "";
    }
    tradMode = !tradMode;
}
