ogUsers = [{ name: 'lenin', age: 32, id: 1 }, { name: 'brusli', age: 15, id: 7 }, { name: 'john', age: 37, id: 8 }, { name: 'clara', age: 22, id: 4 }]
function updateUserImpure(users, id, changes) {
    const user = users.find(u => u.id === id);
    if (user) {
        Object.assign(user, changes);
    }
    return users;
}
const impureResult = updateUserImpure(ogUsers, 8, { name: 'merkle' });
console.log(impureResult);

function updateUserPure(users, id, changes) {
    const u = users.map(user => {
        if (user.id === id) {
            return { ...user, ...changes };
        }
        return user;
    })
    return u;
}
const pureResult = updateUserPure(ogUsers, 1, { name: 'merkle' });
console.log(pureResult);
console.log(ogUsers[0].name);

//Five step pipeline
const data = `name,email,age
joshi,joshi@gmail.com,23
viraj,viraj@gmail.com,35`;

const parseCSV = (csvString) => {
    const [headerLines, ...lines] = csvString.trim().split('\n');
    const headers = headerLines.split(',');
    return lines.map((line) => {
        const values = line.split(",");
        return headers.reduce((obj, header, index) => {
            return { ...obj, [header.trim()]: values[index]?.trim() };
        }, {});
    });
};
const validateRows = (rows) => {
    return rows.map((row) => {
        const isValid = row.name && row.email?.includes("@") && Number(row.age) > 0;
        return { ...row, isValid };
    });
};

const transformRows = (rows) => {
    return rows.map((row) => {
        return {
            ...row, name: row.name ? row.name.toUpeerCase : " ", age: Number(row.age) || 0,
        };
    });
};

const filterInvalid = (row) => {
    return row.filter((row) => row.isValid === true)
}

const formatOutput = (rows) => {
    const cleanRows = rows.map(({ isValid, ...rest }) => rest);
    return JSON.stringify(cleanRows, null, 2);
};
const pipe = (...functions) => (initialValue) =>
    functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), initialValue);
const runCsvPipeline = pipe(
    parseCSV,
    validateRows,
    transformRows,
    filterInvalid,
    formatOutput
);
const result = runCsvPipeline(data);
console.log(result);


//DeepFreeze(obj) recursively free
"use strict";
const student = {
    name: "Athul",
    marks: {
        phy: 80, chem: 76, Math: 95,
    },
    sub: ["phy", "chem", "math"],
};
const deepFreeze = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    Object.keys(obj).forEach((key) => {
        deepFreeze(obj[key]);
    });
    return Object.freeze(obj);
}
const deepFreezeStudent = deepFreeze(student);
console.log("Before Changes");
console.log(deepFreezeStudent);
try {
    deepFreezeStudent.sub[0] = 'bio';
}
catch (e) {
    console.log(`Error:${e.message}`);
}
console.log("After Changes");
console.log(deepFreezeStudent);