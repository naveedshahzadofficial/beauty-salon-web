import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomEvents {
  private nodeList: any;

  constructor() { }

  dom(arg: any): any {
    this.nodeList = this.getNodeList(arg);
    this.addEvents(this.nodeList);
    return this.nodeList;
  }

  private getNodeList = (arg: any) => {

    if (typeof arg === "string" && arg.trim().slice(0, 1) !== "<") {
      return document.querySelectorAll(arg);
    } else if (typeof arg === "string" && arg.trim().slice(0, 1) === "<") {
      const dom = this.domParser(arg);
      return [dom];
    } else if (typeof arg === "object" && arg instanceof NodeList) {
      console.log("NodeList");
      return arg;
    } else if (typeof arg === "object" && arg instanceof HTMLElement) {
      console.log("HTMLElement");
      return [arg];
    } else if (typeof arg === "object" && arg instanceof SVGElement) {
      console.log("SVGElement");
      return [arg];
    } else if (typeof arg && arg instanceof PointerEvent) {
      console.log("PointerEvent");
      return [arg.target];
    }
    else {
      console.log("Nothing...");
      return arg;
    }
  };
  private domParser = (arg: any) => {
    const parser = new DOMParser(),
      content = "text/html",
      DOM = parser.parseFromString(arg, content);
    return DOM.body.childNodes[0];
  };

  private addEvent = (nodeList: any, event: string, callback: Function) => {
    nodeList[event] = callback;
  };

  private addEvents = (nodeList: any) => {

    // .first()
    this.addEvent(nodeList, "first", () => {
      const firstNode = nodeList[0] !== undefined ? [nodeList[0]] : [];
      this.addEvents(firstNode);
      return firstNode;
    });

    // .find()
    this.addEvent(nodeList, "find", (arg1: any) => {
      let results: any[] = [];
      nodeList.forEach((node: any) => {
        const matchedNodes = node.querySelectorAll(arg1);
        if (matchedNodes.length) {
          matchedNodes.forEach((matchedNode: any) => {
            results.push(matchedNode);
          });
        }
      });

      this.addEvents(results);
      return results;
    });

    // .closest()
    this.addEvent(nodeList, "closest", (arg1: any) => {
      let results: any[] = [];
      nodeList.forEach((node: any) => {
        const matchedNode = node.closest(arg1);
        if (
          matchedNode !== null &&
          !results.filter((resNode) => resNode === matchedNode).length
        )
          results.push(matchedNode);
      });
      this.addEvents(results);
      return results;
    });

    // .attr()
    this.addEvent(nodeList, "attr", (arg1: any, arg2: any) => {
      if (arg2 === undefined && typeof arg1 !== "object") {
        if (nodeList[0] !== undefined) {
          const attr = nodeList[0].getAttribute(arg1);
          return attr === null ? undefined : attr;
        } else {
          return undefined;
        }
      }

      nodeList.forEach((node: any) => {
        if (typeof arg1 === "object") {
          for (const [key, val] of Object.entries(arg1)) {
            node.setAttribute(key, val);
          }
        } else {
          node.setAttribute(arg1, arg2);
        }
      });

      this.addEvents(nodeList);
      return nodeList;
    });


  }



}
