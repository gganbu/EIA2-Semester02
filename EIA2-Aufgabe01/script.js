console.log("Expecto Patronum");
let subjects = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
let predicates = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
let objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
console.log(subjects, predicates, objects);
for (let i = subjects.length; i > 0; i--) {
    //console.log(i);
    let sentence = getVerse(subjects, predicates, objects);
    console.log(sentence);
}
function getVerse(_subjects, _predicates, _objects) {
    let sub = Math.floor(Math.random() * subjects.length);
    let pre = Math.floor(Math.random() * subjects.length);
    let obj = Math.floor(Math.random() * subjects.length);
    let Vers = (" ");
    let a = _subjects[sub] + Vers + _predicates[pre] + Vers + _objects[obj];
    _subjects.splice(sub, 1);
    _predicates.splice(pre, 1);
    _objects.splice(obj, 1);
    //console.log(sub);
    return a;
}
//# sourceMappingURL=script.js.map