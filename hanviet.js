import { VARIANT_FORMS } from "./assets/data/variants.js"
import { VIET_READINGS } from "./assets/data/viet_readings.js"
var tradMode = false;

window.outputHanViet = function outputHanViet() {
    const paragraph = document.getElementById("demo");
    var checkString = document.getElementById("fname").value;
    if (tradMode) {
        var hanziOutput = document.getElementById("zi1");
    }
    else {
        var hanziOutput = document.getElementById("zi2");
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
                for (const key in VARIANT_FORMS) {
                    if (VARIANT_FORMS[key][0] == item) {
                        if (sentenceBoundary) {
                            output += capitalizeFirstLetter(VIET_READINGS[key][0]);
                            sentenceBoundary = false;
                        }
                        else {
                            output += VIET_READINGS[key][0];
                        }
                        output += " ";
                        ziOutput += item;   // convert to traditional form here
                        foundReading = true;
                        break;
                    }
                }
                if (!foundReading) {
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
                    else {
                        output += item;
                    }
                    
                    if (magicComma) {
                        if (item == " " || item == "，" || item == "、") {}
                        else { magicComma = false; }
                    }
                    ziOutput += item;
                }
            }
        );
        paragraph.textContent = output.trim();
        document.getElementById("hanviet1").textContent = "Âm Độc";
        hanziOutput.textContent = ziOutput;
    }, 1);
}

function capitalizeFirstLetter(input) {
    return input.substring(0,1).toUpperCase() + input.substring(1);
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
