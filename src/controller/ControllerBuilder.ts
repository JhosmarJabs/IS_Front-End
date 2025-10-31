namespace controller {
  export class ControlBuilder {
    // Método para crear un input de texto
    public input(parent: d3.Selection<any, any, any, any>, config: {
      type: string,
      value?: string,
      placeholder: string,
      marginBottom?: string,
      onInput?: (event: any) => void
    }) {
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

    public select(parent: d3.Selection<any, any, any, any>, config: {
      options: Array<{ value: string, label: string }>,
      placeholder?: string,
      marginBottom?: string,
      onChange?: (event: any) => void,
      id?: string
    }) {
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
          .attr("selected", "true")
          .text(config.placeholder);
      }

      config.options.forEach(opt => {
        select.append("option")
          .attr("value", opt.value)
          .text(opt.label);
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


    public button(parent: d3.Selection<any, any, any, any>, config: {
      label: string,
      color?: string,
      onClick?: () => void
    }) {
      const btn = parent.append("button")
        .text(config.label)
        .attr("class", "btn");
      if (config.onClick) {
        btn.on("click", config.onClick);
      }
      return btn;
    }

    public CasillasBuilder(
      parent: d3.Selection<any, any, any, any>,
      options: Array<{ icon: string; label: string; method: string; disabled?: boolean }>,
      onSelect: (method: string) => void
    ) {
      const grid = parent.append("div")
        .attr("class", "login-options"); // Cambia la clase si quieres renombrarla


      options.forEach(opt => {
        const option = grid.append("div")
          .attr("class", opt.disabled ? "login-option disabled-option" : "login-option")
          .on("click", () => {
            if (!opt.disabled) { onSelect(opt.method); }
          });
        option.append("i").attr("class", opt.icon);
        option.append("p").text(opt.label);
      });
    }
  }
}
