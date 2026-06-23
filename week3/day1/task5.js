const employee = [{ name: "anu", dept: "engineering", salary: 10000, exp: 3 },
{ name: "achu", dept: "dept3", salary: 1000, exp: 3 },
{ name: "abdu", dept: "dept5", salary: 1000, exp: 3 },
{ name: "john", dept: "engineering", salary: 89000, exp: 3 },
{ name: "vishnu", dept: "dept3", salary: 1000, exp: 3 },
{ name: "mihika", dept: "engineering", salary: 83000, exp: 3 },
{ name: "bhavya", dept: "engineering", salary: 90000, exp: 3 },
{ name: "unni", dept: "engineering", salary: 15000, exp: 3 },
{ name: "arun", dept: "dept5", salary: 1000, exp: 3 },
{ name: "advay", dept: "engineering", salary: 91000, exp: 3 },
{ name: "james", dept: "engineering", salary: 10000, exp: 3 },
{ name: "sam", dept: "dept3", salary: 1000, exp: 3 },
{ name: "alex", dept: "dept5", salary: 1000, exp: 3 },
{ name: "raheem", dept: "engineering", salary: 9000, exp: 3 },
{ name: "niyal", dept: "dept3", salary: 1000, exp: 3 },
{ name: "noel", dept: "engineering", salary: 83000, exp: 3 },
{ name: "setha", dept: "engineering", salary: 81000, exp: 3 },
{ name: "merin", dept: "engineering", salary: 25000, exp: 3 },
{ name: "varsha", dept: "dept5", salary: 1000, exp: 3 },
{ name: "aparna", dept: "engineering", salary: 9100, exp: 3 }];
const result = employee.filter(e => e.dept === "engineering" && e.salary > 70000).map(emp => ({ name: emp.name, salary: emp.salary })).sort((a, b) => b.salary - a.salary);
console.log(result);

//nested config object to flate variables
const data = { name: "Anu", mark: { phy: 40, che: 50, math: 38, Total: { pass: 128 } } };
const { name, mark: { phy, che, math, Total: { pass } } } = data;
console.log(name);
console.log(phy);
console.log(che);
console.log(math);
console.log(pass);
//merging of two object
const Name = { fname: "arya", lname: "vijay" };
const Mark = { phy: 89, che: 78, math: 90 };
const Result = { ...Name, ...Mark };
console.log(Object.entries(Result));
console.log(Object.keys(Result));
console.log(Object.values(Result));

//deepclone
function deepClone(obj) {
    if (obj === null || typeof obj != 'object') {
        return obj;
    }
    const clone = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}
const customer = { name: "Athulya", age: "14", order_no: "11", item: "bag" };
const copy = deepClone(customer);
console.log(copy);



