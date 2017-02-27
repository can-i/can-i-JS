"use strict";
/**
 * @param full_namespace This is the full name of the namespace intended to be used.
 * This includes the periods that are found in the namespace
 */
function ObjectStringDigger(full_namespace) {
    /**
     * The full namespace divided into an array that is seperated using "."
     *
     * It is recommended to using the reverse of your domain
     *
     */
    var chunk = full_namespace.split(".");
    var inner_corner_of_the_universe = global;
    for (var _i = 0, chunk_1 = chunk; _i < chunk_1.length; _i++) {
        var step = chunk_1[_i];
        inner_corner_of_the_universe = driptip(inner_corner_of_the_universe, step);
    }
    return inner_corner_of_the_universe;
}
exports.ObjectStringDigger = ObjectStringDigger;
function driptip(step, label) {
    return step[label] = {};
}
exports.driptip = driptip;
//# sourceMappingURL=ObjectStringDigger.js.map