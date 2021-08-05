function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function loadDate() {
    const day_names = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var date = new Date();
    document.getElementById("sendeplan_datum").innerHTML = "< " + day_names[date.getDay()] + ", " + zeroPad(date.getDate(), 2) + "." + zeroPad(date.getMonth() + 1, 2) + ". >";
}

document.addEventListener("DOMContentLoaded", loadDate);