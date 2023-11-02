import { outputConvert } from "/shared.js"

function msg() {
	const paragraph = document.getElementById("demo");
	const paragraph2 = document.getElementById("demo2");
	var checkString = document.getElementById("fname").value;
	paragraph.textContent = "";
	paragraph2.textContent = outputConvert(checkString, 1);
}

function define() {}
