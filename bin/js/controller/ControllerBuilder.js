var controller;
(function (controller) {
    class ControlBuilder {
        // Método para crear un input de texto
        input(parent, config) {
            const inputBox = parent.append("div")
                .attr("class", "input-box")
                .style("margin-bottom", config.marginBottom || "18px");
            const input = inputBox.append("input")
                .attr("type", config.type)
                .attr("value", config.value || "")
                .attr("placeholder", config.placeholder)
                .attr("class", "placeholder-blanco");
            if (config.onInput) {
                input.on("input", config.onInput);
            }
            return input;
        }
        select(parent, config) {
            const selectBox = parent.append("div")
                .attr("class", "input-box")
                .style("margin-bottom", config.marginBottom || "18px");
            const select = selectBox.append("select")
                .attr("class", "placeholder-blanco custom-select")
                .style("width", "100%")
                .style("background", "transparent")
                .style("border", "none")
                .style("outline", "none")
                .style("font-size", "16px")
                .style("padding", "8px 0")
                .style("color", "#fff")
                .style("appearance", "none")
                .style("-webkit-appearance", "none")
                .style("box-shadow", "none")
                .style("cursor", "pointer");
            if (config.placeholder) {
                select.append("option")
                    .attr("value", "")
                    .attr("disabled", "true")
                    .attr("selected", !config.value ? "true" : null)
                    .text(config.placeholder);
            }
            config.options.forEach(opt => {
                const option = select.append("option")
                    .attr("value", opt.value)
                    .text(opt.label);
                if (config.value && opt.value === config.value) {
                    option.attr("selected", "true");
                }
            });
            if (config.id) {
                select.attr("id", config.id);
            }
            if (config.onChange) {
                select.on("change", config.onChange);
            }
            selectBox.style("background", "rgba(255,255,255,0.07)");
            return select;
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
        navDobleBotones(parent, opciones) {
            const nav = parent.append("div")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("width", "80%");
            nav.append("button")
                .text(opciones.backLabel)
                .attr("class", "btn")
                .style("margin-right", "10px")
                .on("click", opciones.onBack);
            const btnNext = nav.append("button")
                .text(opciones.nextLabel)
                .attr("class", "btn")
                .style("margin-left", "10px")
                .property("disabled", !!opciones.nextDisabled)
                .on("click", opciones.onNext);
            return btnNext;
        }
        CasillasBuilder(parent, options, onSelect) {
            const grid = parent.append("div")
                .attr("class", "login-options"); // Cambia la clase si quieres renombrarla
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
    controller.ControlBuilder = ControlBuilder;
})(controller || (controller = {}));
