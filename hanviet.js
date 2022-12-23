import { VARIANT_FORMS } from "./assets/data/variants.js"
import { VIET_READINGS } from "./assets/data/viet_readings.js"

window.outputHanViet = function outputHanViet() {
    const paragraph = document.getElementById("demo");
    var checkString = document.getElementById("fname").value;
    var output = "";
    paragraph.textContent = "Working...";
    setTimeout(function() {
        checkString.split("").forEach(
            function(item) {
                for (const key in VARIANT_FORMS) {
                    if (VARIANT_FORMS[key][0] == item) {
                        output += VIET_READINGS[key][0] + " ";
                    }
                }
                if (item == "。") {
                    output += ".";
                }
                else if (item == "，" || item == "、") {
                    output += ",";
                }
                else if (item == "？") {
                    output += "?";
                }
            }
        );
        paragraph.textContent = output.trim();
    }, 1);
}

window.tradConvert = function tradConvert() {
    // To be implemented
}
