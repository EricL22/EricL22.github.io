import { VARIANT_FORMS } from "./assets/data/variants.js"
import { VIET_READINGS } from "./assets/data/viet_readings.js"
var tradMode = false;

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
                    output = output.trim() + ".";
                }
                else if (item == "，" || item == "、") {
                    output = output.trim() + ",";
                }
                else if (item == "？") {
                    output = output.trim() + "?";
                }
            }
        );
        paragraph.textContent = output.trim();
    }, 1);
}

window.setTradMode = function setTradMode() {
    var x = document.getElementById("tradmode");
    if (x.textContent === "") {
        x.textContent = new String("Compatibility Mode Enabled");
        x.style.fontStyle = "italic";
    } else {
        x.textContent = "";
    }
    tradMode = !tradMode;
}
