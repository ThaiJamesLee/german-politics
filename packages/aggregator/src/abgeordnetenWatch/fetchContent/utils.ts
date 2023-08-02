export function promiseDelay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export async function downloadBatch<T>(
  tasks: Promise<T>[],
  delay = 10,
  context = 'Progress',
): Promise<T[]> {
  const result: T[] = [];
  let i = 1;

  for (const task of tasks) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    process.stdout.write(`${context}: ${i}/${tasks.length}`);
    result.push(await task);
    promiseDelay(delay);
    i++;
  }

  return result;
}
