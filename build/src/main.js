/**
 * Some predefined delay values (in milliseconds).
 */
export var Delays;
(function (Delays) {
    Delays[Delays["Short"] = 500] = "Short";
    Delays[Delays["Medium"] = 2000] = "Medium";
    Delays[Delays["Long"] = 5000] = "Long";
})(Delays = Delays || (Delays = {}));
/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(name, delay = Delays.Medium) {
    return new Promise((resolve) => setTimeout(() => resolve(`Hello, ${name}`), delay));
}
// Below are examples of using ESLint errors suppression
// Here it is suppressing a missing return type definition for the greeter function.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function greeter(name) {
    return await delayedHello(name, Delays.Long);
}
//# sourceMappingURL=main.js.map