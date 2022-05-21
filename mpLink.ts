
var emailSubject = "Example Subject"; // Enter your desired subject line (optional)
var emailBody = "Example Body"; // Enter the default email body (optional)
var emailCCs = "info@climatemessengers.ca"; // Enter comma-separated emails you want to be CC'd (optional)

function FindMP() {
    var pc = (document.getElementById("pcInput") as HTMLInputElement).value;
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
    (document.getElementById("pcInput") as HTMLInputElement).value = "";
    (document.getElementById("MPInfo") as HTMLInputElement).innerHTML = "";
    (document.getElementById("EmailLink") as HTMLInputElement).innerHTML = "";
}

function GetMP(pc: string) {
    $.getJSON('https://represent.opennorth.ca/postcodes/' + pc + '?callback=?', function (data) {
        var reps = data["representatives_centroid"];
        var repName;
        var repEmail;
        var repParty;
        for (let x in reps) {
            if (reps[x]["elected_office"] == "MP") {
                repName = reps[x]["name"];
                repEmail = reps[x]["email"];
                repParty = reps[x]["party_name"];
            }
        }
        if (repName != "" && repEmail != "") {
            (document.getElementById("MPInfo") as HTMLInputElement).innerHTML =
                "<b>MP Name: </b>" + repName + "<br>" +
                "<b>MP Email: </b>" + repEmail + "<br>" +
                "<b>Party: </b>" + repParty;
            (document.getElementById("EmailLink") as HTMLInputElement).innerHTML =
                "<a href='mailto:" + repEmail + 
                "?subject=" + encodeURIComponent(emailSubject) + 
                "&body=" + encodeURIComponent(emailBody) +
                "&cc=" + encodeURIComponent(emailCCs) +
                "'>Click here to email your MP!</a>";
            Message("Success! We found your MP: ");
        }
        else {
            Message("Couldn't find the name and email address of your MP. Please try a different postal code.")
        }
    });
}

function Message(msg: string) {
    document.getElementById("out").innerHTML = msg;
}

function IsValidCanadianPostalCode(pc: string): boolean {
    var regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    var match = regex.exec(pc);
    if (match) {
        if ((pc.indexOf("-") !== -1 || pc.indexOf(" ") !== -1) && pc.length == 7) {
            return true;
        } else if ((pc.indexOf("-") == -1 || pc.indexOf(" ") == -1) && pc.length == 6) {
            return true;
        }
    } else {
        return false;
    }
}