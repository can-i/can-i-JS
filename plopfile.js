module.exports = function (plop) {
    plop.setGenerator("Mocha Test", {
        description: "Generate a mocha test file",
        prompts: [
            {
                type: "input",
                name: "filename",
                message: "Enter the file name to generate"
            }
        ],
        actions: function (data) {
            var actions = [];
            var filename = "test/{{properCase filename}}.spec.ts";
            actions.push({
                type: "add",
                path: filename,
                templateFile: "template/mocha.test.ts.template"
            });
            actions.push({
                type: "modify",
                path: filename,
                pattern: /\$NAME/,
                template: "{{properCase filename}}"
            });
            return actions;
        }
    });
};
//# sourceMappingURL=plopfile.js.map