export const nullthrows = function <T>(x: T | null | undefined): T {
    // eslint-disable-next-line unicorn/no-null
    if (x != null) {
        return x;
    }
    throw new Error("Got unexpected null or undefined");
};
