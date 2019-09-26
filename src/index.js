function eval() {
  // Do not use eval!!!
  return;
}

const plusMinus = str => {
  let result = str;
  while (result.length !== 1 && (result.includes("+") || result.includes("-"))) {
    let index = null;
    if (result.includes("+") && result.includes("-")) {
      index = Math.min(result.indexOf("+"), result.indexOf("-"));
    } else {
      index = Math.max(result.indexOf("+"), result.indexOf("-"));
    }
    const type = result[index];
    const num1 = Number(String(result[index - 1]).replace("M", "-"));
    const num2 = Number(String(result[index + 1]).replace("M", "-"));
    const newNum = type === "+" ? num1 + num2 : num1 - num2;
    const temp = newNum < 0 ? `M${Math.abs(newNum)}` : newNum;
    result.splice(index - 1, 3, temp);
  }
  return result[0];
};

const multiplyDevision = str => {
  let result = str.replace(/\(|\)/g, "").split(/(\+|\-|\*|\/)/g);
  while (result.includes("*") || result.includes("/")) {
    let index = null;
    if (result.includes("*") && result.includes("/")) {
      index = Math.min(result.indexOf("*"), result.indexOf("/"));
    } else {
      index = Math.max(result.indexOf("*"), result.indexOf("/"));
    }
    const type = result[index];
    if (result[index + 1] === "0" && type === "/") {
      throw new Error("TypeError: Devision by zero.");
    }
    const num1 = Number(String(result[index - 1]).replace("M", "-"));
    const num2 = Number(String(result[index + 1]).replace("M", "-"));
    const newNum = type === "*" ? num1 * num2 : num1 / num2;
    result.splice(index - 1, 3, newNum < 0 ? "M" + Math.abs(newNum) : String(newNum));
  }
  return result.includes("+") || result.includes("-") ? plusMinus(result) : result;
};

const checkBrackets = str => {
  let count = 0;
  let bracketsArr = str.match(/\(|\)/g);
  bracketsArr.forEach(item => {
    if (item === "(") {
      count++;
    } else {
      count--;
    }
    if (count < 0) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
  });
  if (count !== 0) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
};

function expressionCalculator(expr) {
  let str = expr.replace(/ /g, "");
  str.match(/\(|\)/g) && checkBrackets(str);
  while (str.includes("(") || str.includes(")")) {
    let brackets = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        brackets[0] = i;
      } else if (str[i] === ")") {
        brackets[1] = i;
        break;
      }
    }
    const content = str.slice(brackets[0], brackets[1] + 1);
    const temp = multiplyDevision(content);
    const newStr = str.replace(content, temp);
    str = newStr;
  }
  const result = multiplyDevision(str);

  return Number(String(result).replace("M", "-"));
}
module.exports = {
  expressionCalculator
};
