function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

console.log(checkStringLength('Привет', 10)); 

function isPalindrome(str) {
  const normalized = str.toLowerCase().replaceAll(' ', '');
  return normalized === normalized.split('').reverse().join('');
}

console.log(isPalindrome('топот'));