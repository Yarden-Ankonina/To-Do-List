export { createDraggableZone };

function createDraggableZone() {
  const draggableZone = document.querySelector('ul');
  draggableZone.addEventListener('dragover', (event) => {
    swapHandler(draggableZone, event);
  })
}

function swapHandler(draggableZone, event) {
  const afterElement = getDragAfterElement(draggableZone, event.clientY);
  const draggable = document.querySelector('.dragging');
  if (afterElement == null) {
    draggableZone.appendChild(draggable)
  } else {
    draggableZone.insertBefore(draggable, afterElement)
  }
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}