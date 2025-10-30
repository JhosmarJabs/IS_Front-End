namespace controller {
  export class ControlBuilder {
    public input(parent: d3.Selection<any, any, any, any>, config: {
      type: string,
      placeholder: string,
      marginBottom?: string,
      onInput?: (event: any) => void
    }) {
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
  }

  export class LoginOptionsBuilder {
    public render(
      parent: d3.Selection<any, any, any, any>,
      options: Array<{ icon: string; label: string; method: string; disabled?: boolean }>,
      onSelect: (method: string) => void
    ) {
      const grid = parent.append("div")
        .attr("class", "login-options");

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



