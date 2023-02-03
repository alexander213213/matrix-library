
class Matrix {
    constructor(shape = [1,1], arr) {
        this.shape = shape
        this.isSquare = this.shape[0] == this.shape[1]
        this.__array = arr.slice(0, shape[0] * shape[1])
        this.value = []

        let length = shape[0] * shape[1]
        
        if (arr.length < length) return

        let newArr = arr.slice(0, length)
        for (let i=0; i<shape[0]; i++) {
            this.value.push(newArr.slice(0, shape[1]))
            newArr.splice(0, shape[1])
        }
    }

    get length() {
        return this.value.length
    }

    getColumn(index) {
        let result = []
        for (let row of this.value) {
            result.push(row[index])
        }
        return result
    }
    
    get determinant() {
        if (!this.isSquare) return
        let result = 0
        if (this.shape[0] == 1) {
            result += this.__array[0]
            return result
        }
        if (this.shape[0] > 1) {
            for (let i = 0; i<this.shape[0]; i++) {
                let holder = i%2 == 0 ? 1 : -1
                let newArr = this.__array.slice(this.shape[0], this.__array.length).filter((_, index) => ((index) % this.shape[0] != i))
                let lowMatrix = new Matrix([this.shape[0]-1, this.shape[1]-1], newArr)
                result += holder * this.__array[i] * lowMatrix.determinant
            }
            return result
        }
    }
    
    get inverse() {
        if (!this.isSquare) return
        let arr = []
        for (let i in this.__array) {
            let newArr = this.__array.filter((_, index) => Math.floor(index/this.shape[0])*this.shape[0] != Math.floor(i/this.shape[0])*this.shape[0]).filter((_, index) => index % this.shape[0] != i % this.shape[0])
            const newMatrix = new Matrix([this.shape[0]-1,this.shape[1]-1], newArr)
            arr.push(newMatrix.determinant)
        }
        arr = arr.map((item, index) => index % 2 == 0 ? item : -item)
        
        for (let i=1; i<this.shape[0]; i++) {
            for (let j=1; j<=this.shape[0]-i; j++) {
                let index1 = ((i-1)*this.shape[0] + i-1 + j);
                let index2 = (i-1)*this.shape[0] + i-1 + this.shape[0]*j;
                [arr[index1],arr[index2]] = [arr[index2],arr[index1]];
            }
        }
        arr = arr.map(item => item / this.determinant)
        return new Matrix([this.shape[0], this.shape[0]], arr)
    }

    static multiply(A, B) {
        if (A.length != B.value[0].length) return "Error"
    
        let product = []
        for (let row of A.value) {
            let newRow = []
            for (let i = 0; i < B.value[0].length; i++ ) {
                let result = 0
                for (let j in row) {
                    result += row[j]*B.getColumn(i)[j]
                }
                product.push(result)
            }
        }
        return new Matrix([A.shape[0], B.shape[1]],product)
    }

    static crossMultiply(A, B) {
        if (A.shape[0] > 1 || B.shape[0] > 1) return
        if (A.shape[1] != 3 || B.shape[1] != 3) return
        
        const I = new Matrix([2,2], [A.__array[1], A.__array[2], B.__array[1], B.__array[2]])
        const J = new Matrix([2,2], [A.__array[0], A.__array[2], B.__array[0], B.__array[2]])
        const K = new Matrix([2,2], [A.__array[0], A.__array[1], B.__array[0], B.__array[1]])
        return new Matrix([1,3], [I.determinant,-1 * J.determinant, K.determinant])
    }
    
    static log(matrix) {
        let result = "[\n"
        for (let row of matrix.value) {
            let str = "  [" + row.toString().split(",").map(s => "\x1b[38;2;194;119;48m" + s + "\x1b[0m").join(", ") + "]\n" 
            result += str
        }
        result += "]"
        console.log(result)
    }

}




// const A = new Matrix([3,3], [1,0,-3,2,-2,1,0,-1,3])
// const A = new Matrix([1,3], [1,3,4,4,5,6,7])
// const B = new Matrix([1,3], [2,7,-5,4,5,6,7])

// const A = new Matrix([6,6], [2,5,3,7,3,7,7,7,1,7,7,0,5,4,2,4,3,5,4,10,1,6,7,6,8,2,5,2,6,9,6,3,4,1,5,5])

// Matrix.log(A.inverse)
// console.log(A.determinant)

// Matrix.log(Matrix.crossMultiply(A, B))
