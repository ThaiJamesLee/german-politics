export function promiseDelay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function progressBar(current: number, expected: number, barSize = 20): string {
  const numberWhitespace = Math.round(barSize * (1 - current / expected));
  const numberBars = barSize - numberWhitespace;
  const bar: string[] = [];

  for (let i = 0; i < numberBars; i++) {
    bar.push('=');
  }

  for (let i = numberBars; i < numberBars + numberWhitespace; i++) {
    bar.push(' ');
  }

  return `[${bar.join('')}]`;
}

export function progressString(
  current: number,
  expected: number,
  context = 'Progress',
): string {
  return `${context}: ${progressBar(current, expected)} ${current}/${expected}${
    current === expected ? '\n' : ''
  }`;
}
