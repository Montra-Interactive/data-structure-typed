import {AnyFunction} from "../types";

const orderReducedBy = 2; // reduction of bigO's order compared to the baseline bigO

export const magnitude = {
  CONSTANT: Math.floor(Number.MAX_SAFE_INTEGER / Math.pow(10, orderReducedBy)),
  LOG_N: Math.pow(10, 9 - orderReducedBy),
  LINEAR: Math.pow(10, 6 - orderReducedBy),
  N_LOG_N: Math.pow(10, 5 - orderReducedBy),
  SQUARED: Math.pow(10, 4 - orderReducedBy),
  CUBED: Math.pow(10, 3 - orderReducedBy),
  FACTORIAL: 20 - orderReducedBy
};

export const bigO = {
  CONSTANT: magnitude.CONSTANT / 100000,
  LOG_N: Math.log2(magnitude.LOG_N) / 1000,
  LINEAR: magnitude.LINEAR / 1000,
  N_LOG_N: (magnitude.N_LOG_N * Math.log2(magnitude.LOG_N)) / 1000,
  SQUARED: Math.pow(magnitude.SQUARED, 2) / 1000,
  CUBED: Math.pow(magnitude.SQUARED, 3) / 1000,
  FACTORIAL: 10000
};

function findPotentialN(input: any): number {
  let longestArray: any[] = [];
  let mostProperties: { [key: string]: any } = {};

  function recurse(obj: any) {
    if (Array.isArray(obj)) {
      if (obj.length > longestArray.length) {
        longestArray = obj;
      }
    } else if (typeof obj === 'object' && obj !== null) {
      const keys = Object.keys(obj);
      if (keys.length > Object.keys(mostProperties).length) {
        mostProperties = obj;
      }
      keys.forEach((key) => {
        recurse(obj[key]);
      });
    }
  }

  if (Array.isArray(input)) {
    input.forEach((item) => {
      recurse(item);
    });
  } else {
    recurse(input);
  }

  // return [longestArray, mostProperties] : [any[], { [key: string]: any }];
  return Math.max(longestArray.length, Object.keys(mostProperties).length);
}

function linearRegression(x: number[], y: number[]) {
  const n = x.length;

  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumY = y.reduce((acc, val) => acc + val, 0);

  const sumXSquared = x.reduce((acc, val) => acc + val ** 2, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX ** 2);
  const intercept = (sumY - slope * sumX) / n;

  const yHat = x.map((val) => slope * val + intercept);

  const totalVariation = y.map((val, i) => (val - yHat[i]) ** 2).reduce((acc, val) => acc + val, 0);
  const explainedVariation = y.map((val) => (val - (sumY / n)) ** 2).reduce((acc, val) => acc + val, 0);

  const rSquared = 1 - totalVariation / explainedVariation;

  return { slope, intercept, rSquared };
}

function estimateBigO(runtimes: number[], dataSizes: number[]): string {
  // Make sure the input runtimes and data sizes have the same length
  if (runtimes.length !== dataSizes.length) {
    return "输入数组的长度不匹配";
  }

  // Create an array to store the computational complexity of each data point
  const complexities: string[] = [];

  // Traverse different possible complexities
  const complexitiesToCheck: string[] = [
   "O(1)", // constant time complexity
    "O(log n)", // Logarithmic time complexity
    "O(n)", // linear time complexity
    "O(n log n)", // linear logarithmic time complexity
    "O(n^2)", // squared time complexity
  ];

  for (const complexity of complexitiesToCheck) {
   // Calculate data points for fitting
    const fittedData: number[] = dataSizes.map((size) => {
      if (complexity === "O(1)") {
        return 1; // constant time complexity
      } else if (complexity === "O(log n)") {
        return Math.log(size);
      } else if (complexity === "O(n)") {
        return size;
      } else if (complexity === "O(n log n)") {
        return size * Math.log(size);
      } else if (complexity === "O(n^2)") {
        return size ** 2;
      } else {
        return size ** 10
      }
    });

   // Fit the data points using linear regression analysis
    const regressionResult = linearRegression(fittedData, runtimes);

    // Check the R-squared value of the fit. It is usually considered a valid fit if it is greater than 0.9.
    if (regressionResult.rSquared >= 0.9) {
      complexities.push(complexity);
    }
  }

  // If there is no valid fitting result, return "cannot estimate", otherwise return the estimated time complexity
  if (complexities.length === 0) {
    return "Unable to estimate";
  } else {
    return complexities.join(" or ");
  }
}

const methodLogs: Map<string, [number, number][] > = new Map();

export function logBigOMetrics(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = performance.now();
    const result = originalMethod.apply(this, args);
    const endTime = performance.now();
    const runTime = endTime - startTime;

    const methodName = `${target.constructor.name}.${propertyKey}`;
    if (!methodLogs.has(methodName)) {
      methodLogs.set(methodName, []);
    }

    const methodLog = methodLogs.get(methodName);

    const maxDataSize = args.length === 1 && typeof args[0] === "number" ? args[0] : findPotentialN(args);
    if (methodLog) {
      methodLog.push([runTime, maxDataSize]);

      if (methodLog.length >= 20) {
        console.log('triggered', methodName, methodLog);
        const bigO = estimateBigO(methodLog.map(([runTime,]) => runTime), methodLog.map(([runTime,]) => runTime));
        console.log(`Estimated Big O: ${bigO}`);
        methodLogs.delete(methodName)
      }
    }

    return result;
  };

  return descriptor;
}

export function logBigOMetricsWrap<F extends AnyFunction>(fn: F, args: Parameters<F>, fnName: string) {
    const startTime = performance.now();
    const result = fn(args);
    const endTime = performance.now();
    const runTime = endTime - startTime;
    const methodName = `${fnName}`;
    if (!methodLogs.has(methodName)) {
      methodLogs.set(methodName, []);
    }

    const methodLog = methodLogs.get(methodName);

    const maxDataSize = args.length === 1 && typeof args[0] === "number" ? args[0] : findPotentialN(args);
    if (methodLog) {
      methodLog.push([runTime, maxDataSize]);

      if (methodLog.length >= 20) {
        console.log('triggered', methodName, methodLog);
        const bigO = estimateBigO(methodLog.map(([runTime,]) => runTime), methodLog.map(([runTime,]) => runTime));
        console.log(`Estimated Big O: ${bigO}`);
        methodLogs.delete(methodName)
      }
    }

    return result;
}
