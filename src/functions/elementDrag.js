export function draggable(node, data) {
    let state = data

    node.draggable = true
    node.style.cursor = 'grab'

    function handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', state)
    }

    node.addEventListener('dragstart', handleDragStart, false)

    return {
        update(data) {
            state = data
        },
        destroy() {
            node.removeEventListener('dragstart', handleDragStart, false)
        }
    }
}

export function dropzone(node, options) {
    let state = {
        dropEffect: 'move',
        dragoverClass: 'droppable',
        ...options
    }

    function handleDragEnter(e) {
        e.target.classList.add(state.dragoverClass)
    }

    function handleDragLeave(e) {
        e.target.classList.remove(state.dragoverClass)
    }

    function handleDragOver(e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = state.dropEffect
    }

    function handleDrop(e) {
        e.preventDefault()
        const data = e.dataTransfer.getData('text/plain')
        e.target.classList.remove(state.dragoverClass)
        state.onDrop(data, e)
    }

    node.addEventListener('dragenter', handleDragEnter, false)
    node.addEventListener('dragleave', handleDragLeave, false)
    node.addEventListener('dragover', handleDragOver, false)
    node.addEventListener('drop', handleDrop, false)

    return {
        update(options) {
            state = {
                ...state,
                ...options
            }
        },
        destroy() {
            node.removeEventListener('dragenter', handleDragEnter, false)
            node.removeEventListener('dragleave', handleDragLeave, false)
            node.removeEventListener('dragover', handleDragOver, false)
            node.removeEventListener('drop', handleDrop, false)
        }
    }
}