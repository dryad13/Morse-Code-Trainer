export const charToMorse: { [key: string]: string } = {
  "E": "·",
  "T": "−",
  "I": "··",
  "A": "·−",
  "N": "−·",
  "M": "−−",
  "S": "···",
  "U": "··−",
  "R": "·−·",
  "W": "·−−",
  "D": "−··",
  "K": "−·−",
  "G": "−−·",
  "O": "−−−",
  "H": "····",
  "V": "···−",
  "F": "··−·",
  "Ü": "··−−",
  "L": "·−··",
  "Ä": "·−·−",
  "P": "·−−·",
  "J": "·−−−",
  "B": "−···",
  "X": "−··−",
  "C": "−·−·",
  "Y": "−·−−",
  "Z": "−−··",
  "Q": "−−·−",
  "Ö": "−−−·",
  "5": "·····",
  "4": "····−",
  "3": "···−−",
  "2": "··−−−",
  "1": "·−−−−",
  "6": "−····",
  "7": "−−···",
  "8": "−−−··",
  "9": "−−−−·",
  "0": "−−−−−",
};

export const textToMorse = (text: string): string[] => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      return charToMorse[char] || "";
    })
    .filter((morse) => morse !== "");
};

interface ToMorseCodeOptions {
  letterSeparator?: string;
  wordSeparator?: string;
}

export const toMorseCode = (
  text: string,
  { letterSeparator = " ", wordSeparator = " / " }: ToMorseCodeOptions = {}
): string => {
  const tokens: string[] = [];

  for (const char of text.toUpperCase()) {
    if (char === " ") {
      if (tokens.length === 0 || tokens[tokens.length - 1] === wordSeparator) {
        continue;
      }

      tokens.push(wordSeparator);
      continue;
    }

    const morse = charToMorse[char];
    if (morse) {
      tokens.push(morse);
    }
  }

  let result = "";

  for (const token of tokens) {
    if (token === wordSeparator) {
      result = result.trimEnd();
      result += wordSeparator;
      continue;
    }

    if (result && !result.endsWith(wordSeparator)) {
      result += letterSeparator;
    }

    result += token;
  }

  return result.trim();
};
