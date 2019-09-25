function eval() {
    // Do not use eval!!!
    return;
}

function eval() {
  // Do not use eval!!!
  return;
}

// сложение и вычитание
const plusMinus = str => {
  let result = str;
  while (isNaN(Number(result)) && (result.includes("+") || result.includes("-"))) {
    const strArr = result.split("");
    // находим индекс индекс и тип операции
    let index = null;
    if (result.includes("+") && result.includes("-")) {
      index = Math.min(result.indexOf("+"), result.indexOf("-"));
    } else {
      index = Math.max(result.indexOf("+"), result.indexOf("-"));
    }
    const type = result[index];
    const nums = [];
    const forSplice = [];
    // находим число перед операцией
    for (let i = index - 1; i >= 0; i--) {
      if (isNaN(Number(result[i]))) {
        nums.push(result.slice(i + 1, index));
        forSplice.push(i + 1);
        break;
      } else if (!result[i - 1]) {
        nums.push(result.slice(i, index));
        forSplice.push(i);
        break;
      }
    }
    // находим число после операции
    for (let i = index + 1; i < result.length; i++) {
      if (isNaN(Number(result[i]))) {
        nums.push(result.slice(index + 1, i));
        forSplice.push(i);
        break;
      } else if (!result[i + 1]) {
        nums.push(result.slice(index + 1, i + 1));
        forSplice.push(i + 1);
        break;
      }
    }

    const newNum =
      type === "+" ? String(Number(nums[0]) + Number(nums[1])) : String(nums[0] - nums[1]);
    strArr.splice(forSplice[0], forSplice[1] - forSplice[0], newNum);
    result = strArr.join("");
  }
  return result;
};

// умножение и деление
const multiplyDevision = str => {
  let result = str.replace(/\(|\)/g, "");
  while (result.includes("*") || result.includes("/")) {
    // находим индекс индекс и тип операции
    let index = null;
    if (result.includes("*") && result.includes("/")) {
      index = Math.min(result.indexOf("*"), result.indexOf("/"));
    } else {
      index = Math.max(result.indexOf("*"), result.indexOf("/"));
    }
    const type = result[index];
    const nums = [];
    const forSplice = [];
    console.log(result);
    // находим число перед операцией
    for (let i = index - 1; i >= 0; i--) {
      if (isNaN(Number(result[i])) && result[i] !== "." && result[i] !== "*") {
        nums.push(result.slice(i + 1, index));
        forSplice.push(i + 1);
        break;
      } else if (!result[i - 1]) {
        nums.push(result.slice(i, index));
        forSplice.push(i);
        break;
      }
    }
    // находим число после операции
    for (let i = index + 1; i < result.length; i++) {
      if (isNaN(Number(result[i])) && result[i] !== ".") {
        nums.push(result.slice(index + 1, i));
        forSplice.push(i);
        break;
      } else if (!result[i + 1]) {
        nums.push(result.slice(index + 1, i + 1));
        forSplice.push(i + 1);
        break;
      }
    }
    if (nums[1] === "0" && type === "/") {
      return "error";
    }
    const newNum =
      type === "*"
        ? nums[0].replace(",", ".") * nums[1].replace(",", ".")
        : nums[0].replace(",", ".") / nums[1].replace(",", ".");
    const content = str.slice(forSplice[0], forSplice[1]);
    const newStr = str.replace(content, newNum);
    // result = newStr.replace(".", ",");
  }
  return result.includes("+") || result.includes("-") ? plusMinus(result) : result;
};

// основная функция
function expressionCalculator(expr) {
  let str = expr.replace(/ /g, ""); // удаляем пробелы
  // если скобки есть
  while (str.includes("(") || str.includes(")")) {
    let brackets = [];
    // ищем первую пару скобок
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        brackets[0] = i;
      } else if (str[i] === ")") {
        brackets[1] = i;
        break;
      }
    }
    const content = str.slice(brackets[0], brackets[1] + 1);
    const temp = multiplyDevision(content); // значение раскрытой скобки
    if (temp === "error") {
      return new Error("TypeError: Devision by zero.");
    }
    const newStr = str.replace(content, temp);
    str = newStr;
  }
  const result = multiplyDevision(str);
  if (result === "error") {
    return new Error("TypeError: Devision by zero.");
  }
  return Number(result).toFixed(4);
}

console.log(expressionCalculator("53.2241379310344848*36"));
// console.log(expressionCalculator(" 84 + (62 / 33 * 10 )+ 15 "));
// console.log(expressionCalculator(" 48 + 59 * 86 * 92 * 23 "));
// console.log(expressionCalculator(" 1 / 0"));
// console.log(expressionCalculator(" 1/2"));
// expressionCalculator("1/2")
// expressionCalculator()

module.exports = {
    expressionCalculator
}
