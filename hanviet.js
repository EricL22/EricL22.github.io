import { VARIANT_FORMS } from "./assets/data/variants.js"
import { VIET_READINGS } from "./assets/data/viet_readings.js"

function outputHanViet() {
    const paragraph = document.getElementById("demo");
    var checkString = document.getElementById("fname").value;
    var output = "";
    paragraph.textContent = "Working...";
    setTimeout(function() {
        checkString.split("").forEach(
            function(item) {
                for (const key of VARIANT_FORMS.keys()) {
                    if (VARIANT_FORMS[key][0] == item) {
                        output += VIET_READINGS[key][0];
                    }
                }
            }
        );
        paragraph.textContent = output;
    }, 1);
}

function tradConvert() {
    // To be implemented
}
