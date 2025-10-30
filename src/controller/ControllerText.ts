namespace controller {
  export class TextBuilder {
    public titulo1(parent: d3.Selection<any, any, any, any>, text: string) {
      return parent.append("h1")
        .attr("class", "titulo1-d3")
        .text(text);
    }
    public titulo2(parent: d3.Selection<any, any, any, any>, text: string) {
      return parent.append("h2")
        .attr("class", "titulo2-d3")
        .text(text);
    }
    public titulo3(parent: d3.Selection<any, any, any, any>, text: string) {
      return parent.append("h3")
        .attr("class", "titulo3-d3")
        .text(text);
    }
    public texto(parent: d3.Selection<any, any, any, any>, text: string) {
      return parent.append("p")
        .attr("class", "texto-d3")
        .text(text);
    }
    public textoLink(parent: d3.Selection<any, any, any, any>, text: string, link: string) {
      return parent.append("a")
        .attr("class", "texto-link-d3")
        .attr("href", link)
        .text(text);
    }
  }

}

