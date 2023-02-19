class Nodo<T> {

    private next: Nodo<T> | null;
    constructor(private value: T | null = null) {
        this.next = null;
    }

    setValue(value: T): void {
        this.value = value
    }
    getValue(): T | null {
        return this.value
    }

    setNext(nodo: Nodo<T> | null) {
        this.next = nodo
    }
    getNext(): Nodo<T> | null {
        return this.next
    }
}

interface IDetails<T> {
    length: number
    isEmpty: boolean
    get: T | null
    getLastValue: T | null
}

class Queue<T> {
    private size: number;
    private nodo: Nodo<T> | null
    private head: Nodo<T> | null
    private tail: Nodo<T> | null
    private details: IDetails<T>
    constructor() {
        this.nodo = new Nodo()
        this.size = 0;
        this.head = null
        this.tail = null
        this.details = {
            length: 0,
            isEmpty: true,
            get: null,
            getLastValue: null,
        }
    }

    get watch(): IDetails<T> {
        return this.details
    }

    /** Obtener primer valor de la cola */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /** Obtener tamaño de la cola */
    get length(): number {
        return this.size
    }

    /** Obtener primer valor de la cola */
    getFirstValue(): T | null {
        return this.head?.getValue() ? this.head?.getValue() : null
    }

    /** Obtener último valor de la cola */
    getLastValue(): T | null {
        return this.tail?.getValue() ? this.tail?.getValue() : null
    }

    /** Agregar elemento a la cola */
    enqueue(value: T): void {
        const nodo = new Nodo(value)

        if (this.isEmpty()) {
            this.nodo?.setNext(nodo)
            this.head = nodo
            this.tail = nodo
            this.size++;
            this.details.length++
            this.details.isEmpty = this.details.length === 0
            this.details.get = nodo.getValue()
            this.details.getLastValue = nodo.getValue()
            return
        }

        let aux = this.nodo
        while (aux?.getNext() != null) {
            aux = aux.getNext()
        }
        aux?.setNext(nodo);
        this.size++;
        this.tail = nodo;
        this.details.length++
        this.details.getLastValue = nodo.getValue()
    }

    /** Quitar primer elemento de la cola */
    dequeue() {
        if (this.isEmpty()) throw new Error("Se quiere des-encolar un indice que no existe");

        if (this.size === 1) {
            this.nodo?.setNext(null)
            this.size--
            this.head = this.nodo
            this.tail = this.nodo
            this.details.length--
            this.details.isEmpty = this.details.length === 0
            this.details.get = this.nodo?.getValue()!
            this.details.getLastValue = this.nodo?.getValue()!
            return
        }
        const nextNodo = this.nodo?.getNext()

        this.nodo?.setNext(nextNodo?.getNext()!)
        this.size--;
        this.head = nextNodo?.getNext()!
        this.details.length--
        this.details.get = nextNodo?.getValue()!
        this.details.isEmpty = this.details.length === 0
        nextNodo?.setNext(null)
    }

    /** Tranformar Queue a List */
    toList(): T[] {
        let aux = this.nodo?.getNext()
        const list: T[] = [];

        while (aux?.getValue() != null) {
            const value = aux?.getValue() as never
            list.push(value)
            aux = aux.getNext();
        }

        return list
    }
}


// const queue = new Queue<number>();
// const size = queue.length
// const colaData = queue.watch
// const isEmpty = queue.isEmpty()
// const fv = queue.getFirstValue()
// const lv = queue.getLastValue()

// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(10)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(11)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(12)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(13)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(14)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(1130)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// console.log("add 6: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -1: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -2: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -3: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -4: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -5: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.dequeue()
// console.log("get -6: ", queue.toList());
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(11111)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });
// queue.enqueue(11114)
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });



// const lista = queue.toList()
// console.log(lista);

// console.log(queue.watch);
// console.log(colaData.get);

// console.log({ size: size1.length, isEmpty, fv, lv });
// console.log({ size, isEmpty, fv, lv });
// console.log({ size: queue.length, isEmpty: queue.isEmpty(), fv: queue.getFirstValue(), lv: queue.getLastValue() });

export {
    Queue
}