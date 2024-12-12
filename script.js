let todos = JSON.parse(localStorage.getItem("message")) || [];

function allData() {
  localStorage.setItem("message", JSON.stringify(todos));

  let element = "";
  todos.map(
    (todo) =>
      (element += `
    <tr>
              <td style="background-color:${todo.check ? "#b8dda3" : ""}">
                <div class="checker">
                  <span><input type="checkbox" class="checkBox" ${
                    todo.check ? "checked" : ""
                  } onClick="toggleCheck(${todo.id})"/></span>${todo.message}
                </div>
                <div class="actionBtn">
                  <button class="editBtn" onClick="editHandler(${
                    todo.id
                  })">Edit</button>
                  <button class="deleteBtn" onClick="deleteHandler(${
                    todo.id
                  })">Delete</button>
                </div>
              </td>
            </tr>
    `)
  );
  const table = document.querySelector(".myTable");
  table.innerHTML = element;
}

document
  .querySelector(".formSubmitter")
  .addEventListener("submit", function handleSubmit(e) {
    e.preventDefault();

    let messageAdderInput = document.querySelector(".messageAdder");
    let messageAdder = messageAdderInput.value;
    // const newObj = {
    //   id: todos.length + 1,
    //   message: messageAdderInput,
    //   check: false,
    // };
    // todos.push(newObj);

    if (messageAdder) {
      const messageInput = document.querySelector(".idStorer");
      const messageId = messageInput.value;

      if (messageId) {
        //update message
        const idFind = todos.find((todo) => todo.id == messageId);
        if (idFind) {
          idFind.message = messageAdder;
        }
      } else {
        const newObj = {
          id: todos.length + 1,
          message: messageAdder,
          check: false,
        };
        todos.push(newObj);
      }

      messageAdderInput.value = "";
      messageInput.value = "";
      document.querySelector(".addMessageBtn").innerHTML = "Add Task";
    }
    allData();
  });

function editHandler(id) {
  const finder = todos.find((todo) => todo.id === id);

  if (finder) {
    document.querySelector(".messageAdder").value = finder.message;
    document.querySelector(".addMessageBtn").innerHTML = "Update Task";
    document.querySelector(".idStorer").value = finder.id;
  }
  allData();
}

function deleteHandler(id) {
  todos = todos.filter((todo) => todo.id !== id);
  allData();
}

function toggleCheck(id) {
  const finder = todos.find((todo) => todo.id === id);
  if (finder) {
    finder.check = !finder.check;
    localStorage.setItem("task", JSON.stringify(todos));
  }
  allData();
}

allData();
