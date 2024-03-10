// Припустимо, що у вас є масиви nodes і jobs
// Де nodes - це масив вершин, а jobs - масив робіт
function networkPlanning(nodes, jobs) {
    // Встановлюємо початкові значення для ранніх та пізніх строк
    nodes.forEach(node => {
        node.earlyStart = 0;
        node.lateFinish = 1000000;
    });

    // Визначаємо ранні строки здійснення робіт
    jobs.forEach(job => {
        const startNode = nodes.find(node => node.name === job.startNode);
        const endNode = nodes.find(node => node.name === job.endNode);

        const earlyStart = startNode.earlyStart + job.duration;

        if (earlyStart > endNode.earlyStart) {
            endNode.earlyStart = earlyStart;
        }
    });

    // Визначаємо пізні строки здійснення робіт
    const lastNode = nodes[nodes.length - 1];
    lastNode.lateFinish = lastNode.earlyStart;

    for (let i = jobs.length - 1; i >= 0; i--) {
        const job = jobs[i];
        const startNode = nodes.find(node => node.name === job.startNode);
        const endNode = nodes.find(node => node.name === job.endNode);

        const lateFinish = endNode.lateFinish - job.duration;

        if (lateFinish < startNode.lateFinish) {
            startNode.lateFinish = lateFinish;
        }
    }

    // Вираховуємо резерви часу
    nodes.forEach(node => {
        node.reserveTime = node.lateFinish - node.earlyStart;
    });

    // Виводимо результат
    nodes.forEach((node) => {
        console.log("Node name: ", node.name);
        console.log("Node earlyStart: ", node.earlyStart);
        console.log("Node lateFinish: ", node.lateFinish);
        console.log("Node reserveTime: ", node.reserveTime);
        console.log("-----------------------------------------");
    });
}

// Приклад використання
const nodes = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    // Додайте інші вершини за необхідності
];

const jobs = [
    { number: 1, startNode: "1", endNode: "2", duration: 2 },
    { number: 2, startNode: "1", endNode: "3", duration: 3 },
    { number: 3, startNode: "2", endNode: "3", duration: 2 },
    { number: 4, startNode: "2", endNode: "4", duration: 5 },
    { number: 5, startNode: "3", endNode: "4", duration: 4 },
    { number: 6, startNode: "3", endNode: "5", duration: 4 },
    { number: 7, startNode: "3", endNode: "6", duration: 2 },
    { number: 8, startNode: "4", endNode: "6", duration: 3 },
    { number: 9, startNode: "5", endNode: "6", duration: 6 },
    { number: 10, startNode: "6", endNode: "7", duration: 0 },

    // Додайте інші роботи за необхідності
];

networkPlanning(nodes, jobs);