export class ToDoList {
  constructor() {
    this.tdList = [];
  }
  addToDo(newToDo) {
    this.tdList.push(newToDo);
  }
  removeToDo(index) {
    this.tdList.splice(index, 1);
  }
  renderToDo() {
    let x = this.tdList.reduceRight((content, value, index, arr) => {
      content += `
        <li>
          <span> ${value.text}</span>
          <div class="buttons">
            <button class="remove" onclick="deleteToDo(event)" data-index="${index}" status="${value.status}">
              <i class="fa fa-trash-alt"></i>
            </button>
            <button class="complete" onclick="completeToDo(event)" data-index="${index}" status="${value.status}">
              <i class="fa fa-check-circle"></i>
            </button>
          </div>
        </li>
      `;
      return content;
    }, "");
    return x;
  }
  sortToDo(flag) {
    this.tdList.sort((a, b) => {
      let textA = a.text.toLowerCase();
      let textB = b.text.toLowerCase();
      return textB.localeCompare(textA);
    });
    if (flag) {
      this.tdList.reverse();
    }
  }
}
