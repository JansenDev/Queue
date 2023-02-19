import { Queue } from "./index";

const queue = new Queue<number>()
// Optimo hasta 10,000  elementos
for (let i = 0; i < 10000; i++) {
    const num = i
    queue.enqueue(num)
    // console.log(num);

}

console.log(queue.toList());
