//braille characters array
const brailleChars = {
  'a': 'O.....', 'b': 'O.O...', 'c': 'OO....', 'd': 'OO.O..', 'e': 'O..O..', 'f': 'OOO...',
  'g': 'OOOO..', 'h': 'O.OO..', 'i': '.OO...', 'j': '.OOO..', 'k': 'O...O.', 'l': 'O.O.O.',
  'm': 'OO..O.', 'n': 'OO.OO.', 'o': 'O..OO.', 'p': 'OOO.O.', 'q': 'OOOOO.', 'r': 'O.OOO.',
  's': '.OO.O.', 't': '.OOOO.', 'u': 'O...OO', 'v': 'O.O.OO', 'w': '.OOO.O', 'x': 'OO..OO',
  'y': 'OO.OOO', 'z': 'O..OOO',
  
  'capital': '.....O', // uppercase 
  'decimal': '.0...0', // decimal point
  'number': '.O.OOO', // number 
  ' ': '......',  // space &nbsp; 
  
  //numbers
  '1': 'O.....', '2': 'O.O...',
  '3': 'OO....', '4': 'OO.O..',
  '5': 'O..O..', '6': 'OOO...',
  '7': 'OOOO..', '8': 'O.OO..',
  '9': '.OO...', '0': '.OOO..',
  
};

//regex to check if it's braille
const brailleCheck = /^[.O]+$/;

//reverse mapping braille to english
const reverseBraille = Object.fromEntries(Object.entries(brailleChars).map(([key, value]) => [value, key]));

//translate english to braille
const translateToBraille = (text) =>{
  let isNumber = false;
  let output = '';
  
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    
    if (char >= 'A' && char <='Z'){ // check if it's letter
      output += brailleChars['capital']; 
      char = char.toLowerCase();
      
    }
    if(char >= "0" && char <='9'){ // check if it's number 
      if (!isNumber){
        output += brailleChars['number'];
        isNumber = true;
      }
      output += brailleChars[char];
      
    }
    else {
      isNumber = false;
      output += brailleChars[char];
    }
  }
  return output;
}

//translate braille to english
const translateToEnglish = (braille )=>{
  let isNumber = false;
  let isCapital = false;
  let output = '';
 
  for (let x = 0; x < braille.length; x += 6){
    let period = braille.slice(x, x + 6);//split into 6 characters
    
    if (period === brailleChars['capital']){
      isCapital = true;
    }
    else if(period === brailleChars['number']){
      isNumber = true;
    }
    else {
      let char = reverseBraille[period]; 
      
      if(isNumber && char){
        char = String.fromCharCode(char.charCodeAt(0) - 'a'.charCodeAt(0) + '1'.charCodeAt(0)); // Convert letters to numbers
      }

      else if(isCapital && char){
        char = char.toUpperCase();
        isCapital = false;
        
      }
      
      output += char;
    }
  }
  return output;
  
}

//translation function
const translate = (input) => {
  if (input.match(brailleCheck)) {
    return translateToEnglish(input);
  } else {
    return translateToBraille(input);
    
  }
}
//comand line input
const input = process.argv.slice(2).join(" ");
console.log(translate(input));