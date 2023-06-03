const name1 = 'Inje'
const region = 'Seoul'

function myTagFunction(Strings, nameExp, regionExp) {
    let str0 = String[0]
    let str1 = String[1]
    let str2 = String[2]

    return `${str0}${nameExp}${str1}${regionExp}${str2}`
}

const output = myTagFunction`제 이름은 ${name1}이고, 사는 곳은 ${region}입니다.`

console.log(output)