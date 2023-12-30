import Quill from "quill";

var Embed = Quill.import("blots/embed");

const ATTRIBUTES = ["alt", "height", "width"];

class ImageEmbed extends Embed {
  public static readonly blotName = "imageembed";
  public static readonly tagName = "img";

  static create(value: any) {
    let node = super.create(value) as HTMLElement;
    if (typeof value === "string") {
      const sanUrl = this.sanitize(value);
      node.setAttribute("src", sanUrl);
      if (sanUrl.indexOf("blob") === 0) {
        node.onload = () => URL.revokeObjectURL(value);
      }
    }
    return node;
  }

  static formats(domNode: HTMLElement) {
    return ATTRIBUTES.reduce(function (
      formats: { [key: string]: string | null },
      attribute,
    ) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url: string) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url: string) {
    return url;
  }

  static value(domNode: HTMLElement) {
    return domNode.getAttribute("src");
  }

  format(name: string, value: string) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        (this.domNode as HTMLElement).setAttribute(name, value);
      } else {
        (this.domNode as HTMLElement).removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

export default ImageEmbed;
