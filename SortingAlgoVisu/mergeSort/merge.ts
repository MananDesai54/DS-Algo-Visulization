let arr:number[] = [2,4,7,8,5,1,3,6,10,9];
arr = [ 1, 3, 9, 13, 19, 25, 33, 35, 40, 45, 53, 54, 56, 62, 64, 68, 70, 72, 74, 77, 79, 80, 83, 89, 90, 91, 93, 95, 96, 98];
arr = [62, 27, 19, 94, 76, 40, 54, 7, 80, 43, 44, 46, 64, 11, 32, 23, 59, 4, 81, 49, 65, 95, 70, 9, 78, 26, 38, 55, 71, 6]

mergeSort(arr);
console.log(arr);

function mergeSort(array:number[]) {
    const len = array.length;
    if(len<2) return;
    const middle = len/2;
    const left = array.slice(0,middle);
    const right = array.slice(middle,len);
    mergeSort(left);
    mergeSort(right);
    merge(left,right,array);
}

function merge(left:number[],right:number[],array:number[]) {
    const nL = left.length;
    const nR = right.length;
    let i = 0;
    let j = 0;
    let k = 0;
    while(i<nL && j<nR) {
        if(left[i]<=right[j]) {
            array[k] = left[i];
            i++;
        }else {
            array[k] = right[j];
            j++;
        }
        k++;    
    }
    while(i<nL) {
        array[k]=left[i];
        k++;
        i++;
    }
    while(j<nR) {
        array[k]=right[j];
        k++;
        j++;
    }
}