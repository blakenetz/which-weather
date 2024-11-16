/**
 * Following patterns used in React docs
 */
type PromiseStatus = "pending" | "fulfilled" | "rejected";
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
    read(): T {
      switch (status) {
        case "pending":
          throw suspender;

        case "rejected":
          throw error;

        case "fulfilled":
          return result;

        default:
          throw new Error("Unexpected status");
      }
    },
  };
}
