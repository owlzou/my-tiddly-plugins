import { IChangedTiddlers } from 'tiddlywiki';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class WordCount extends Widget {
  refresh(_changedTiddlers: IChangedTiddlers) {
    return false;
  }

  count(str: string) {
    let len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[\u4e00-\u9fa5]/)|| str.charAt(i).match(/[\u9FA6-\u9fcb]/)) {
        len += 1
      }
    }
    return len
  }

  render(parent: Node, _nextSibling: Node) {
    this.parentDomNode = parent;
    this.execute();
    this.computeAttributes();
    var content = this.getAttribute("text","")
    var count = this.count(content);

    console.log(content,count);

    const containerElement = $tw.utils.domMaker('span', {
      text: `${count}`,
    });
 
    this.domNodes.push(parent.appendChild(containerElement));
  }
}

exports["word-count"] = WordCount;
