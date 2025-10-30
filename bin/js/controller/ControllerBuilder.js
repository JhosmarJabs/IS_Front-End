var controller;
(function (controller) {
    class ControlBuilder {
        input(parent, config) {
            // Crea el contenedor .input-box
            const inputBox = parent.append("div")
                .attr("class", "input-box")
                .style("margin-bottom", config.marginBottom || "18px");
            // Crea el input dentro del contenedor
            const input = inputBox.append("input")
                .attr("type", config.type)
                .attr("placeholder", config.placeholder)
                .attr("class", "placeholder-blanco");
            if (config.onInput) {
                input.on("input", config.onInput);
            }
            return input;
        }
        button(parent, config) {
            const btn = parent.append("button")
                .text(config.label)
                .attr("class", "btn");
            if (config.onClick) {
                btn.on("click", config.onClick);
            }
            return btn;
        }
    }
    controller.ControlBuilder = ControlBuilder;
    class LoginOptionsBuilder {
        render(parent, options, onSelect) {
            const grid = parent.append("div")
                .attr("class", "login-options");
            options.forEach(opt => {
                const option = grid.append("div")
                    .attr("class", opt.disabled ? "login-option disabled-option" : "login-option")
                    .on("click", () => {
                    if (!opt.disabled) {
                        onSelect(opt.method);
                    }
                });
                option.append("i").attr("class", opt.icon);
                option.append("p").text(opt.label);
            });
        }
    }
    controller.LoginOptionsBuilder = LoginOptionsBuilder;
})(controller || (controller = {}));
//# sourceMappingURL=ControllerBuilder.js.map