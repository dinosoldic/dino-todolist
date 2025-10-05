import { CheckIcon, EditIcon } from "../constants/SVGIcons";
import { formatDate } from "../utils/FormatDate";
import "../styles/TaskTable.css";

interface TaskTypes {
  id: number;
  name: string;
  updated: string;
  completed: boolean;
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
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
    { id: 1, name: "Task 1", updated: "2025-04-03", completed: false },
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
  // html components
  // body
  const compBody = document.createElement("div");
  compBody.className = "table-div";

  const divider = document.createElement("div");
  divider.className = "divider";

  const divider2 = document.createElement("div");
  divider2.className = "divider";

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
  tableHeaderUpdatedBtn.textContent = "Updated";
  tableHeaderUpdatedBtn.title = "Updated";
  tableHeaderUpdatedBtn.addEventListener("click", () => {
    const nextSort = sortOrder.updatedAsc ? "updatedDesc" : "updatedAsc";
    handleSortOrderChange(nextSort);
  });

  const tableHeaderActions = document.createElement("div");
  tableHeaderActions.className = "table-header-actions";

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
  tableHeader.appendChild(divider);

  tableContent.appendChild(tableRowContainer);

  //// Fetch and render tasks table rows
  let tasks: TaskTypes[] = [];

  // sorting
  let sortOrder: SortOrderTypes = {
    updatedAsc: false,
    updatedDesc: true, // default: newest first
    nameAsc: false,
    nameDesc: false,
  };

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
  function sortTasks(tasks: TaskTypes[], sortOrder: SortOrderTypes) {
    return tasks.sort((a, b) => {
      if (sortOrder.nameAsc) return a.name.localeCompare(b.name);
      if (sortOrder.nameDesc) return b.name.localeCompare(a.name);
      if (sortOrder.updatedAsc)
        return new Date(a.updated).getTime() - new Date(b.updated).getTime();
      if (sortOrder.updatedDesc)
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();

      return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    });
  }

  // paging
  let currentPage: number = 1;
  const tasksPerPage: number = 10;

  let totalPages: number = 0;
  const maxVisiblePages: number = 5;
  const pageSkip: number = 5;

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
      return;
    }

    pagedTasks.forEach((task) => {
      const row = document.createElement("div");
      row.className = "table-row";

      const selectRow = document.createElement("div");
      selectRow.className = "table-row-select";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      selectRow.appendChild(checkbox);

      const nameRow = document.createElement("div");
      nameRow.className = "table-row-name";
      nameRow.textContent = task.name;

      const updatedRow = document.createElement("div");
      updatedRow.className = "table-row-updated";
      updatedRow.textContent = formatDate(task.updated);

      const actionsRow = document.createElement("div");
      actionsRow.className = "table-row-actions";

      const actionsRowEdit = document.createElement("div");
      actionsRowEdit.className = "table-row-actions-edit";
      actionsRowEdit.title = "Edit task";
      actionsRowEdit.appendChild(EditIcon());

      const actionsRowCheck = document.createElement("div");
      actionsRowCheck.className = "table-row-actions-check";
      actionsRowCheck.title = "Mark as completed";
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

  // fetch taaks
  getTasks(serverUrl).then((fetchedTasks) => {
    tasks = fetchedTasks.filter((task) => !task.completed);
    renderTasks();
  });

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
  return compBody;
}
