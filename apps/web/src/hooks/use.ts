/**
 * Following patterns used in React docs
 */
type PromiseStatus = "pending" | "fulfilled" | "rejected";

export type ReadResults<T> = { data: T; error?: Error };

export default function use<T>(promise: Promise<T>) {
  let status: PromiseStatus = "pending";
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (data) => {
      status = "fulfilled";
      result = data;
    },
    (err) => {
      status = "rejected";
      error = err;
    }
  );

  return {
    read(): ReadResults<T> {
      switch (status) {
        case "pending":
          throw suspender;

        case "rejected":
          return { error, data: [] as T };

        case "fulfilled":
          return { data: result };

        default:
          throw new Error("Unexpected status");
      }
    },
  };
}
