function getValues(img){
    if (!loading)for (let i = 0; i < curr.length; i++) document.getElementById("currency"+img).innerHTML+="<option value=\""+curr[i]+"\">"+curr[i]+"</option>\n"
    else setTimeout(getValues,500,img)
}

function currFlag(img){
    document.getElementsByTagName("img")[img].src = "../img/"+document.getElementById("currency"+img).value+".png";
    calc();
}

async function calc(){
    if (document.getElementsByTagName("input")[0].value !== "" ){
        const startVal = parseFloat(document.getElementsByTagName("input")[0].value);
        const fromCur = document.getElementById("currency0").value;
        const toCur = document.getElementById("currency1").value;

        let exchangeValues = await fetch("http://localhost:3000/_db");
        exchangeValues = await exchangeValues.json();
        exchangeValues = exchangeValues["/values"].mock;
        
        document.getElementById("result").innerHTML = (startVal*exchangeValues[fromCur]) / exchangeValues[toCur];
    }
}


let loading = true;
let curr;
async function setup(){
    curr = await fetch("http://localhost:3000/_db");
    curr = await curr.json()
    curr = curr["/names"].mock;
    loading = false
}