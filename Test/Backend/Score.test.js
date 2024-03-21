let rewire = require('rewire');
let averageMark = rewire("../../../script.js");

let avgMock = {
    calcAvgTest: function () {
        expect(path).to.equal("/somewhere/on/the/disk");
        cb(null, "Success!");
    }
};

myModule.__set__(
    "grades", {
        "Homework": [
            {
                "name": "hw1",
                "mark": 100,
                "dropped": false
            },
            {
                "name": "hw2",
                "mark": 90,
                "dropped": false
            }
        ],
        "Exams": [
            {
                "name": "midterm",
                "mark": 70,
                "dropped": false
            }
        ]
    }
);

myModule.readSomethingFromFileSystem(function (err, data) {
    console.log(data); // = Success!
});
