var emailSubject = ""; // Enter your desired subject line (optional)
var emailBody = ""; // Enter the default email body (optional)
var emailCCs = ""; // Enter comma-separated emails you want to be CC'd (optional)
function FindMP() {
    var pc = document.getElementById("pcInput").value;
    if (!IsValidCanadianPostalCode(pc)) {
        Message("Please enter a valid Canadian postal code.");
    }
    else {
        pc = pc.replace(/\s/g, '').replace('-', '');
        Message("Finding MP for: " + pc + "...");
        document.getElementById("pcForm").hidden = true;
        GetMP(pc.toUpperCase());
    }
    return true;
}
function ResetForm() {
    Message("");
    document.getElementById("pcForm").hidden = false;
    document.getElementById("pcInput").value = "";
    document.getElementById("MPInfo").innerHTML = "";
    document.getElementById("EmailLink").innerHTML = "";
}
function GetMP(pc) {
    $.getJSON('https://represent.opennorth.ca/postcodes/' + pc + '?callback=?', function (data) {
        var reps = data["representatives_centroid"];
        var repName;
        var repEmail;
        var repParty;
        var repDistrict;
        for (var x in reps) {
            if (reps[x]["elected_office"] == "MP") {
                repName = reps[x]["name"];
                repEmail = reps[x]["email"];
                repParty = reps[x]["party_name"];
                repDistrict = reps[x]["district_name"];
            }
        }
        if (repName != "" && repEmail != "") {
            document.getElementById("MPInfo").innerHTML =
                "<b>Your District: </b>" + repDistrict + "<br>" +
                    "<b>MP Name: </b>" + repName + "<br>" +
                    "<b>Party: </b>" + repParty + "<br>" +
                    "<b>MP Email: </b>" + repEmail;
            document.getElementById("EmailLink").innerHTML =
                "<a href='mailto:" + repEmail +
                    "?subject=" + encodeURIComponent(emailSubject) +
                    "&body=" + encodeURIComponent(emailBody) +
                    "&cc=" + encodeURIComponent(emailCCs) +
                    "'>Click here to email your MP!</a>";
            Message("Success! We found your MP: ");
        }
        else {
            Message("Couldn't find the name and email address of your MP. Please try a different postal code.");
        }
    });
}
function Message(msg) {
    document.getElementById("out").innerHTML = msg;
}
function IsValidCanadianPostalCode(pc) {
    var regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    var match = regex.exec(pc);
    if (match) {
        if ((pc.indexOf("-") !== -1 || pc.indexOf(" ") !== -1) && pc.length == 7) {
            return true;
        }
        else if ((pc.indexOf("-") == -1 || pc.indexOf(" ") == -1) && pc.length == 6) {
            return true;
        }
    }
    else {
        return false;
    }
}
