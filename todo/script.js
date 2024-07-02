const input_box = document.getElementById("input-box");
const incompleteTasksContainer = document.getElementById("incompleteTasks");
const completedTasksContainer = document.getElementById("completedTasks");

function addTask() {
    if (input_box.value === '') {
        alert("Enter Some Task");
    } else {
        let li = document.createElement("li");
        li.textContent = input_box.value;
        
        let span = document.createElement("span");
        span.innerHTML = "&#x2715;";
        span.classList.add("delete-task"); // Add a class for styling and event delegation
        span.addEventListener("click", function() {
            li.remove(); // Remove the task on cross icon click
            saveTheData();
        });
        
        li.appendChild(span);
        
        // Add event listener to toggle completion on click
        li.addEventListener("click", function() {
            li.classList.toggle("check-mark");
            if (li.classList.contains("check-mark")) {
                completedTasksContainer.appendChild(li);
            } else {
                incompleteTasksContainer.appendChild(li);
            }
            saveTheData();
        });

        incompleteTasksContainer.appendChild(li);
        saveTheData();
    }
    input_box.value = ""; // Clear the input field after adding task
    input_box.focus(); // Keep focus on the input field for convenience
}

document.addEventListener("DOMContentLoaded", function() {
    showTaskList();
    
    // Event delegation for delete tasks (cross icon)
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-task")) {
            e.target.parentElement.remove(); // Remove the parent li of the clicked cross icon
            saveTheData();
        }
    });
});

function saveTheData() {
    localStorage.setItem("incompleteTasks", incompleteTasksContainer.innerHTML);
    localStorage.setItem("completedTasks", completedTasksContainer.innerHTML);
}

function showTaskList() {
    incompleteTasksContainer.innerHTML = localStorage.getItem("incompleteTasks") || "";
    completedTasksContainer.innerHTML = localStorage.getItem("completedTasks") || "";
}
