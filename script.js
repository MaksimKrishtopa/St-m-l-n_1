document.addEventListener("DOMContentLoaded", function () {
    // Пример ответа от REST API
    const apiResponse = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100.0,
                "sorthead": 20
            },
            {
                "id": 2,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 3,
                "head": 2,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 4,
                "head": 3,
                "name": "Удаление зуба",
                "node": 0,
                "price": 800.0,
                "sorthead": 10
            },
            {
                "id": 5,
                "head": 3,
                "name": "Удаление 8ого зуба",
                "node": 0,
                "price": 1000.0,
                "sorthead": 30
            },
            {
                "id": 6,
                "head": 3,
                "name": "Удаление осколка зуба",
                "node": 0,
                "price": 2000.0,
                "sorthead": 20
            },
            {
                "id": 7,
                "head": 2,
                "name": "Хирургические вмешательство",
                "node": 0,
                "price": 200.0,
                "sorthead": 10
            },
            {
                "id": 8,
                "head": 2,
                "name": "Имплантация зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 20
            },
            {
                "id": 9,
                "head": 8,
                "name": "Коронка",
                "node": 0,
                "price": 3000.0,
                "sorthead": 10
            },
            {
                "id": 10,
                "head": 8,
                "name": "Слепок челюсти",
                "node": 0,
                "price": 500.0,
                "sorthead": 20
            }
        ]
    };
    
    // Остальной код (как в предыдущем ответе) остается неизменным
    

    // Строим дерево
    const treeContainer = document.getElementById('tree-container');
    buildTree(treeContainer, apiResponse.services);
});

function buildTree(container, services) {
    const tree = document.createElement('ul');

    // Группируем услуги по head (id вышележащего узла)
    const groupedServices = groupByHead(services);

    // Строим корневые элементы
    groupedServices[null].forEach(service => {
        const rootNode = createNodeElement(service);
        buildSubtree(rootNode, groupedServices, service.id);
        tree.appendChild(rootNode);
    });

    container.appendChild(tree);
}

function buildSubtree(parentNode, groupedServices, parentId) {
    if (groupedServices[parentId]) {
        const ul = document.createElement('ul');

        // Сортируем услуги по sorthead
        const sortedServices = groupedServices[parentId].sort((a, b) => a.sorthead - b.sorthead);

        sortedServices.forEach(service => {
            const node = createNodeElement(service);
            buildSubtree(node, groupedServices, service.id);
            ul.appendChild(node);
        });

        parentNode.appendChild(ul);
    }
}

function createNodeElement(service) {
    const li = document.createElement('li');
    li.textContent = service.name + ' (' + service.price + ')';
    li.className = 'tree-node';

    // Обработчик события клика для открытия/закрытия поддерева
    li.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleSubtree(li);
    });

    return li;
}

function toggleSubtree(node) {
    const ul = node.querySelector('ul');
    if (ul) {
        ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
    }
}

function groupByHead(services) {
    const grouped = {};
    services.forEach(service => {
        const head = service.head;
        if (!grouped[head]) {
            grouped[head] = [];
        }
        grouped[head].push(service);
    });
    return grouped;
}
