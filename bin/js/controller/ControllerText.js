var controller;
(function (controller) {
    class TextBuilder {
        titulo1(parent, text) {
            return parent.append("h1")
                .attr("class", "titulo1-d3")
                .text(text);
        }
        titulo2(parent, text) {
            return parent.append("h2")
                .attr("class", "titulo2-d3")
                .text(text);
        }
        titulo3(parent, text) {
            return parent.append("h3")
                .attr("class", "titulo3-d3")
                .text(text);
        }
        texto(parent, text) {
            return parent.append("p")
                .attr("class", "texto-d3")
                .text(text);
        }
        textoLink(parent, text, link) {
            return parent.append("a")
                .attr("class", "texto-link-d3")
                .attr("href", link)
                .text(text);
        }
    }
    controller.TextBuilder = TextBuilder;
})(controller || (controller = {}));
