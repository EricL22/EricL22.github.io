import { outputConvert } from "/shared.js"
var zi_conv_key = 1;

window.outputHanViet = function outputHanViet() {
	const paragraph = document.getElementById("demo");
	var checkString = document.getElementById("fname").value;
    document.getElementById("zi1").textContent = "";
    var hanziOutput = document.getElementById("zi1");
    var output = "";
    var ziOutput = "";
	paragraph.textContent = "Working...";
	setTimeout(function() {
		output = makeVietReadable(outputConvert(checkString, 0, " ").trim());
		ziOutput = outputConvert(checkString, zi_conv_key).replaceAll("`", "");
        paragraph.innerText = output;
        document.getElementById("hanviet1").textContent = "Âm Độc";
        hanziOutput.innerText = ziOutput;
	}, 1);
}

function makeVietReadable(input) {
	var output = input.replaceAll(" 。", ".")
					  .replaceAll(" ，", ",")
					  .replaceAll(" 、", ",")
					  .replaceAll(" ？", "?")
					  .replaceAll(" ！", "!")
					  .replaceAll(" “", '"')
					  .replaceAll(" 「", '"')
					  .replaceAll(" ”", '"')
					  .replaceAll(" 」", '"')
					  .replaceAll(" ：", ":")
					  .replaceAll(" ；", ";")
					  .replaceAll(" （", "(")
					  .replaceAll(" ）", ")")
					  .replaceAll("` ", "`");
	for (let i = 0; i < output.length; i++)
		if (output[i] == "`")
			output = output.substring(0, i) + capitalizeFirstLetter(output.substring(i+1));
	return output;
}

function capitalizeFirstLetter(input) {
    return input.substring(0,1).toUpperCase() + input.substring(1);
}

function promptUserForSense(maxNumber, message) {
    let promptedKey = prompt(message);
    if (promptedKey == null)
        promptedKey = 0;
    else {
        while (isNaN(parseInt(promptedKey)) || parseInt(promptedKey) < 1 || parseInt(promptedKey) > maxNumber)
           promptedKey = prompt("Please enter a valid number from 1 to " + maxNumber);
        promptedKey = parseInt(promptedKey) - 1;
    }
    return promptedKey;
}

function buildPromptMessage(char, maxNumber, start, choices) {
    let output = start + char + ": Enter a number from 1 to " + maxNumber + "\n\n";
    for (let index in choices) {
        let senseNum = parseInt(index) + 1;
        output += "Sense " + senseNum + ":\n\t" + choices[index] + "\n";
    }
    return output.replace(/\t/g, "    ");
}

function itemAppearsLessThanTwiceInArray(item, array) {
    let count = 0;
    for (let element of array)
        if (element == item)
            count += 1;
    return count < 2;
}

window.setTradMode = function setTradMode() {
    var x = document.getElementById("tradmode");
    if (x.textContent === "") {
        x.textContent = new String("Traditional Chinese Conversion Enabled");
        x.style.fontStyle = "italic";
		zi_conv_key = -1;
    } else {
        x.textContent = "";
		zi_conv_key = 1;
    }
}
