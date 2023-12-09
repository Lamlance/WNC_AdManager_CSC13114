type CallCatchReturn<R extends any> =
  | { success: true; data: R }
  | { success: false; error: Error };

async function CallAndCatchAsync<R extends any, P extends object | undefined>(
  func: (args: P) => Promise<R>,
  param: P,
): Promise<CallCatchReturn<R>> {
  try {
    const data = await func(param);
    return { success: true, data: data };
  } catch (e) {
    console.warn(e);
    return { success: false, error: e as Error };
  }
}

function CallAndCatch<R extends any, P extends object | undefined>(
  func: (args: P) => R,
  param: P,
): CallCatchReturn<R> {
  try {
    const data = func(param);
    return { success: true, data: data };
  } catch (e) {
    console.warn(e);
    return { success: false, error: e as Error };
  }
}

export { CallAndCatchAsync, CallAndCatch };
