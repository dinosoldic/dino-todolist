import { formatDate } from "../utils/FormatDate";
import createModal from "../utils/Modal";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
} from "../constants/SVGIcons";
import "../styles/TaskTable.css";
import { SharedTaskSwitch } from "../utils/SharedTaskSwitch";

interface TaskTypes {
  id: number;
  name: string;
  created: string;
  completed: string;
  isCompleted: boolean;
}

interface SortOrderTypes {
  updatedAsc: boolean;
  updatedDesc: boolean;
  nameAsc: boolean;
  nameDesc: boolean;
}

// funcs
async function getTasks(serverUrl: string) {
  const tasks: TaskTypes[] = [
    {
      id: 1,
      name: "Task 1",
      created: "2025-04-03",
      completed: "2025-04-03",
      isCompleted: false,
    },
    {
      id: 2,
      name: "Task 2",
      created: "2025-04-05",
      completed: "2025-04-05",
      isCompleted: false,
    },
    {
      id: 3,
      name: "Task 3",
      created: "2025-04-10",
      completed: "2025-04-10",
      isCompleted: false,
    },
    {
      id: 4,
      name: "Task 4",
      created: "2025-04-12",
      completed: "2025-04-12",
      isCompleted: false,
    },
    {
      id: 5,
      name: "Task 5",
      created: "2025-04-15",
      completed: "2025-04-15",
      isCompleted: false,
    },
    {
      id: 6,
      name: "Task 6",
      created: "2025-04-18",
      completed: "2025-04-18",
      isCompleted: false,
    },
    {
      id: 7,
      name: "Task 7",
      created: "2025-04-20",
      completed: "2025-04-20",
      isCompleted: false,
    },
    {
      id: 8,
      name: "Task 8",
      created: "2025-04-23",
      completed: "2025-04-23",
      isCompleted: false,
    },
    {
      id: 9,
      name: "Task 9",
      created: "2025-04-25",
      completed: "2025-04-25",
      isCompleted: false,
    },
    {
      id: 10,
      name: "Task 10",
      created: "2025-04-28",
      completed: "2025-04-28",
      isCompleted: false,
    },
    {
      id: 11,
      name: "Task 11",
      created: "2025-05-01",
      completed: "2025-05-01",
      isCompleted: false,
    },
    {
      id: 12,
      name: "Task 12",
      created: "2025-05-03",
      completed: "2025-05-03",
      isCompleted: true,
    },
  ];
  return tasks;
  //   try {
  //     const response = await fetch(`${serverUrl}/tasks`);
  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //     const tasks = await response.json();
  //     return tasks; // array of task objects
  //   } catch (error) {
  //     console.error("Failed to fetch tasks:", error);
  //     return [];
  //   }
}

// main func
export default function TaskTable(serverUrl: string): HTMLDivElement {
  //// vars
  // tasks
  let defaultTask: TaskTypes = {
    id: NaN,
    name: "",
    created: "",
    completed: "",
    isCompleted: false,
  };

  let tasks: TaskTypes[] = [];
  let allTasks: TaskTypes[] = [];
  let openTask: TaskTypes = defaultTask;
  let isAddMode: boolean = false;
  let isEditMode: boolean = false;
  let isSubmitting: boolean = false;
  let isDeleting: boolean = false;

  let tasksToDelete: number[] = [];

  // manage state of show completed
  let isCompletedMode = SharedTaskSwitch.getState();

  SharedTaskSwitch.onChange((state) => {
    isCompletedMode = state;
    filterAndRenderTasks();
    renderPagination();
    tableHeaderUpdatedBtn.title = isCompletedMode ? "Completed" : "Updated";
    tableHeaderUpdatedBtn.textContent = isCompletedMode
      ? "Completed"
      : "Updated";
    selectAllPages.clear();
    selectedTasks.clear();
    tableHeaderSelectAllCheckBox.checked = false;
    tableHeaderSelectAllCheckBox.indeterminate = false;
    updateHeaderActionsVisibility();
  });

  const taskModal = createModal({
    width: "50%",
    height: "15rem",
    onClose() {
      isAddMode ? (isAddMode = false) : (isEditMode = false);
      openTask = defaultTask;
    },
  });

  const deleteModal = createModal({
    width: "30%",
    height: "10rem",
    onClose() {
      tasksToDelete = [];
    },
  });

  // sorting
  let sortOrder: SortOrderTypes = {
    updatedAsc: false,
    updatedDesc: true, // default: newest first
    nameAsc: false,
    nameDesc: false,
  };

  // check track
  let selectedTasks: Set<number> = new Set();
  const selectAllPages = new Map<number, 0 | 1 | 2>(); // 0 = none selected, 1 = some selected (indeterminate), 2 = all selected

  // paging
  let currentPage: number = 1;
  const tasksPerPage: number = 10;

  let totalPages: number = 0;
  const maxVisiblePages: number = 5;
  const pageSkip: number = 5;

  //// body
  const compBody = document.createElement("div");
  compBody.className = "table-div";

  const divider = document.createElement("div");
  divider.className = "divider";

  const divider2 = document.createElement("div");
  divider2.className = "divider";

  const divider3 = document.createElement("div");
  divider3.className = "divider";

  const divider4 = document.createElement("div");
  divider4.className = "divider";

  const divider5 = document.createElement("div");
  divider5.className = "divider";

  const divider6 = document.createElement("div");
  divider6.className = "divider";

  // table
  const tableContent = document.createElement("div");
  tableContent.className = "table-content";

  // table header
  const tableHeader = document.createElement("div");
  tableHeader.className = "table-header";

  const tableHeaderContent = document.createElement("div");
  tableHeaderContent.className = "table-header-content";

  const tableHeaderSelectAll = document.createElement("div");
  tableHeaderSelectAll.className = "table-header-select-all";

  const tableHeaderSelectAllCheckBox = document.createElement("input");
  tableHeaderSelectAllCheckBox.type = "checkbox";
  tableHeaderSelectAllCheckBox.className = "table-header-select-all-check";

  const tableHeaderName = document.createElement("div");
  tableHeaderName.className = "table-header-name";

  const tableHeaderNameBtn = document.createElement("button");
  tableHeaderNameBtn.textContent = "Task Name";
  tableHeaderNameBtn.title = "Task Name";
  tableHeaderNameBtn.addEventListener("click", () => {
    // handle sort name
    const nextSort = sortOrder.nameAsc ? "nameDesc" : "nameAsc";
    handleSortOrderChange(nextSort);
  });

  const tableHeaderUpdated = document.createElement("div");
  tableHeaderUpdated.className = "table-header-updated";

  const tableHeaderUpdatedBtn = document.createElement("button");
  tableHeaderUpdatedBtn.title = isCompletedMode ? "Completed" : "Updated";
  tableHeaderUpdatedBtn.textContent = isCompletedMode ? "Completed" : "Updated";
  tableHeaderUpdatedBtn.addEventListener("click", () => {
    const nextSort = sortOrder.updatedAsc ? "updatedDesc" : "updatedAsc";
    handleSortOrderChange(nextSort);
  });

  const tableHeaderActions = document.createElement("div");
  tableHeaderActions.className = "table-header-actions";

  const tableHeaderActionsAdd = document.createElement("div");
  tableHeaderActionsAdd.className = "table-header-actions-add";
  tableHeaderActionsAdd.addEventListener("click", () => {
    handleModalOpen("add");
  });

  const tableHeaderActionsCheck = document.createElement("div");
  tableHeaderActionsCheck.className = "table-header-actions-check";
  tableHeaderActionsCheck.addEventListener("click", () => {
    const tasksToUpdate = [...selectedTasks]
      .map((id) => {
        const task = tasks.find((t) => t.id === id);
        return task ? { id: task.id, isCompleted: !task.isCompleted } : null;
      })
      .filter(Boolean) as { id: number; isCompleted: boolean }[];

    checkTasks(serverUrl, "/update-check-tasks", tasksToUpdate);
  });

  const tableHeaderActionsDelete = document.createElement("div");
  tableHeaderActionsDelete.className = "table-header-actions-delete";
  tableHeaderActionsDelete.addEventListener("click", () => {
    handleDeleteModalOpen([...selectedTasks]);
  });

  const tableRowContainer = document.createElement("div"); // container for future rows
  tableRowContainer.className = "table-row-container";

  //append
  compBody.appendChild(tableContent);
  tableContent.appendChild(tableHeader);

  tableHeader.appendChild(tableHeaderContent);
  tableHeaderContent.appendChild(tableHeaderSelectAll);
  tableHeaderSelectAll.appendChild(tableHeaderSelectAllCheckBox);
  tableHeaderContent.appendChild(tableHeaderName);
  tableHeaderName.appendChild(tableHeaderNameBtn);
  tableHeaderContent.appendChild(tableHeaderUpdated);
  tableHeaderUpdated.appendChild(tableHeaderUpdatedBtn);

  tableHeaderContent.appendChild(tableHeaderActions);
  tableHeaderActions.appendChild(tableHeaderActionsAdd);
  tableHeaderActionsAdd.appendChild(AddIcon());

  tableHeaderActions.appendChild(tableHeaderActionsCheck);
  tableHeaderActionsCheck.appendChild(CheckIcon());

  tableHeaderActions.appendChild(tableHeaderActionsDelete);
  tableHeaderActionsDelete.appendChild(DeleteIcon());

  tableHeader.appendChild(divider);

  tableContent.appendChild(tableRowContainer);

  updateHeaderActionsVisibility(); // set initial visibilty

  //// Fetch and render tasks table rows
  // Function to change sort order
  function handleSortOrderChange(selectedSort: keyof SortOrderTypes) {
    sortOrder = {
      updatedAsc: false,
      updatedDesc: false,
      nameAsc: false,
      nameDesc: false,
      [selectedSort]: true,
    };

    renderTasks();
  }

  // Sorting logic
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  function sortTasks(tasks: TaskTypes[], sortOrder: SortOrderTypes) {
    return tasks.sort((a, b) => {
      if (sortOrder.nameAsc) return collator.compare(a.name, b.name);
      if (sortOrder.nameDesc) return collator.compare(b.name, a.name);
      if (sortOrder.updatedAsc)
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      if (sortOrder.updatedDesc)
        return new Date(b.created).getTime() - new Date(a.created).getTime();

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
  }

  // display data
  function renderTasks() {
    // clear previous rows
    tableRowContainer.innerHTML = "";

    const sortedTasks = sortTasks(tasks, sortOrder);

    totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
    const pagedTasks = sortedTasks.slice(
      (currentPage - 1) * tasksPerPage,
      currentPage * tasksPerPage
    );

    if (pagedTasks.length === 0) {
      tableRowContainer.textContent = "No tasks found";
      tableRowContainer.style.justifyContent = "center";
      tableRowContainer.style.alignItems = "center";
      tableHeaderSelectAllCheckBox.checked = false;
      tableHeaderSelectAllCheckBox.indeterminate = false;
      return;
    } else {
      tableRowContainer.style.justifyContent = "";
      tableRowContainer.style.alignItems = "";
    }

    // Set header checkbox based on current page state
    const pageState = selectAllPages.get(currentPage) ?? 0;
    switch (pageState) {
      case 0:
        tableHeaderSelectAllCheckBox.checked = false;
        tableHeaderSelectAllCheckBox.indeterminate = false;
        break;
      case 1:
        tableHeaderSelectAllCheckBox.checked = false;
        tableHeaderSelectAllCheckBox.indeterminate = true;
        break;
      case 2:
        tableHeaderSelectAllCheckBox.checked = true;
        tableHeaderSelectAllCheckBox.indeterminate = false;
        break;
    }

    pagedTasks.forEach((task) => {
      const row = document.createElement("div");
      row.className = "table-row";

      const selectRow = document.createElement("div");
      selectRow.className = "table-row-select";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // keep row checkbox state in sync
      checkbox.checked = selectedTasks.has(task.id);

      // row checkbox change
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedTasks.add(task.id);
        } else {
          selectedTasks.delete(task.id);
        }

        updateHeaderActionsVisibility();

        // Update header checkbox state for this page
        const allSelected = pagedTasks.every((t) => selectedTasks.has(t.id));
        const noneSelected = pagedTasks.every((t) => !selectedTasks.has(t.id));
        let newState: 0 | 1 | 2 = 0;
        if (allSelected) newState = 2;
        else if (!noneSelected) newState = 1;
        else newState = 0;

        selectAllPages.set(currentPage, newState);

        // update header checkbox visually
        switch (newState) {
          case 0:
            tableHeaderSelectAllCheckBox.checked = false;
            tableHeaderSelectAllCheckBox.indeterminate = false;
            break;
          case 1:
            tableHeaderSelectAllCheckBox.checked = false;
            tableHeaderSelectAllCheckBox.indeterminate = true;
            break;
          case 2:
            tableHeaderSelectAllCheckBox.checked = true;
            tableHeaderSelectAllCheckBox.indeterminate = false;
            break;
        }
      });

      selectRow.appendChild(checkbox);

      const nameRow = document.createElement("div");
      nameRow.className = "table-row-name";
      nameRow.textContent = task.name;

      const updatedRow = document.createElement("div");
      updatedRow.className = "table-row-updated";
      updatedRow.textContent = formatDate(task.created);

      const actionsRow = document.createElement("div");
      actionsRow.className = "table-row-actions";

      const actionsRowEdit = document.createElement("div");
      actionsRowEdit.className = "table-row-actions-edit";
      actionsRowEdit.title = "Edit task";
      actionsRowEdit.addEventListener("click", () => {
        handleModalOpen("edit", task);
      });
      actionsRowEdit.appendChild(EditIcon());

      const actionsRowCheck = document.createElement("div");
      actionsRowCheck.className = "table-row-actions-check";
      actionsRowCheck.title = "Mark as completed";
      actionsRowCheck.addEventListener("click", () => {
        checkTasks(serverUrl, "/update-check-tasks", [
          { id: task.id, isCompleted: !task.isCompleted },
        ]);
      });
      actionsRowCheck.appendChild(CheckIcon());

      actionsRow.appendChild(actionsRowEdit);
      actionsRow.appendChild(actionsRowCheck);

      row.appendChild(selectRow);
      row.appendChild(nameRow);
      row.appendChild(updatedRow);
      row.appendChild(actionsRow);

      tableRowContainer.appendChild(row);
    });

    renderPagination();
  }

  // Header checkbox change for current page
  tableHeaderSelectAllCheckBox.onchange = () => {
    const sortedTasks = sortTasks(tasks, sortOrder);
    const pagedTasks = sortedTasks.slice(
      (currentPage - 1) * tasksPerPage,
      currentPage * tasksPerPage
    );

    if (tableHeaderSelectAllCheckBox.checked) {
      pagedTasks.forEach((t) => selectedTasks.add(t.id));
      selectAllPages.set(currentPage, 2);
    } else {
      pagedTasks.forEach((t) => selectedTasks.delete(t.id));
      selectAllPages.set(currentPage, 0);
    }
    updateHeaderActionsVisibility();

    renderTasks(); // re-render to sync checkboxes
  };

  // show header icons
  function updateHeaderActionsVisibility() {
    const isAnySelected = selectedTasks.size > 0;
    tableHeaderActionsCheck.style.visibility = isAnySelected
      ? "visible"
      : "hidden";
    tableHeaderActionsDelete.style.visibility = isAnySelected
      ? "visible"
      : "hidden";
  }

  // fetch tasks
  getTasks(serverUrl).then((fetchedTasks) => {
    allTasks = fetchedTasks;
    filterAndRenderTasks();
  });

  function filterAndRenderTasks() {
    tasks = allTasks.filter((task) => task.isCompleted === isCompletedMode);
    renderTasks();
  }

  // handle prev next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
    }
    renderTasks();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      currentPage--;
    }
    renderTasks();
  };

  // Jump 5 pages forward or backward
  const handleNextFivePages = () => {
    currentPage = Math.min(currentPage + pageSkip, totalPages);
    renderTasks();
  };

  const handlePreviousFivePages = () => {
    currentPage = Math.max(currentPage - pageSkip, 1);
    renderTasks();
  };

  const handleJumpToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) currentPage = page;
    renderTasks();
  };

  // Determine the range of visible pages
  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // Render nav buttons
  const tableFooterContainer = document.createElement("div");
  tableFooterContainer.className = "table-footer-container";

  tableContent.appendChild(tableFooterContainer);
  tableFooterContainer.appendChild(divider2);

  function renderPagination() {
    // remove old pagination first
    const oldPagination = tableContent.querySelector(".table-footer");
    if (oldPagination) oldPagination.remove();

    if (totalPages === 0) return;

    const tableFooter = document.createElement("div");
    tableFooter.className = "table-footer";

    const tableFooterPrev = document.createElement("div");
    tableFooterPrev.className = "table-footer-prev";
    tableFooterPrev.style.visibility = currentPage !== 1 ? "visible" : "hidden";

    const tableFooterPrevBtn = document.createElement("button");
    tableFooterPrevBtn.textContent = "<";
    tableFooterPrevBtn.addEventListener("click", () => {
      handlePreviousPage();
    });

    const tableFooterNext = document.createElement("div");
    tableFooterNext.className = "table-footer-next";
    tableFooterNext.style.visibility =
      currentPage !== totalPages ? "visible" : "hidden";

    const tableFooterNextBtn = document.createElement("button");
    tableFooterNextBtn.textContent = ">";
    tableFooterNextBtn.addEventListener("click", () => {
      handleNextPage();
    });

    const tableFooter5Prev = document.createElement("div");
    tableFooter5Prev.className = "table-footer-5prev";
    tableFooter5Prev.style.visibility = currentPage > 5 ? "visible" : "hidden";

    const tableFooter5PrevBtn = document.createElement("button");
    tableFooter5PrevBtn.textContent = "<<";
    tableFooter5PrevBtn.addEventListener("click", () => {
      handlePreviousFivePages();
    });

    const tableFooter5Next = document.createElement("div");
    tableFooter5Next.className = "table-footer-5next";
    tableFooter5Next.style.visibility =
      currentPage <= totalPages - 5 ? "visible" : "hidden";

    const tableFooter5NextBtn = document.createElement("button");
    tableFooter5NextBtn.textContent = ">>";
    tableFooter5NextBtn.addEventListener("click", () => {
      handleNextFivePages();
    });

    tableFooterContainer.appendChild(tableFooter);
    tableFooter.appendChild(tableFooter5Prev);
    tableFooter5Prev.appendChild(tableFooter5PrevBtn);
    tableFooter.appendChild(tableFooterPrev);
    tableFooterPrev.appendChild(tableFooterPrevBtn);

    // Render visible page numbers
    const tableFooterPages = document.createElement("div");
    tableFooterPages.className = "table-footer-pages";

    getVisiblePages().forEach((page) => {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = page.toString();
      pageBtn.title = `Go to page ${page}`;

      // highlight current page
      if (currentPage === page) {
        pageBtn.style.fontWeight = "bold";
        pageBtn.style.textDecoration = "underline";
      } else {
        pageBtn.style.textDecoration = "none";
      }

      pageBtn.addEventListener("click", () => handleJumpToPage(page));

      tableFooterPages.appendChild(pageBtn);
    });

    // insert the page buttons container in the footer
    tableFooter.appendChild(tableFooterPages);

    tableFooter.appendChild(tableFooterNext);
    tableFooterNext.appendChild(tableFooterNextBtn);
    tableFooter.appendChild(tableFooter5Next);
    tableFooter5Next.appendChild(tableFooter5NextBtn);
  }

  // modal open
  function handleModalOpen(type: string, task?: TaskTypes) {
    if (type === "edit") {
      isEditMode = true;
      openTask = task ?? defaultTask;
    } else {
      isAddMode = true;
      openTask = defaultTask;
    }
    taskModal.open();
    renderForm();
  }

  // form
  function renderForm() {
    const form = document.createElement("form");
    form.className = "table-form";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      isSubmitting = true;

      const taskName = nameInput.value.trim();
      if (!taskName) {
        nameInput.style.borderColor = "red";
        return;
      } else {
        nameInput.style.borderColor = "gray";
      }

      try {
        if (isAddMode) {
          await submitTasks(serverUrl, "/add-task", taskName);
        } else {
          await submitTasks(serverUrl, "/update-task", taskName, openTask.id);
        }
      } catch {
        console.error("Error saving task");
      } finally {
        isSubmitting = false;
      }
    });

    const formTitle = document.createElement("div");
    formTitle.className = "table-form-title";
    formTitle.textContent = isAddMode ? "Add Task" : "Edit Task";

    const formBody = document.createElement("div");
    formBody.className = "table-form-body";

    const name = document.createElement("div");
    name.className = "table-form-body-name";

    const nameTitle = document.createElement("div");
    nameTitle.className = "table-form-body-name-title";
    nameTitle.textContent = "Task Name";

    const nameInput = document.createElement("input");
    nameInput.className = "table-form-body-name-input";
    nameInput.id = "name";
    nameInput.type = "text";
    nameInput.placeholder = "Input task name";
    nameInput.value = openTask.name;

    const formFooter = document.createElement("div");
    formFooter.className = "table-form-footer";

    const formFooterActionsContainer = document.createElement("div");
    formFooterActionsContainer.className = "table-form-footer-actions";

    const formFooterActionsLeft = document.createElement("div");
    formFooterActionsLeft.className = "table-form-footer-left";

    const submitBtn = document.createElement("button");
    submitBtn.className = "table-form-footer-submit";
    submitBtn.type = "submit";
    submitBtn.disabled = isSubmitting;
    submitBtn.title = "Save";
    submitBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "table-form-footer-cancel";
    cancelBtn.type = "button";
    cancelBtn.title = "Cancel";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      taskModal.close();
    });

    const formFooterActionsRight = document.createElement("div");
    formFooterActionsRight.className = "table-form-footer-right";
    formFooterActionsRight.style.visibility = isEditMode ? "visible" : "hidden";

    const formFooterActionsRightCheck = document.createElement("div");
    formFooterActionsRightCheck.addEventListener("click", () => {
      checkTasks(serverUrl, "/update-check-tasks", [
        { id: openTask.id, isCompleted: !openTask.isCompleted },
      ]);
    });

    const formFooterActionsRightDelete = document.createElement("div");
    formFooterActionsRightDelete.addEventListener("click", () => {
      handleDeleteModalOpen([openTask.id]);
    });

    form.appendChild(formTitle);
    formTitle.appendChild(divider3);

    form.appendChild(formBody);
    formBody.appendChild(name);
    name.appendChild(nameTitle);
    name.appendChild(nameInput);

    formBody.appendChild(formFooter);
    formFooter.appendChild(divider4);
    formFooter.appendChild(formFooterActionsContainer);
    formFooterActionsContainer.appendChild(formFooterActionsLeft);
    formFooterActionsLeft.appendChild(submitBtn);
    formFooterActionsLeft.appendChild(cancelBtn);
    formFooterActionsContainer.appendChild(formFooterActionsRight);
    formFooterActionsRight.appendChild(formFooterActionsRightCheck);
    formFooterActionsRightCheck.appendChild(CheckIcon());
    formFooterActionsRight.appendChild(formFooterActionsRightDelete);
    formFooterActionsRightDelete.appendChild(DeleteIcon());

    // Add/edit modals
    taskModal.appendChild(form);
  }

  function handleDeleteModalOpen(taskIDs: number[]) {
    tasksToDelete = taskIDs;
    deleteModal.open();
    renderDeleteForm();
  }

  function renderDeleteForm() {
    const form = document.createElement("div");
    form.className = "delete-form";

    const formTitle = document.createElement("div");
    formTitle.className = "delete-form-title";
    formTitle.textContent = "Delete Task";

    const formBody = document.createElement("div");
    formBody.className = "delete-form-body";
    formBody.textContent = "Are you sure that you wish to delete these tasks?";

    const formFooter = document.createElement("div");
    formFooter.className = "delete-form-footer";

    const formFooterActionsContainer = document.createElement("div");
    formFooterActionsContainer.className = "delete-form-footer-actions";

    const submitBtn = document.createElement("button");
    submitBtn.className = "delete-form-footer-submit";
    submitBtn.disabled = isDeleting;
    submitBtn.title = "Delete";
    submitBtn.textContent = "Delete";
    submitBtn.addEventListener("click", () => {
      deleteTasks(serverUrl, "/delete-tasks", tasksToDelete);
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "delete-form-footer-cancel";
    cancelBtn.type = "button";
    cancelBtn.title = "Cancel";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      deleteModal.close();
    });

    form.appendChild(formTitle);
    formTitle.appendChild(divider5);

    form.appendChild(formBody);

    formBody.appendChild(formFooter);
    formFooter.appendChild(divider6);
    formFooter.appendChild(formFooterActionsContainer);
    formFooterActionsContainer.appendChild(submitBtn);
    formFooterActionsContainer.appendChild(cancelBtn);

    deleteModal.appendChild(form);
  }

  // async funcs
  async function submitTasks(
    serverUrl: string,
    route: string,
    taskname: string,
    taskid?: number
  ) {
    taskModal.close();
    renderTasks();
  }

  async function checkTasks(
    serverUrl: string,
    route: string,
    tasks: { id: number; isCompleted: boolean }[]
  ) {
    try {
      console.log("completed:", tasks);

      if (isEditMode) taskModal.close();

      selectedTasks.clear();
      selectAllPages.clear();
      updateHeaderActionsVisibility();
      renderTasks();
    } catch {
      console.log("Error checking task");
    }
  }

  async function deleteTasks(
    serverUrl: string,
    route: string,
    taskIDs: number[]
  ) {
    try {
      isDeleting = true;
      console.log("deleted:", taskIDs);

      deleteModal.close();
      selectedTasks.clear();
      selectAllPages.clear();
      tasksToDelete = [];

      if (isEditMode) taskModal.close();

      updateHeaderActionsVisibility();
      renderTasks();
    } catch {
      console.log("Error deleting tasks");
    } finally {
      isDeleting = false;
    }
  }

  return compBody;
}
