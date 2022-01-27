function Election(num) {
    this.name = `Test ${num}`;
    this.id = num;
}
let data;
export function getEntry(num) {
    return data.find((item) => item.id === num)
}
export function getData() {
    data = [];
    for (let i = 0; i < 20; i++) {
        data.push(new Election(i));
    }
    return data;
}