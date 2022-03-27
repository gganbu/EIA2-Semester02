namespace Script {

    let subjects: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicates: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    console.log(subjects, predicates, objects);

    for (let i: number = subjects.length; i > 0; i--) {
        //console.log(i);

        let sentence: string = getVerse(subjects, predicates, objects);
        console.log(sentence);
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]) {

        let sub: number = Math.floor(Math.random() * subjects.length);
        let pre: number = Math.floor(Math.random() * subjects.length);
        let obj: number = Math.floor(Math.random() * subjects.length);

        let Vers: string = (" ");

        let a: string = _subjects[sub] + Vers + _predicates[pre] + Vers + _objects[obj];

        _subjects.splice(sub, 1);
        _predicates.splice(pre, 1);
        _objects.splice(obj, 1);

        //console.log(sub);

        return a;

    }
}